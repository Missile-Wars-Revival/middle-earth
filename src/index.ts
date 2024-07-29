/**
 * This file contains a proposed protocol for handling all websocket communication.
 * Most of these datatypes are suitable for both client and server side. 
 * The server can relay this datatypes not unlike a TURN server in P2P communication.
 */

import { encode, decode } from 'msgpack-lite';

// Base Types. You likely won't directly use these types.

class WebSocketMessage {
    messages: WSMsg[];
    constructor(messages: WSMsg[]) {
        this.messages = messages;
    }
};

class Msg {
    itemType: string
    constructor(itemType: string) {
        this.itemType = itemType;
    }
};

class WSMsg {
    itemType: string;
    data: any;  // Ideally, this should be more specific than 'any'.

    constructor(itemType: string, data: any) {
        this.itemType = itemType;
        this.data = data;
    }
};



// Client <--> Server

class Echo extends Msg {
    text: string;
    constructor(text: string) {
        super("Echo");
        this.text = text;
    }
}

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
    location: GeoLocation;
    updatedAt: string;
    constructor(username: string,
        location: GeoLocation,
        updatedAt: string) {
        super("Player");
        this.username = username;
        this.location = location;
        this.updatedAt = updatedAt;
    }
}

class LocationUpdate extends Msg {
    user: Player;
    location: GeoLocation;
    constructor(user: Player, location: GeoLocation) {
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

    static from_db(db_entry: any) {
        let destination = new GeoLocation(db_entry.destLat, db_entry.destLong);
        let currentLocation = new GeoLocation(db_entry.currentLat,
                                              db_entry.currentLong);
        return new Missile(db_entry.type,
                           db_entry.status,
                           destination,
                           currentLocation,
                           db_entry.id,
                           db_entry.radius,
                           db_entry.sentBy,
                           db_entry.sentAt,
                           db_entry.timeToImpact);
    }

}

class Landmine extends Msg {
    id: number;
    type: string;
    location: GeoLocation;
    placedby: string;
    placedtime: string;
    etaexpiretime: string;
    constructor(id: number, type: string, location: GeoLocation,
        placedby: string, placedtime: string, etaexpiretime: string
    ) {
        super("Landmine");
        this.id = id;
        this.type = type;
        this.location = location;
        this.placedby = placedby;
        this.placedtime = placedtime;
        this.etaexpiretime = etaexpiretime;
    }

