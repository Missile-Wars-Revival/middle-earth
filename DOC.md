# Middle-Earth API & Types
Contents are sorted first by group (base, bidirectional, server-to-client, serde functions) and then alphabetically.

## Base types

### WebSocketMessage

```ts
class WebSocketMessage {
    messages: Msg[];
    constructor(messages: Msg[]) {
        this.messages = messages;
    }
}
```
The `WebSocketMessage` serves as a container that wraps an arbitrary number of `Msg` types. This allows them to be batched together to group communications. `WebSocketMessage` is the only type that may be passed to the `zip()` function.

### Msg

```ts
class Msg {
    itemType: string;
    constructor(itemType: string) {
        this.itemType = itemType;
    }
}
```
`Msg` is a base that all the main message types descended from. It contains an `itemType` field that contains the name of the type. This is hardwired in the constructor of each child. This field is only intended for use by `unzip()` to tell it which child to use when rebuilding class instances.


## Bidirectional types
Bidirectional types can be sent from the client to the server, or vise versa.

### Echo 

```ts
class Echo extends Msg {
    text: string;
    constructor(text: string) {
        super("Echo");
        this.text = text;
    }
}
```
`Echo` is a type that exists purely for testing and healthcheck purposes. As of `6b455ce` on backend, there is working inmplementation that will return a duplicate of any `Echo`s it receives. `Echo` has no purpose for gameplay.

## Server -> Client

### MissileGroup

Only one field, an array of `Missile`s, passed in as the sole argument to the contructor. Sent to the client in response to receiving a `FetchMissiles` message.

## Client -> Server

### FetchMissiles

`FetchMissiles` has no fields, but still must be instantiated via `new FetchMissiles()` syntax. It is simply a request to the server to send missile data.


## Serde functions

These are the functions providing serde (serialize/deserialize) functionality for easier transmission of data between clients and the server.

### zip(wsm: WebSocketMessage) -> Buffer

zip() takes a `WebSocketMessage` (containing as many `Msg`s as you wish) and returns it as a compressed binary buffer to reduce bandwidth consumption. This buffer can be transmitted over WebSocket.

### zip_single(msg: Msg) -> Buffer

`zip_single()` is a shortcut that takes a single `Msg`, wraps it in a `WebSocketMessage`, and then calls `zip()` on the resulting buffer and returns it to the user.

### unzip(packed: Buffer) -> WebSocketMessage

`unzip()` takes in the buffers created by `zip()` and `zip_single()` and deserializes them, returning a `WebSocketMessage` containing the same messages as the original.

