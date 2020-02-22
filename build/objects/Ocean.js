"use strict";
var objects;
(function (objects) {
    class Ocean extends objects.GameObject {
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        constructor() {
            super(config.Game.ASSETS.getResult("ocean"));
            this.Start();
        }
        // PRIVATE METHODS
        _checkBounds() {
            if (this.y >= 0) {
                this.Reset();
            }
        }
        _move() {
            this.position = objects.Vector2.add(this.position, this.velocity);
        }
        // PUBLIC METHODS
        Start() {
            this._verticalSpeed = 5; // 5 px per frame
            this.velocity = new objects.Vector2(0, this._verticalSpeed);
            this.Reset();
        }
        Update() {
            this._move();
            this._checkBounds();
        }
        Reset() {
            this.position = new objects.Vector2(0, -960);
        }
    }
    objects.Ocean = Ocean;
})(objects || (objects = {}));
//# sourceMappingURL=Ocean.js.map