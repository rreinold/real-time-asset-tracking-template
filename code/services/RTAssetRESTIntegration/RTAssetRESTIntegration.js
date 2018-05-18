/**
 * Opportunity to implement a REST-based integration to your Real-Time IoT Solution
 * 
 * A placeholder URL is used as an example
 * 
 * Triggered by /location topic
 */
function RTAssetRESTIntegration(req, resp){
    var options = {
        uri:"https://httpbin.org/post"
    }
    var req = Requests()
    req.post(options, function(err, data){
        var msg;
        if(err){
            msg = "Failed to POST: " + JSON.stringify(err)
            log(msg); resp.error(msg);
        }
        msg = "Successful POST"
        log(msg); resp.success(msg)
    })
}