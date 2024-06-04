"use strict";
/**
 * This file contains a proposed protocol for handling all websocket communication.
 * Most of these datatypes are suitable for both client and server side.
 * The server can relay this datatypes not unlike a TURN server in P2P communication.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerLandmineMiss = exports.PlayerMissileMiss = exports.PlayerLootHit = exports.PlayerLandmineHit = exports.PlayerMissileHit = exports.Loot = exports.Landmine = exports.Missile = exports.LocationUpdate = exports.Player = exports.GeoLocation = exports.WebSocketMessage = exports.Msg = void 0;
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
    constructor(username, latitude, longitude, updatedAt) {
        super("Player");
        this.username = username;
        this.latitude = latitude;
        this.longitude = longitude;
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
}
exports.Missile = Missile;
class Landmine extends Msg {
    constructor(type, latitude, longitude, placedby, placedtime, etaexpiretime) {
        super("Landmine");
        this.type = type;
        this.latitude = latitude;
        this.longitude = longitude;
        this.placedby = placedby;
        this.placedtime = placedtime;
        this.etaexpiretime = etaexpiretime;
    }
}
exports.Landmine = Landmine;
class Loot extends Msg {
    constructor(latitude, longitude, rarity) {
        super("Landmine");
        this.latitude = latitude;
        this.longitude = longitude;
        this.rarity = rarity;
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
function zip(wsm) {
}
