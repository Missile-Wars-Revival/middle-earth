# Middle Earth
This is a common module that the backend and frontend can use.

It has been installed on frontend so just run `npm i` there. 

## Build and Run
1. `npm i`
2. `npx tsc`
3. go to your project and use: `npm install git@github.com:Missile-Wars-Revival/middle-earth.git`

## Using
Open index.ts to view the available types. They can be imported through:
```
import { Player } from "middle-earth";
```

### Sending / Serializing
In your code, prepare a `WebSocketMessage` with however many `Msg`s you like, and then feed it into `zip()` to serialize and compress it, returning a `Buffer`. Send this over the websocket.

### Receiving / Deserializing
Take the incoming `Buffer` and pass it as an argument to `unzip()`. It will return a `WebSocketMessage` containing several `Msg` types.


# Full-Stack Websocket Message Protocol
A full stack protocol is defined here. We'll use messagepack which is a compressed version of JSON. This is a draft and if you think we should change something make a PR or comment.

Some types can be used bi-directionally. This means it is appropriate for the server to send the type to the client and the client can also send that type to the server. I have doubts whether bi-directional types will work long term.

## The WebSocketMessage Type
This is the base message type. Anything sent over websockets will use this type. It will send a list of messages with the Msg type.

## The Msg Type
The message is an abstract type that all others will implement.

## Msg Child Types
Missile, Landmine, MissileHit, and others inherit from Msg.
