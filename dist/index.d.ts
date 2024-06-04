/**
 * This file contains a proposed protocol for handling all websocket communication.
 * Most of these datatypes are suitable for both client and server side.
 * The server can relay this datatypes not unlike a TURN server in P2P communication.
 */
declare class WebSocketMessage {
    messages: Msg[];
    constructor(messages: Msg[]);
}
declare class Msg {
    itemType: string;
    constructor(itemType: string);
}
declare class GeoLocation extends Msg {
    latitude: number;
    longitude: number;
    constructor(latitude: number, longitude: number);
}
declare class Player extends Msg {
    username: string;
    latitude: number;
    longitude: number;
    updatedAt: string;
    constructor(username: string, latitude: number, longitude: number, updatedAt: string);
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
}
declare class Landmine extends Msg {
    type: string;
    latitude: number;
    longitude: number;
    placedby: string;
    placedtime: string;
    etaexpiretime: string;
    constructor(type: string, latitude: number, longitude: number, placedby: string, placedtime: string, etaexpiretime: string);
}
declare class Loot extends Msg {
    latitude: number;
    longitude: number;
    rarity: string;
    constructor(latitude: number, longitude: number, rarity: string);
}
/**
 * A hit confirmation message is sent to the player who fired the missile and the player who was hit.
 * This ensures the client's view of the game is consistent with the server's view.
 */
type PlayerMissileHit = Msg & {
    player: Player;
    missile: Missile;
};
type PlayerLandmineHit = Msg & {
    player: Player;
    landmine: Landmine;
};
type PlayerLootHit = Msg & {
    player: Player;
    loot: Loot;
};
/**
 * A miss message is sent to the player who fired the missile.
 * This ensures the client's view of the game is consistent with the server's view.
 */
type PlayerMissileMiss = Msg & {
    player: Player;
    missile: Missile;
};
type PlayerLandmineMiss = Msg & {
    player: Player;
    landmine: Landmine;
};
type MissileType = "";
type Missile1Type = MissileType & "Missile1";
type Missile2 = MissileType & "Missile2";
type Missile3 = MissileType & "Missile3";
type LandmineType = "";
type Landmine1 = LandmineType & "Landmine1";
type Landmine2 = LandmineType & "Landmine2";
type Landmine3 = LandmineType & "Landmine3";
export { Msg, WebSocketMessage, GeoLocation, Player, LocationUpdate, Missile, Landmine, Loot, PlayerMissileHit, PlayerLandmineHit, PlayerLootHit, PlayerMissileMiss, PlayerLandmineMiss, MissileType, Missile1Type, Missile2, Missile3, LandmineType, Landmine1, Landmine2, Landmine3 };
