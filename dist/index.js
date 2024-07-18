"use strict";
/**
 * This file contains a proposed protocol for handling all websocket communication.
 * Most of these datatypes are suitable for both client and server side.
 * The server can relay this datatypes not unlike a TURN server in P2P communication.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.classify = exports.unzip = exports.zip_single = exports.zip = exports.Landmine3 = exports.Landmine2 = exports.Landmine1 = exports.LandmineType = exports.Missile3 = exports.Missile2 = exports.Missile1 = exports.MissileType = exports.MissileGroup = exports.FetchMissiles = exports.PlayerLandmineMiss = exports.PlayerMissileMiss = exports.PlayerLootHit = exports.PlayerLandmineHit = exports.PlayerMissileHit = exports.Loot = exports.Landmine = exports.Missile = exports.LocationUpdate = exports.Player = exports.GeoLocation = exports.WebSocketMessage = exports.Msg = void 0;
const msgpack_lite_1 = require("msgpack-lite");
// Base Types. You likely won't directly use these types.
class WebSocketMessage {
    constructor(messages) {
        this.messages = messages;
    }
}
exports.WebSocketMessage = WebSocketMessage;
;
class Msg {
    constructor(itemType) {
        this.itemType = itemType;
    }
}
exports.Msg = Msg;
;
// Client <--> Server
class Echo extends Msg {
    constructor(text) {
        super("Echo");
        this.text = text;
    }
}
class GeoLocation extends Msg {
    constructor(latitude, longitude) {
        super("GeoLocation");
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
exports.GeoLocation = GeoLocation;
;
class Player extends Msg {
    constructor(username, location, updatedAt) {
        super("Player");
        this.username = username;
        this.location = location;
        this.updatedAt = updatedAt;
    }
}
exports.Player = Player;
class LocationUpdate extends Msg {
    constructor(user, location) {
        super("LocationUpdate");
        this.user = user;
        this.location = location;
    }
}
exports.LocationUpdate = LocationUpdate;
;
class Missile extends Msg {
    constructor(type, status, destination, currentLocation, missileId, radius, sentbyusername, timesent, etatimetoimpact) {
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
    static from_db(db_entry) {
        let destination = new GeoLocation(db_entry.destLat, db_entry.destLong);
        let currentLocation = new GeoLocation(db_entry.currentLat, db_entry.currentLong);
        return new Missile(db_entry.type, db_entry.status, destination, currentLocation, db_entry.id, db_entry.radius, db_entry.sentBy, db_entry.sentAt, db_entry.timeToImpact);
    }
}
exports.Missile = Missile;
class Landmine extends Msg {
    constructor(type, location, placedby, placedtime, etaexpiretime) {
        super("Landmine");
        this.type = type;
        this.location = location;
        this.placedby = placedby;
        this.placedtime = placedtime;
        this.etaexpiretime = etaexpiretime;
    }
    static from_db(db_entry) {
        let location = new GeoLocation(db_entry.locLat, db_entry.locLong);
        let etaexpiretime = db_entry.Expires;
        let placedby = db_entry.placedBy;
        return new Landmine(db_entry.type, location, placedby, db_entry.placedtime, etaexpiretime);
    }
}
exports.Landmine = Landmine;
class Loot extends Msg {
    constructor(location, rarity, expiretime) {
        super("Loot");
        this.location = location;
        this.rarity = rarity;
        this.expiretime = expiretime;
    }
    static from_db(db_entry) {
        let location = new GeoLocation(db_entry.locLat, db_entry.locLong);
        let expiretime = db_entry.Expires;
        return new Loot(location, db_entry.rarity, expiretime);
    }
}
exports.Loot = Loot;
// Server -> Client
/**
 * A hit confirmation message is sent to the player who fired the missile and the player who was hit.
 * This ensures the client's view of the game is consistent with the server's view.
 */
class PlayerMissileHit extends Msg {
    constructor(player, missile) {
        super("PlayerMissileHit");
        this.player = player;
        this.missile = missile;
    }
}
exports.PlayerMissileHit = PlayerMissileHit;
;
class PlayerLandmineHit extends Msg {
    constructor(player, landmine) {
        super("PlayerLandmineHit");
        this.player = player;
        this.landmine = landmine;
    }
}
exports.PlayerLandmineHit = PlayerLandmineHit;
;
class PlayerLootHit extends Msg {
    constructor(player, loot) {
        super("PlayerLootHit");
        this.player = player;
        this.loot = loot;
    }
}
exports.PlayerLootHit = PlayerLootHit;
;
/**
 * A miss message is sent to the player who fired the missile.
 * This ensures the client's view of the game is consistent with the server's view.
 */
