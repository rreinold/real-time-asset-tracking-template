var geofenceBounds = {
    id:"1a8b"
};

coordinateSystem = new geo('polar');

geofenceBounds.NWCorner = coordinateSystem.Point(    30.266822, -97.742462 );
geofenceBounds.NECorner = coordinateSystem.Point(    30.266751, -97.742236 );
geofenceBounds.SECorner = coordinateSystem.Point(    30.266541, -97.742318 );
geofenceBounds.SWCorner = coordinateSystem.Point(    30.266596, -97.742543 );

geofenceBounds.getGeofence = function(){
    return coordinateSystem.Polygon([geofenceBounds.NWCorner, geofenceBounds.NECorner, geofenceBounds.SECorner, geofenceBounds.SWCorner])
}; 