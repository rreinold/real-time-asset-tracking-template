# Overview

<img src="https://raw.githubusercontent.com/rreinold/real-time-asset-tracking-template/master/screenshot.png" alt="Drawing" style="width: 100%;"/>

This System Template provides geospatial computation and spatial data interpretation. 

It is functional out-of-the-box and is highly extensible.

This is an ipm package, which contains one or more reusable assets within the ipm Community. The 'package.json' in this repo is a ipm spec's package.json, [here](https://docs.clearblade.com/v/3/6-ipm/spec), which is a superset of npm's package.json spec, [here](https://docs.npmjs.com/files/package.json).

[Browse ipm Packages](https://ipm.clearblade.com)

# Setup

- Connect your devices to ClearBlade Platform
- Publish to `/location` MQTT Topic using configurable [Message]{TODO LINK TO MESSAGE} JSON Schema 
- Configure your geofence in `RTAssetConfiguration`

Note: Updates to [Message] schema requires changes to the `LocationLogs` and `Tags` Collection schemas

# Usage

![](graph.png)

## 1. Device Publishes to /location topic

- Devices publishes to `/location` topic:

`{"id":"<TAG_ID>","lat":<LATITUDE>,"long":"<LONGITUDE>}`

- Geofence When a position is within a geofence, a response message is published on the `geofence` topic:

`Point with ID: 2b is within geofence`

## Portal

- `CJS_Portal` - Holistic view of your Real-Time Asset Tracking System, with a 3D Map of Tags

![alt text](https://raw.githubusercontent.com/rreinold/real-time-asset-tracking-template/master/banner.png "")

## Assets

### Portals

CJS_Portal

> 1. Interactive 3D Map of New York City's Manhattan  
> 2. Pie Chart of Anomalies Detected  
> 3. Bar Chart of Zone Activity  
> 4. Time-Series Multi-Line Graph of activity  
> 5. Message Logs  
> 6. Monitoring Enable Switch  
> 7. Edge Selection  

### Code Services
- `RTAssetLogLocation` - creates row in LocationLogs collection	 
- `RTAssetUpdateTagLocation` - updates Tags collection with latest position
- `RTAssetCheckGeofence` - checks if tag is within configured geofence
- `RTAssetRESTIntegration`- Sends a configurable HTTP POST request

### Code Libraries
- `RTAssetConfiguration` - Configuration for the System
- `RTAssetUtil` - Reusable utility methods for System

### Mesaging Topics
- `/location` - Tags publish their position using configurable [Message] structure
- `/geofence` - Publishes status whether a tag is inside the geofence

### Collections
>1. LocationLogs - History of all MQTT Messages received 
>2. Tags - Latest location of all tags

### Triggers
>1. trigger_messageToCollectionCreate
>2. trigger_messageToCollectionUpdate
>3. trigger_messageToHTTPPost

## Development

## How to Update Graph

```
npm i
npm run buildGraph
```

# Credit

Icon by BomSymbols
