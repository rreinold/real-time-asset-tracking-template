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

function messageToCollectionCreate(req, resp){
    var DEBUG = false
    if (DEBUG) {
        req.params = {
          "body": '{"id":"1a","payload":"im_over_there"}',
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
    if(body == null){
        var message = "Unable to parse message body"
        log(message)
        resp.error(message)
    }
    var row = {
        payload: body.payload,
        timestamp: new Date(),
        topic: params.topic,
        type: 1,
        id: body.id
    }
    log(JSON.stringify(row))
    
    ClearBlade.init({request:req})
    var collection = ClearBlade.Collection({collectionName:"MessageHistory"})
    collection.create(row, function(err, data){
        if (err || data == null || data[0].item_id == null){
            var message = "Failed to create item: " + JSON.stringify(data)
            log(message)
            resp.error(message)
        }
        var message = "Successfully created item: " + JSON.stringify(data)
        resp.success(message)
    })
}