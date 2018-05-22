/**
 * @typedef Message MQTT Message sent by devices
 * @property {string} id ID for a tag
 * @property {number} lat Latitude in decimal degrees, ex. 30.266822
 * @property {number} long Longitude in decimal degrees, ex -97.742462
 */
/**
 * @typedef GeofenceBounds Geofence implementation for four-sided geofence
 * @property {Point} NWCorner Northwest Corner
 * @property {Point} NECorner Northeast Corner
 * @property {Point} SECorner Southeast Corner
 * @property {Point} SWCorner Southwest Corner
 */
 /**
  * @typedef Point 
  * @link geo library {@link https://docs.clearblade.com/v/3/4-developer_reference/platformsdk/geo.js/ Point Object}
  */
 /**
  * @typedef CoordinateSystem
  * @link geo library {@link https://docs.clearblade.com/v/3/4-developer_reference/platformsdk/geo.js/ Coordinate System}
  */
/**
 * @typedef RTAssetConfiguration Configuration for real-time-asset-tracking-template
 * @property {Message} messageSchema Schema for MQTT JSON Message
 * @property {GeofenceBounds} geofenceBounds Bounds for the geofence
 * @property {CoordinateSystem} Polar coordinate system, can be {@link https://docs.clearblade.com/v/3/4-developer_reference/platformsdk/geo.js/ changed to Cartesian}
 */
function RTAssetConfiguration(){
    
    var geofenceBounds = {
        id:"1a8b"
    };
    
    var coordinateSystem = new geo('polar');
    
    geofenceBounds.NWCorner = coordinateSystem.Point(    30.266822, -97.742462 );
    geofenceBounds.NECorner = coordinateSystem.Point(    30.266751, -97.742236 );
    geofenceBounds.SECorner = coordinateSystem.Point(    30.266541, -97.742318 );
    geofenceBounds.SWCorner = coordinateSystem.Point(    30.266596, -97.742543 );
    
    /**
     * @memberof RTAssetConfiguration
     * Generates a Geofence Polygon with the GeofenceBounds object
     * @returns {Polygon} Geofence Polygon Object representing the Geofence
     */
    function generateGeofence(){
        return coordinateSystem.Polygon(
        [
            geofenceBounds.NWCorner, 
            geofenceBounds.NECorner, 
            geofenceBounds.SECorner, 
            geofenceBounds.SWCorner
        ]
        )
    }
    
    var messageSchema = {
        "id":true,
        "lat":true,
        "long":true
    }
    
    return {
        messageSchema,
        generateGeofence,
        geofenceBounds,
        coordinateSystem
    }
}
