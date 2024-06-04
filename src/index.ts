/**
 * This file contains a proposed protocol for handling all websocket communication.
 * Most of these datatypes are suitable for both client and server side. 
 * The server can relay this datatypes not unlike a TURN server in P2P communication.
 */

// Base Types. You likely won't directly use these types.

class WebSocketMessage {
    messages: Msg[];
    constructor(messages: Msg[]) {
	this.messages = messages;
    }
};

class Msg {
    itemType: string
    constructor(itemType: string) {
	this.itemType = itemType;
    }
}; 



// Client <--> Server
class GeoLocation extends Msg {
    latitude: number;
    longitude: number;
    constructor(latitude: number, longitude: number) {
	super("GeoLocation");
	this.latitude = latitude;
	this.longitude = longitude;
    }
};

class Player extends Msg {
    username: string;
    latitude: number;
    longitude: number;
    updatedAt: string; 
    constructor(username: string,
		latitude: number,
		longitude: number,
		updatedAt: string) {
	super("Player");
	this.username = username;
	this.latitude = latitude;
	this.longitude = longitude;
	this.updatedAt = updatedAt;
    }
}

class LocationUpdate extends Msg {
    user: Player;
    location: GeoLocation;
    constructor(user: Player, location:GeoLocation) {
	super("LocationUpdate");
	this.user = user;
	this.location = location;
    }
};

class Missile extends Msg {
    type: string;
    status: string;
    destination: GeoLocation;
    currentLocation: GeoLocation;
    missileId: Number; // Unique identifier for the missile. Only unique for each player. 
    radius: number;
    sentbyusername: string;
    timesent: string;
    etatimetoimpact: string;

    constructor(type: string,
                status: string,
                destination: GeoLocation,
                currentLocation: GeoLocation,
                missileId: number,
                radius: number,
                sentbyusername: string,
                timesent: string,
                etatimetoimpact: string) {
                    super("Missile");
                    this.type = type;
                    this.status = status;
                    this.destination = destination;
                    this.currentLocation = currentLocation;
                    this.missileId = missileId;
                    this.radius = radius;
                    this.sentbyusername = sentbyusername;
                    this.timesent = timesent;
                    this.etatimetoimpact = etatimetoimpact;
                }
}

class Landmine extends Msg {
    type: string;
    latitude: number;
    longitude: number;
    placedby: string;
    placedtime: string;
    etaexpiretime: string;

    constructor(type: string, latitude: number, longitude: number,
                placedby: string, placedtime: string, etaexpiretime: string
    ) {
        super("Landmine");
        this.type = type;
        this.latitude = latitude;
        this.longitude = longitude;
        this.placedby = placedby;
        this.placedtime = placedtime;
        this.etaexpiretime = etaexpiretime;
    }

}

class Loot extends Msg {
    latitude: number;
    longitude: number;
    rarity: string;
    constructor(latitude: number, longitude: number, rarity: string) {
        super("Landmine");
        this.latitude = latitude;
        this.longitude = longitude;
        this.rarity = rarity;
    }
}


// Server -> Client

/**
 * A hit confirmation message is sent to the player who fired the missile and the player who was hit.
 * This ensures the client's view of the game is consistent with the server's view.
 */
class PlayerMissileHit extends Msg {
    player: Player;
    missile: Missile;
    constructor(player: Player, missile: Missile) {
	super("PlayerMissileHit");
	this.player = player;
	this.missile = missile;
    }
};

class PlayerLandmineHit extends Msg {
    player: Player;
    landmine: Landmine;
    constructor(player: Player, landmine: Landmine) {
	super("PlayerLandmineHit");
	this.player = player;
	this.landmine = landmine;
    }
};

class PlayerLootHit extends Msg {
    player: Player;
    loot: Loot;
    constructor(player: Player, loot: Loot) {
	super("PlayerLootHit");
	this.player = player;
	this.loot = loot;
    }
};

/**
 * A miss message is sent to the player who fired the missile.
 * This ensures the client's view of the game is consistent with the server's view.
 */
class PlayerMissileMiss extends Msg {
    player: Player;
    missile: Missile;
    constructor(player: Player, missile: Missile) {
	super("PlayerMissileMiss");
	this.player = player;
	this.missile = missile;
    }
};

class PlayerLandmineMiss extends Msg {
    player: Player;
    landmine: Landmine;
    constructor(player: Player, landmine: Landmine) {
	super("PlayerLandmineMiss");
	this.player = player;
	this.landmine = landmine;
    }
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


function zip(wsm: WebSocketMessage) {
    
}


export {
    Msg,
    WebSocketMessage,
    GeoLocation,
    Player,
    LocationUpdate,
    Missile,
    Landmine,
    Loot,
    PlayerMissileHit,
    PlayerLandmineHit,
    PlayerLootHit,
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
