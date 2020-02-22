"use strict";
var objects;
(function (objects) {
    class Button extends objects.GameObject {
        // constructor
        constructor(imagePath = config.Game.ASSETS.getResult("button"), x = 0, y = 0, isCentered = false) {
            super(imagePath, x, y, isCentered);
            this.on("mouseover", this.MouseOver);
            this.on("mouseout", this.MouseOut);
            this.Start();
        }
        // PRIVATE METHODS
        _checkBounds() {
        }
        // PUBLIC METHODS
        MouseOver() {
            this.alpha = 0.7;
        }
        MouseOut() {
            this.alpha = 1.0;
        }
        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        Start() {
            this.name = "Button";
        }
        Update() {
        }
        Reset() {
        }
    }
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=Button.js.map