    static from_db(db_entry: any) {
        let location = new GeoLocation(db_entry.locLat, db_entry.locLong);
        let placedby = db_entry.placedBy
        let etaexpiretime = db_entry.Expires
        return new Landmine(
            db_entry.id,
            db_entry.type,
            location,
            placedby,
            db_entry.placedtime,
            etaexpiretime);
    }
}

class Loot extends Msg {
    id: number
    location: GeoLocation;
    rarity: string;
    expiretime: string;
    constructor(id: number, location: GeoLocation, rarity: string, expiretime: string) {
        super("Loot");
        this.id = id;
        this.location = location;
        this.rarity = rarity;
        this.expiretime = expiretime;
    }
    static from_db(db_entry: any) {
        let location = new GeoLocation(db_entry.locLat, db_entry.locLong);
        let expiretime = db_entry.Expires
        return new Loot(
            db_entry.id,
            location,
            db_entry.rarity,
            expiretime);
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


class MissileGroup extends Msg {
    missiles: Missile[];
    constructor(missiles: Missile[]) {
        super("MissileGroup");
        this.missiles = missiles;
    }
}


// Missile Types
class MissileType { // Abstract type. Don't use.
    itemType: string;
    missileBrand: "MISSILE" // Used to prevent TS from conflating MissileType and LandmineType
    constructor() {
        this.itemType = "MissileType";
    }
}

class Missile1 extends MissileType {
    typeName: string;
    constructor() {
        super();
        this.typeName = "Missile1";
    }
}

class Missile2 extends MissileType {
    typeName: string;
    constructor() {
        super();
        this.typeName = "Missile2";
    }
}

class Missile3 extends MissileType {
    typeName: string;
    constructor() {
        super();
        this.typeName = "Missile3";
    }
}

// Landmine Types
class LandmineType {
    itemType: string
    landmineBrand: "LANDMINE" // Used to prevent TS from conflating this type with MissileType
    constructor() {
        this.itemType = "LandmineType";
    }

}

class Landmine1 extends LandmineType {
    typeName: string;
    constructor() {
        super();
        this.typeName = "Landmine1"
    }
}

class Landmine2 extends LandmineType {
    typeName: string;
    constructor() {
        super();
        this.typeName = "Landmine2"
    }
}
class Landmine3 extends LandmineType {
    typeName: string;
    constructor() {
        super();
        this.typeName = "Landmine3"
    }
}



// Client -> Server
// Types to request/fetch data from server

class FetchMissiles extends Msg {
    private brand: string;
    constructor() {
        super("FetchMissiles");
        this.brand = "FetchMissiles";
    }
}


function classify(item: any) {
    switch (item.itemType) {
	case "Echo":
	    let echo: Echo = item;
	    return echo;
	    break;
	case "GeoLocation": 
	    return new GeoLocation(item.latitude, item.longitude);
	    break;
	case "Player":
	    let player: Player = item;
	    return player;
	    break;
	case "LocationUpdate":
	    let locupd: LocationUpdate = item;
	    return locupd;
	    break;
	case "Missile":
	    let missile: Missile = item;
	    return missile;
	    break;
	case "Landmine":
	    let landmine: Landmine = item;
	    return landmine;
	    break;
	case "Loot":
	    let loot: Loot = item;
	    return loot;
	    break;
	case "PlayerMissileHit":
	    let pmh: PlayerMissileHit = item;
	    return pmh;
	    break;
	case "PlayerLandmineHit":
	    let plh: PlayerLandmineHit = item;
	    return plh;
	    break;
	case "PlayerLootHit":
	    let plth: PlayerLootHit = item;
	    return plth;
	    break;
	case "PlayerMissileMiss":
	    let pmm: PlayerMissileMiss = item;
	    return pmm;
	    break;
	case "PlayerLandmineMiss":
	    let plm: PlayerLandmineMiss = item;
	    return plm;
	    break;
    case "FetchMissiles":
        return new FetchMissiles();
        break;
    case "MissileGroup":
        let misgrp: MissileGroup = item;
        return misgrp;
        break;
	case "Missile1":
	    return new Missile1();
	    break;
	case "Missile2":
	    return new Missile2();
	    break;
	case "Missile3":
	    return new Missile3();
	    break;
	case "Landmine1":
	    return new Landmine1();
	    break;
	case "Landmine2":
	    return new Landmine2();
	    break;
	case "Landmine3":
	    return new Landmine3();
	    break;
    };
}


function zip(wsm: WebSocketMessage) {
    let json = JSON.stringify(wsm);
    let packed = encode(json);
    return packed;
}

function zip_single(msg: WSMsg) {
    return encode(JSON.stringify(new WebSocketMessage([msg])));
}

function unzip(packed: Buffer | Uint8Array | number[]) {
    // Assuming `decode` function can take a Uint8Array and return a string
    let unpackedString = decode(packed);
    let unpacked = JSON.parse(unpackedString);
    let to_instantiate = unpacked.messages;
    let instantiated: WSMsg[] = [];
    to_instantiate.forEach((item: { itemType: string; data: any; }) => {
        instantiated.push(new WSMsg(item.itemType, item.data)); // Ensure WSMsg is properly instantiated
    });
    return new WebSocketMessage(instantiated);
}


export {
    WSMsg,
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
    FetchMissiles,
    MissileGroup,
    MissileType,
    Missile1,
    Missile2,
    Missile3,
    LandmineType,
    Landmine1,
    Landmine2,
    Landmine3,
    zip,
    zip_single,
    unzip,
    classify
};
