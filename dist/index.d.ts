/**
 * This file contians a proposed protocol for handling all websocket communication.
 * Most of these datatypes are suitable for both client and server side.
 * The server can relay this datatypes not unlike a TURN server in P2P communication.
 */
type Msg = {}; 
type Identifier = {};

type WebSocketMessage = {
    messages: Msg[];
    identifier: Identifier;
};

// Client <--> Server
type GeoLocation = {
    latitude: number;
    longitude: number;
};

type Player = {
    username: string;
    latitude: number;
    longitude: number;
    updatedAt: string; 
  }

type LocationUpdate = Msg & {
    user: Player;
    location: GeoLocation;
};

type Missile = Msg & {
    type: string;
    status: string;
    destination: GeoLocation;
    currentLocation: GeoLocation;
    missileId: Number; // Unique identifier for the missile. Only unique for each player. 
    radius: number;
    sentbyusername: string,
    timesent: string;
    etatimetoimpact: string;
  }

type Landmine = Msg & {
    type: string;
    latitude: number;
    longitude: number;
    placedby: string;
    placedtime: string;
    etaexpiretime: string;
  }

  type Loot = Msg & {
    latitude: number;
    longitude: number;
    rarity: string;
  }


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
export { WebSocketMessage, GeoLocation, Player, LocationUpdate, Missile, Landmine, Loot, PlayerMissileHit, PlayerLandmineHit, PlayerLootHit, PlayerMissileMiss, PlayerLandmineMiss, MissileType, Missile1Type, Missile2, Missile3, LandmineType, Landmine1, Landmine2, Landmine3 };
