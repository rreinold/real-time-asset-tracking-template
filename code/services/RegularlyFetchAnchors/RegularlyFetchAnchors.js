function RegularlyFetchAnchors(req, resp){
    var count = 4
    var mockResponseData = [
        {
            id:"anchor1",
            "payload":"I'm posted up over here"
        }
    ]
    log(JSON.stringify(req))
    
    ClearBlade.init({request:req})
    
    var requests = Requests();
    var options = {
        uri:"https://httpbin.org/get"
    }
    requests.get(options, function(err, data){
        var msg;
        if(err){
            msg = "Unable to fetch"
            log(msg); resp.error(msg)
        }
        msg = "Successfully fetched anchors: " + JSON.stringify(data)
        // Use mock data
        data = mockResponseData
        anchor1 = data[0]
        confirmOrCreate(anchor1)
        
    })
    
    function confirmOrCreate(anchor){
        ClearBlade.getDeviceByName(anchor.id, function(err, data){
            if(err && data){
                data = JSON.parse(data)
                if(data.error.code == 1102){
                    create(anchor)
                }
                log(data)
                resp.error("Unexpected error getting device: " + JSON.stringify(data))
            }
            else if(!err && data){
                update(anchor)
            }
            else{
                resp.error("Unable to get device")
            }
        })
        
    }
    
    function create(anchor){
    	var object = {
    		"name": anchor.id,
    		"type": "",
    		"state": "",
    		"enabled": true,
    		"allow_key_auth": true,
    		"allow_certificate_auth": true,
    		"payload":""
    	};
    
    	ClearBlade.createDevice(anchor.id, object, true, function(err, data) {
    		if(err){
    			resp.error("Unable to create device: " + JSON.stringify(data))
    		}
    		update(anchor)
    	});
    }
    
    function update(anchor){
        var object = {
    		"type": "",
    		"state": "updated",
    		"enabled": true,
    		"allow_key_auth": true,
    		"allow_certificate_auth": true,
    		"payload":anchor.payload
    	};
    
    	ClearBlade.updateDevice(anchor.id, object, true, function(err, data) {
    		if(err) {
    			resp.error("Unable to update device: " + JSON.stringify(data))
    		}
    
    		resp.success(data);
    	});
    }
        
}