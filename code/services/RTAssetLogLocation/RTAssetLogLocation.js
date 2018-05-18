COLLECTION_NAME = "LocationLogs"
// Set to true to run this with the test message payload below
var DEBUG = false;
var DEBUG_PAYLOAD = {
          "body": '{"id":"2b","lat":30.266822,"long":-97.742462}',
          "topic": "create",
          "trigger": "Messaging:Publish",
          "userId": "fc8cfcea0a96ebebc7f5d4edd414"
        }
/**
 * Insert a row into COLLECTION_NAME upon a publish message to /location
 * 
 * Triggered by /location topic
 */
function RTAssetLogLocation(req, resp){
    
    if (DEBUG) {
        req.params = DEBUG_PAYLOAD
    }
    
    log(req)
    
    ClearBlade.init({request:req})
    
    var message = parseMessage(req.params)
    if(!message){
        var msg = "Failed to parse, or message validation failed."
        log(msg); resp.error(msg)
    }
    message.timestamp = new Date()
    insertLog(message)
    
    function parseMessage(params){
        var utils = RTAssetUtil()
        var parsedBody = utils.verifyMessageSchema(params.body)
        if( ! parsedBody ){
            resp.error("Message body is invalid. Expecting schema: " + JSON.stringify(RTAssetConfiguration().messageSchema) + " but found " + params.body)
        }
        return parsedBody
    }
    
    function insertLog(message){
        log({message})
        var collection = ClearBlade.Collection({collectionName:COLLECTION_NAME})
        collection.create(message, complete)
    }
    
    function complete(err, data){
        if (err || data == null || data[0].item_id == null){
            var message = "Failed to create item: " + JSON.stringify(data)
            log(message)
            resp.error(message)
        }
        var message = "Successfully created item: " + JSON.stringify(data)
        resp.success(message)
    }
}

