COLLECTION_NAME = "Tags"
// Set to true to run this with the test message payload below
var DEBUG = false;
var DEBUG_PAYLOAD = {
    "body": '{"id":"2b","lat":30,"long":-97}',
    "topic": "location",
    "trigger": "Messaging:Publish",
    "userId": "fc8cfcea0a96ebebc7f5d4edd414"
}
/**
 * Keeps track of a tag's most recent location
 * 
 * Triggered by /location topic
 * 
 * If a Tag with the corresponding ID is not found in the Tags collection, a new Tag is created
 */
function RTAssetUpdateTagLocation(req, resp){
    
    if (DEBUG) {
        req.params = DEBUG_PAYLOAD
    }
    
    log(req)
    
    ClearBlade.init({request:req})
    
    var message = parseMessage(req.params)
    message.last_updated = new Date()
    
    confirmTagExists(message.id, message)
    
    function parseMessage(params){
        var utils = RTAssetUtil()
        var parsedBody = utils.verifyMessageSchema(params.body)
        if( ! parsedBody ){
            resp.error("Message body is invalid. Expecting schema: " + JSON.stringify(RTAssetConfiguration().messageSchema) + " but found " + params.body)
        }
        return parsedBody
    }
    function confirmTagExists(id, changes){
        var collection = ClearBlade.Collection({collectionName:COLLECTION_NAME})
        var query = ClearBlade.Query()
        query.equalTo('id',id)
        collection.count(query,function(err, data){
            if(err || !data || data.count == null || 0 > data.count || data.count > 1){
                var msg = "Unable to fetch count: " + JSON.stringify(data)
                log(msg)
                resp.error(msg)
            }
            else if(data.count == 1){
                log("Exists. Updating Tag ID: " + id)
                update(id, changes)
            }
            else{
                log("Does not exist. Creating Tag ID: " + id)
                create(id, changes)
            }
        })
    }
    
    function update(id, changes){
        var query = ClearBlade.Query({collectionName:COLLECTION_NAME})
        query.equalTo('id',id)
        query.update(changes, function(err, data){
            if (err || data == null || data != "success"){
                var message = "Failed to update item: " + JSON.stringify(data)
                log(message)
                resp.error(message)
            }
            var message = "Successfully updated item: " + JSON.stringify(data)
            log(message)
            resp.success(message)
        })
    }
    
    function create(id, changes){
        var row = changes
        changes.id = id
        var collection = ClearBlade.Collection({collectionName:COLLECTION_NAME})
        collection.create(row, function(err, data){
            if(err || ! data || ! data[0] || ! data[0].item_id){
                var message = "Failed to create item: " + JSON.stringify(data)
                log(message)
                resp.error(message)
            }
            var message = "Successfully created item: " + JSON.stringify(data)
            log(message)
            resp.success(message)
        })
    }
}