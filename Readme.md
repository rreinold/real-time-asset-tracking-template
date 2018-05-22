# Overview

<img src="https://raw.githubusercontent.com/rreinold/real-time-asset-tracking-template/master/screenshot.png" alt="Drawing" style="width: 100%;"/>

This System Template provides geospatial computation and spatial data interpretation. 

It is functional out-of-the-box and is highly extensible.

This is an ipm package, which contains one or more reusable assets within the ipm Community. The 'package.json' in this repo is a ipm spec's package.json, [here](https://docs.clearblade.com/v/3/6-ipm/spec), which is a superset of npm's package.json spec, [here](https://docs.npmjs.com/files/package.json).

[Browse ipm Packages](https://ipm.clearblade.com)

# Setup

- Connect your devices to ClearBlade Platform
- Publish to `/location` MQTT Topic using configurable [Message](#Message) JSON Schema 
- Configure your geofence in `RTAssetConfiguration`

Note: Updates to [Message](#Message) schema requires changes to the `location_logs` and `tags` Collection schemas



# Usage

![](graph.png)

## 1. Device Publishes to /location topic

- Devices publishes to `/location` topic:

`{"id":"<TAG_ID>","lat":<LATITUDE>,"long":"<LONGITUDE>}`

- Geofence When a position is within a geofence, a response message is published on the `geofence` topic:

`Point with ID: 2b is within geofence`

## Development

### How to Update Graph

```
npm i
npm run buildGraph
```

## Assets

### Portals

- `RTAssetTrackingPortal` - Holistic view of your Real-Time Asset Tracking System, with a 3D Map of Tags

> 1. Interactive 3D Map of New York City's Manhattan  
> 2. Pie Chart of Anomalies Detected  
> 3. Bar Chart of Zone Activity  
> 4. Time-Series Multi-Line Graph of activity  
> 5. Message Logs  
> 6. Monitoring Enable Switch  
> 7. Edge Selection  

### Code Services
- `RTAssetLogLocation` - creates row in location_logs collection	 
- `RTAssetUpdateTagLocation` - updates tags collection with latest position
- `RTAssetCheckGeofence` - checks if tag is within configured geofence
- `RTAssetRESTIntegration`- Sends a configurable HTTP POST request

### Code Libraries
- `RTAssetConfiguration` - Configuration for the System
- `RTAssetUtil` - Reusable utility methods for System

### Mesaging Topics
- `/location` - Tags publish their position using configurable [Message](#Message) structure
- `/geofence` - Publishes status whether a tag is inside the geofence

### Collections
>1. `location_logs` - History of all MQTT Messages received 
>2. `tags` - Latest location of all tags

### Triggers
>1. `RTAssetCheckGeofence_location` - Runs RTAssetUpdateTagLocation upon publish to /location topic
>2. `RTAssetLogLocation_location` - Runs RTAssetLogLocation upon publish to /location topic
>3. `RTAssetUpdateTagLocation_location` - Runs RTAssetUpdateTagLocation upon publish to /location topic

## API

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

