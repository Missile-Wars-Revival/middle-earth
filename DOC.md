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

###
