/**
 * This file contians a proposed protocol for handling all websocket communication.
 * Most of these datatypes are suitable for both client and server side. 
 * The server can relay this datatypes not unlike a TURN server in P2P communication.
 */

// Base Types. You likely won't directly use these types.
type Msg = {}; 
type Identifier = {};

type WebSocketMessage = {
    messages: Msg[];
    identifier: Identifier;
};

// Client <--> Server
type GeoLocation = Msg & {
    lat: number;
    lon: number;
};

type Player = Msg & {
    id: string;
    location: GeoLocation;
};

type LocationUpdate = Msg & {
    user: Player;
    location: GeoLocation;
};

type Missile = Msg & {
    type: MissileType;
    missileId: Number; // Unique identifier for the missile. Only unique for each player.
    origin: Player;
    target: Player;
};

type Landmine = {
    type: LandmineType;
    landmineId: Number; // Unique identifier for the landmine. Only unique for each player.
    origin: Player;
    location: GeoLocation;
};

// Server -> Client

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

// Missile Types
type MissileType = ""; // Abstract type. Don't use.
type Missile1Type = MissileType & "Missile1";
type Missile2 = MissileType & "Missile2";
type Missile3 = MissileType & "Missile3";

// Landmine Types
type LandmineType = ""; // Abstract type. Don't use.
type Landmine1 = LandmineType & "Landmine1";
type Landmine2 = LandmineType & "Landmine2";
type Landmine3 = LandmineType & "Landmine3";

export {
    WebSocketMessage,
    GeoLocation,
    Player,
    LocationUpdate,
    Missile,
    Landmine,
    PlayerMissileHit,
    PlayerLandmineHit,
    PlayerMissileMiss,
    PlayerLandmineMiss,
    MissileType,
    Missile1Type,
    Missile2,
    Missile3,
    LandmineType,
    Landmine1,
    Landmine2,
    Landmine3
};