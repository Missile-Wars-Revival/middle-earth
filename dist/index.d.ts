/**
 * This file contains a proposed protocol for handling all websocket communication.
 * Most of these datatypes are suitable for both client and server side.
 * The server can relay this datatypes not unlike a TURN server in P2P communication.
 */
/// <reference types="node" />
declare class WebSocketMessage {
    messages: Msg[];
    constructor(messages: Msg[]);
}
declare class Msg {
    itemType: string;
    constructor(itemType: string);
}
declare class Echo extends Msg {
    text: string;
    constructor(text: string);
}
declare class GeoLocation extends Msg {
    latitude: number;
    longitude: number;
    constructor(latitude: number, longitude: number);
}
declare class Player extends Msg {
    username: string;
    location: GeoLocation;
    updatedAt: string;
    constructor(username: string, location: GeoLocation, updatedAt: string);
}
declare class LocationUpdate extends Msg {
    user: Player;
    location: GeoLocation;
    constructor(user: Player, location: GeoLocation);
}
declare class Missile extends Msg {
    type: string;
    status: string;
    destination: GeoLocation;
    currentLocation: GeoLocation;
    missileId: Number;
    radius: number;
    sentbyusername: string;
    timesent: string;
    etatimetoimpact: string;
    constructor(type: string, status: string, destination: GeoLocation, currentLocation: GeoLocation, missileId: number, radius: number, sentbyusername: string, timesent: string, etatimetoimpact: string);
    static from_db(db_entry: any): Missile;
}
declare class Landmine extends Msg {
    type: string;
    location: GeoLocation;
    placedby: string;
    placedtime: string;
    etaexpiretime: string;
    constructor(type: string, location: GeoLocation, placedby: string, placedtime: string, etaexpiretime: string);
}
declare class Loot extends Msg {
    location: GeoLocation;
    rarity: string;
    expiretime: string;
    constructor(location: GeoLocation, rarity: string, expiretime: string);
}
/**
 * A hit confirmation message is sent to the player who fired the missile and the player who was hit.
 * This ensures the client's view of the game is consistent with the server's view.
 */
declare class PlayerMissileHit extends Msg {
    player: Player;
    missile: Missile;
    constructor(player: Player, missile: Missile);
}
declare class PlayerLandmineHit extends Msg {
    player: Player;
    landmine: Landmine;
    constructor(player: Player, landmine: Landmine);
}
declare class PlayerLootHit extends Msg {
    player: Player;
    loot: Loot;
    constructor(player: Player, loot: Loot);
}
/**
 * A miss message is sent to the player who fired the missile.
 * This ensures the client's view of the game is consistent with the server's view.
 */
declare class PlayerMissileMiss extends Msg {
    player: Player;
    missile: Missile;
    constructor(player: Player, missile: Missile);
}
declare class PlayerLandmineMiss extends Msg {
    player: Player;
    landmine: Landmine;
    constructor(player: Player, landmine: Landmine);
}
declare class MissileGroup extends Msg {
    missiles: Missile[];
    constructor(missiles: Missile[]);
}
declare class MissileType {
    itemType: string;
    missileBrand: "MISSILE";
    constructor();
}
declare class Missile1 extends MissileType {
    typeName: string;
    constructor();
}
declare class Missile2 extends MissileType {
    typeName: string;
    constructor();
}
declare class Missile3 extends MissileType {
    typeName: string;
    constructor();
}
declare class LandmineType {
    itemType: string;
    landmineBrand: "LANDMINE";
    constructor();
}
declare class Landmine1 extends LandmineType {
    typeName: string;
    constructor();
}
declare class Landmine2 extends LandmineType {
    typeName: string;
    constructor();
}
declare class Landmine3 extends LandmineType {
    typeName: string;
    constructor();
}
declare class FetchMissiles extends Msg {
    private brand;
    constructor();
}
declare function classify(item: any): Echo | GeoLocation | Player | LocationUpdate | Missile | Landmine | Loot | PlayerMissileHit | PlayerLandmineHit | PlayerLootHit | PlayerMissileMiss | PlayerLandmineMiss | MissileGroup | Missile1 | Missile2 | Missile3 | Landmine1 | Landmine2 | Landmine3 | FetchMissiles;
declare function zip(wsm: WebSocketMessage): Buffer;
declare function zip_single(msg: Msg): Buffer;
declare function unzip(packed: Buffer): WebSocketMessage;
export { Msg, WebSocketMessage, GeoLocation, Player, LocationUpdate, Missile, Landmine, Loot, PlayerMissileHit, PlayerLandmineHit, PlayerLootHit, PlayerMissileMiss, PlayerLandmineMiss, FetchMissiles, MissileGroup, MissileType, Missile1, Missile2, Missile3, LandmineType, Landmine1, Landmine2, Landmine3, zip, zip_single, unzip, classify };
