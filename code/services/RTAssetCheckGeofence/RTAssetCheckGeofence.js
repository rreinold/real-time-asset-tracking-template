GEOFENCE_ALERT_TOPIC = "geofence"
// Set to true to run this with the test message payload below
var DEBUG = false
var DEBUG_PAYLOAD = {
  "body": '{"id":"2b","lat":30.266822,"long":-97.742462}',
  "topic": "create",
  "trigger": "Messaging:Publish",
  "userId": "fc8cfcea0a96ebebc7f5d4edd414"
}
/**
 * Performs real-time geofence functionalities
 * 
 * Triggered by /location topic
 * 
 * Status of a tag (inside or outside) is published the GEOFENCE_ALERT_TOPIC
 */
function RTAssetCheckGeofence(req, resp){
    
    if (DEBUG) {
        req.params = DEBUG_PAYLOAD
    }
    
    log(req)
    
    ClearBlade.init({request:req})
    var messageBody = parseMessage(req.params)
    var isWithinGeofence = isWithinGeofence(messageBody.lat, messageBody.long)
    publishGeofenceStatus(messageBody.id, isWithinGeofence)
    
    resp.success("Within Geofence: " + JSON.stringify(isWithinGeofence))
    
    function parseMessage(params){
        var utils = RTAssetUtil()
        var parsedBody = utils.verifyMessageSchema(params.body)
        if( ! parsedBody ){
            var msg = "Message body is invalid. Expecting schema: " + JSON.stringify(RTAssetConfiguration().messageSchema) + " but found " + params.body
            log(msg); resp.error(msg)
        }
        return parsedBody
    }
    
    function isWithinGeofence(lat, long){
        var config = RTAssetConfiguration()
        var coordinateSystem = config.coordinateSystem
        var requestedPoint = coordinateSystem.Point(lat, long)
        var geofencePolygon = config.generateGeofence()
        return isWithinGeofence = coordinateSystem.Within(geofencePolygon, requestedPoint)
    }
    
    function publishGeofenceStatus(id, isWithinGeofence){
        var messaging = ClearBlade.Messaging()
        var message = "Point with ID: " + id + " is not within any geofence"
        if(isWithinGeofence){
                message = "Point with ID: " + id + " is within geofence"
        }
        messaging.publish(GEOFENCE_ALERT_TOPIC,message)
    }
}