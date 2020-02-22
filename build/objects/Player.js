"use strict";
var objects;
(function (objects) {
    class Player extends objects.GameObject {
        // PRIVATE INSTANCE MEMBERS
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        constructor() {
            super();
            this.Start();
        }
        // PRIVATE METHODS
        _checkBounds() {
        }
        // PUBLIC METHODS
        Start() {
            this.name = "Player";
        }
        Update() {
            this.position = new objects.Vector2(this.stage.mouseX, this.stage.mouseY);
        }
        Reset() {
        }
    }
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map