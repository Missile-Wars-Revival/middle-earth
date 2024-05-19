# Middle Earth
This is a common module that the backend and frontend can use.

## Build and Run
After npm i
1. npx tsc
2. go to your project and use `npm install git@github.com:Missile-Wars-Revival/middle-earth.git`

## Using
Open index.ts to view the available types. They can be imported through:
```
import { Player } from "middle-earth";
```

# Full-Stack Websocket Message Protocol
A full stack protocol is defined here. We'll use messagepack which is a compressed version of JSON. This is a draft and if you think we should change something make a PR or comment.

Some types can be used bi-directionally. This means it is appropriate for the server to send the type to the client and the client can also send that type to the server. I have doubts whether bi-directional types will work long term.

## The WebSocketMessage Type
This is the base message type. Anything sent over websockets will use this type. It will send a list of messages with the Msg type.

## The Msg Type
The message is an abstract type that all others will implement.

## Msg Child Types
Missile, Landmine, MissileHit, and others inherit from Msg.