class PlayerMissileMiss extends Msg {
    constructor(player, missile) {
        super("PlayerMissileMiss");
        this.player = player;
        this.missile = missile;
    }
}
exports.PlayerMissileMiss = PlayerMissileMiss;
;
class PlayerLandmineMiss extends Msg {
    constructor(player, landmine) {
        super("PlayerLandmineMiss");
        this.player = player;
        this.landmine = landmine;
    }
}
exports.PlayerLandmineMiss = PlayerLandmineMiss;
;
class MissileGroup extends Msg {
    constructor(missiles) {
        super("MissileGroup");
        this.missiles = missiles;
    }
}
exports.MissileGroup = MissileGroup;
// Missile Types
class MissileType {
    constructor() {
        this.itemType = "MissileType";
    }
}
exports.MissileType = MissileType;
class Missile1 extends MissileType {
    constructor() {
        super();
        this.typeName = "Missile1";
    }
}
exports.Missile1 = Missile1;
class Missile2 extends MissileType {
    constructor() {
        super();
        this.typeName = "Missile2";
    }
}
exports.Missile2 = Missile2;
class Missile3 extends MissileType {
    constructor() {
        super();
        this.typeName = "Missile3";
    }
}
exports.Missile3 = Missile3;
// Landmine Types
class LandmineType {
    constructor() {
        this.itemType = "LandmineType";
    }
}
exports.LandmineType = LandmineType;
class Landmine1 extends LandmineType {
    constructor() {
        super();
        this.typeName = "Landmine1";
    }
}
exports.Landmine1 = Landmine1;
class Landmine2 extends LandmineType {
    constructor() {
        super();
        this.typeName = "Landmine2";
    }
}
exports.Landmine2 = Landmine2;
class Landmine3 extends LandmineType {
    constructor() {
        super();
        this.typeName = "Landmine3";
    }
}
exports.Landmine3 = Landmine3;
// Client -> Server
// Types to request/fetch data from server
class FetchMissiles extends Msg {
    constructor() {
        super("FetchMissiles");
        this.brand = "FetchMissiles";
    }
}
exports.FetchMissiles = FetchMissiles;
function classify(item) {
    switch (item.itemType) {
        case "Echo":
            let echo = item;
            return echo;
            break;
        case "GeoLocation":
            return new GeoLocation(item.latitude, item.longitude);
            break;
        case "Player":
            let player = item;
            return player;
            break;
        case "LocationUpdate":
            let locupd = item;
            return locupd;
            break;
        case "Missile":
            let missile = item;
            return missile;
            break;
        case "Landmine":
            let landmine = item;
            return landmine;
            break;
        case "Loot":
            let loot = item;
            return loot;
            break;
        case "PlayerMissileHit":
            let pmh = item;
            return pmh;
            break;
        case "PlayerLandmineHit":
            let plh = item;
            return plh;
            break;
        case "PlayerLootHit":
            let plth = item;
            return plth;
            break;
        case "PlayerMissileMiss":
            let pmm = item;
            return pmm;
            break;
        case "PlayerLandmineMiss":
            let plm = item;
            return plm;
            break;
        case "FetchMissiles":
            return new FetchMissiles();
            break;
        case "MissileGroup":
            let misgrp = item;
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
    }
    ;
}
exports.classify = classify;
function zip(wsm) {
    let json = JSON.stringify(wsm);
    let packed = (0, msgpack_lite_1.encode)(json);
    return packed;
}
exports.zip = zip;
function zip_single(msg) {
    return (0, msgpack_lite_1.encode)(JSON.stringify(new WebSocketMessage([msg])));
}
exports.zip_single = zip_single;
function unzip(packed) {
    let unpacked = JSON.parse((0, msgpack_lite_1.decode)(Buffer.from(packed)));
    let to_instantiate = unpacked.messages;
    let instantiated = [];
    to_instantiate.forEach(function (item) { instantiated.push(classify(item)); });
    return new WebSocketMessage(instantiated);
}
exports.unzip = unzip;
