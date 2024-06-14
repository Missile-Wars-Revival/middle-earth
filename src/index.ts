/**
 * This file contains a proposed protocol for handling all websocket communication.
 * Most of these datatypes are suitable for both client and server side. 
 * The server can relay this datatypes not unlike a TURN server in P2P communication.
 */

import { encode, decode } from 'msgpack-lite';

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
}

class Landmine extends Msg {
    type: string;
    location: GeoLocation;
    placedby: string;
    placedtime: string;
    etaexpiretime: string;
    constructor(type: string, location: GeoLocation,
        placedby: string, placedtime: string, etaexpiretime: string
    ) {
        super("Landmine");
        this.type = type;
        this.location = location;
        this.placedby = placedby;
        this.placedtime = placedtime;
        this.etaexpiretime = etaexpiretime;
    }

}

class Loot extends Msg {
    location: GeoLocation;
    rarity: string;
    expiretime: string;
    constructor(location: GeoLocation, rarity: string, expiretime: string) {
        super("Loot");
        this.location = location;
        this.rarity = rarity;
        this.expiretime = expiretime;
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

function zip_single(msg: Msg) {
    return encode(JSON.stringify(new WebSocketMessage([msg])));
}

function unzip(packed: Buffer) {
    let unpacked: WebSocketMessage = JSON.parse(decode(Buffer.from(packed)));
    let to_instantiate = unpacked.messages;
    let instantiated: Msg[] = [];
    to_instantiate.forEach(function (item) { instantiated.push(classify(item)) });
    return new WebSocketMessage(instantiated);
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
