# Overview

<img src="https://raw.githubusercontent.com/rreinold/real-time-asset-tracking-template/master/screenshot.png" alt="Drawing" style="width: 100%;"/>

The need for geospatial computation and spatial data interpretation is a recurring theme among Internet of Things projects.

This template is a fully functional and extensible asset tracking IoT solution.

# Usage
## Data Capture with MQTT

>1. `Things` and `Gateways` [connect](https://github.com/clearblade/clearblade-python-sdk#mqtt-messaging) to ClearBlade Platform's [MQTT Broker](https://docs.clearblade.com/v/3/1-platform_concepts/messaging/overview/)
>2. Subscribe to `position` topic
>3. Publish a Position Object (example below) to `position` topic

~~~javascript
{
	"id":"<TAG_ID>",
	"lat":LATITUDE,
	"long":"LONGITUDE
}
~~~
## Geofence Detection
>1. When a position is within a geofence, a response message is published on the `geofence` topic


~~~
Point with ID: 2b is within geofence 1a8b
~~~
## Portal

>1. Portals Tab > CJS_Portal
![alt text](https://raw.githubusercontent.com/rreinold/real-time-asset-tracking-template/master/banner.png "Logo Title Text 1")

# Contents

# Credit

Icon by BomSymbols
