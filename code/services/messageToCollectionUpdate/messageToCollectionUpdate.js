/*
{
  "params": {
    "body": "sample message",
    "userId": "fc8cfcea0a96ebebc7f5d4edd414",
    "trigger": "Messaging:Publish",
    "topic": "create"
  },
  "systemKey": "d6b9dc970bf8bda3fff0b3ecb38e01",
  "systemSecret": "D6B9DC970B928D8B83DEBFBACA43",
  "userToken": "Chm9sUHyEoKAT13cMJuJaOwfWyp2-vwqDrRxjP6brPZgrZPNAHCBVxz6WRW4RNDJ5Xii80ZFaAcXL_Jjnw==",
  "isLogging": true,
  "userid": "fc8cfcea0a96ebebc7f5d4edd414",
  "userEmail": "rreinold@clearblade.com"
}
*/

function messageToCollectionUpdate(req, resp){
    var DEBUG = false
    if (DEBUG) {
        req.params = {
          "body": '{"id":"2b","payload":"im_over_there"}',
          "topic": "create",
          "trigger": "Messaging:Publish",
          "userId": "fc8cfcea0a96ebebc7f5d4edd414"
        }
    }
    log("Triggered: ")
    log(JSON.stringify(req))
    var params = req.params
    var type = Math.floor(Math.random() * 5)
    var body = JSON.parse(params.body)
    if( ! body || ! body.id || ! body.payload){
        var message = "Unable to parse message body"
        log(message)
        resp.error(message)
    }
    var changes = {
        payload: body.payload,
        last_updated: new Date(),
    }
    log(JSON.stringify(changes))
    
    ClearBlade.init({request:req})
    
    confirmIdExists(body.id, changes)
    
    function confirmIdExists(id, changes){
        var collection = ClearBlade.Collection({collectionName:"Tags"})
        var query = ClearBlade.Query()
        query.equalTo('id',id)
        collection.count(query,function(err, data){
            if(err || !data || data.count == null || 0 > data.count || data.count > 1){
                var msg = "Unable to fetch count: " + JSON.stringify(data)
                log(msg)
                resp.error(msg)
            }
            else if(data.count == 1){
                log("Exists.")
                update(id, changes)
            }
            else{
                log("Does not exist.")
                create(id, changes)
            }
        })
    }
    
    function update(id, changes){
        log("Updating")
        var query = ClearBlade.Query({collectionName:"Tags"})
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
        log("Creating")
        var row = changes
        changes.id = id
        var collection = ClearBlade.Collection({collectionName:"Tags"})
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