/**
 * @typedef RTAssetUtil
 */
 function RTAssetUtil(){
     /**
      * @memberof RTAssetUtil
      * @param {string} unparsed message body, needs to be JSON format
      * @returns {Message|false} parsed message, false if failed
      */
    function verifyMessageSchema(body){
        try{
            var bodyParsed = JSON.parse(body);
            var schema = RTAssetConfiguration().messageSchema;
            if(Object.keys(bodyParsed).length !== Object.keys(schema).length){
                log("Unexpected number of keys in body vs schema: " + Object.keys(bodyParsed) + " / " + Object.keys(schema))
                return false
            }
            for(var k in schema){
                if( ! (k in bodyParsed)){
                    log("Found key " + k + " in schema, but not in body " + JSON.stringify(bodyParsed))
                    return false
                }
            }
            return bodyParsed
        }
        catch(e){
            log("Failed to parse body: " + JSON.stringify(e))
            return false
        }
    }
    return {
        verifyMessageSchema
    }
}

