"use strict";
var objects;
(function (objects) {
    class Plane extends objects.GameObject {
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        constructor() {
            super(config.Game.ASSETS.getResult("plane"), 0, 0, true);
            this.Start();
        }
        // PRIVATE METHODS
        _checkBounds() {
            // left boundary
            if (this.position.x <= this.halfWidth) {
                this.position = new objects.Vector2(this.halfWidth, this.position.y);
            }
            // right boundary
            if (this.position.x >= config.Game.SCREEN_WIDTH - this.halfWidth) {
                this.position = new objects.Vector2(config.Game.SCREEN_WIDTH - this.halfWidth, this.position.y);
            }
        }
        _move() {
            let newPositionX = util.Mathf.Lerp(this.position.x, this.stage.mouseX, 0.05);
            this.position = new objects.Vector2(newPositionX, this._verticalPosition);
        }
        // PUBLIC METHODS
        Start() {
            this._verticalPosition = 430; // locked to the bottom of the screen
        }
        Update() {
            this._move();
            this._checkBounds();
        }
        Reset() {
        }
    }
    objects.Plane = Plane;
})(objects || (objects = {}));
//# sourceMappingURL=plane.js.map