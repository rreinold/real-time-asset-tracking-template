### Functions

<dl>
<dt><a href="#RTAssetCheckGeofence">RTAssetCheckGeofence()</a></dt>
<dd><p>Performs real-time geofence functionalities</p>
<p>Triggered by /location topic</p>
<p>Status of a tag (inside or outside) is published the GEOFENCE_ALERT_TOPIC</p>
</dd>
<dt><a href="#RTAssetHTTPIntegration">RTAssetHTTPIntegration()</a></dt>
<dd><p>Opportunity to integrate with a REST endpoint using location data</p>
<p>Triggered by /location topic</p>
</dd>
<dt><a href="#RTAssetLogLocation">RTAssetLogLocation()</a></dt>
<dd><p>Insert a row into COLLECTION_NAME upon a publish message to /location</p>
<p>Triggered by /location topic</p>
</dd>
<dt><a href="#RTAssetRESTIntegration">RTAssetRESTIntegration()</a></dt>
<dd><p>Opportunity to implement a REST-based integration to your Real-Time IoT Solution</p>
<p>A placeholder URL is used as an example</p>
<p>Triggered by /location topic</p>
</dd>
<dt><a href="#RTAssetUpdateTagLocation">RTAssetUpdateTagLocation()</a></dt>
<dd><p>Keeps track of a tag&#39;s most recent location</p>
<p>Triggered by /location topic</p>
<p>If a Tag with the corresponding ID is not found in the COLLECTION_NAME, a new row is created</p>
</dd>
</dl>

### Typedefs

<dl>
<dt><a href="#Message">Message</a></dt>
<dd></dd>
<dt><a href="#GeofenceBounds">GeofenceBounds</a></dt>
<dd></dd>
<dt><a href="#Point">Point</a></dt>
<dd></dd>
<dt><a href="#CoordinateSystem">CoordinateSystem</a></dt>
<dd></dd>
<dt><a href="#RTAssetConfiguration">RTAssetConfiguration</a></dt>
<dd></dd>
<dt><a href="#RTAssetUtil">RTAssetUtil</a></dt>
<dd></dd>
</dl>

<a name="RTAssetCheckGeofence"></a>

### RTAssetCheckGeofence()
Performs real-time geofence functionalities

Triggered by /location topic

Status of a tag (inside or outside) is published the GEOFENCE_ALERT_TOPIC

**Kind**: global function  
<a name="RTAssetHTTPIntegration"></a>

### RTAssetHTTPIntegration()
Opportunity to integrate with a REST endpoint using location data

Triggered by /location topic

**Kind**: global function  
<a name="RTAssetLogLocation"></a>

### RTAssetLogLocation()
Insert a row into COLLECTION_NAME upon a publish message to /location

Triggered by /location topic

**Kind**: global function  
<a name="RTAssetRESTIntegration"></a>

### RTAssetRESTIntegration()
Opportunity to implement a REST-based integration to your Real-Time IoT Solution

A placeholder URL is used as an example

Triggered by /location topic

**Kind**: global function  
<a name="RTAssetUpdateTagLocation"></a>

### RTAssetUpdateTagLocation()
Keeps track of a tag's most recent location

Triggered by /location topic

If a Tag with the corresponding ID is not found in the COLLECTION_NAME, a new row is created

**Kind**: global function  
<a name="Message"></a>

### Message
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | ID for a tag |
| lat | <code>number</code> | Latitude in decimal degrees, ex. 30.266822 |
| long | <code>number</code> | Longitude in decimal degrees, ex -97.742462 |

<a name="GeofenceBounds"></a>

### GeofenceBounds
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| NWCorner | [<code>Point</code>](#Point) | Northwest Corner |
| NECorner | [<code>Point</code>](#Point) | Northeast Corner |
| SECorner | [<code>Point</code>](#Point) | Southeast Corner |
| SWCorner | [<code>Point</code>](#Point) | Southwest Corner |

<a name="Point"></a>

### Point
**Kind**: global typedef  
**Link**: geo library [Point Object](https://docs.clearblade.com/v/3/4-developer_reference/platformsdk/geo.js/)  
<a name="CoordinateSystem"></a>

### CoordinateSystem
**Kind**: global typedef  
**Link**: geo library [Coordinate System](https://docs.clearblade.com/v/3/4-developer_reference/platformsdk/geo.js/)  
<a name="RTAssetConfiguration"></a>

### RTAssetConfiguration
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| messageSchema | [<code>Message</code>](#Message) | Schema for MQTT JSON Message |
| geofenceBounds | [<code>GeofenceBounds</code>](#GeofenceBounds) | Bounds for the geofence |
| Polar | [<code>CoordinateSystem</code>](#CoordinateSystem) | coordinate system, can be [changed to Cartesian](https://docs.clearblade.com/v/3/4-developer_reference/platformsdk/geo.js/) |

<a name="RTAssetUtil"></a>

### RTAssetUtil
**Kind**: global typedef  
<a name="RTAssetUtil.verifyMessageSchema"></a>

#### RTAssetUtil.verifyMessageSchema(unparsed) ⇒ [<code>Message</code>](#Message) \| <code>false</code>
**Kind**: static method of [<code>RTAssetUtil</code>](#RTAssetUtil)  
**Returns**: [<code>Message</code>](#Message) \| <code>false</code> - parsed message, false if failed  

| Param | Type | Description |
| --- | --- | --- |
| unparsed | <code>string</code> | message body, needs to be JSON format |

