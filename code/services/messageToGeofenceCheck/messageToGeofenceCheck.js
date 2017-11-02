function messageToGeofenceCheck(req, resp){
    var DEBUG = false
    if (DEBUG) {
        req.params = {
          "body": '{"id":"2b","lat":30.266600,"long":-97.742700}',
          "topic": "create",
          "trigger": "Messaging:Publish",
          "userId": "fc8cfcea0a96ebebc7f5d4edd414"
        }
    }
    log("Triggered: ")
    log(JSON.stringify(req))
    var params = req.params
    var body = JSON.parse(params.body)
    if( ! body || ! body.lat || ! body.long){
        var message = "Unable to parse message body"
        log(message)
        resp.error(message)
    }
    ClearBlade.init({request:req})
    var coordinateSystem = new geo('polar')
    var requestedPoint = coordinateSystem.Point(body.lat, body.long)
    var geofencePolygon = geofenceBounds.getGeofence()
    
    var isWithinGeofence = coordinateSystem.Within(geofencePolygon, requestedPoint)
    var messaging = ClearBlade.Messaging()
    var message = "Point with ID: " + body.id + " is not within any geofence"
    if(isWithinGeofence){
            message = "Point with ID: " + body.id + " is within geofence with ID: " + geofenceBounds.id
    }
    messaging.publish("geofence",message)
    resp.success("Processed requested lat long point. Within Geofence: " + JSON.stringify(isWithinGeofence))
}