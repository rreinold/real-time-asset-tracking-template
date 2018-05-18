/**
 * Opportunity to integrate with a REST endpoint using location data
 * 
 * Triggered by /location topic
 */
 function RTAssetHTTPIntegration(req, resp){
    // Tag's lat/long is available here to provide to your endpoint
    log(req.params)
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