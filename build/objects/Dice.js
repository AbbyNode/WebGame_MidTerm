"use strict";
var objects;
(function (objects) {
    /**
     * Represents a 6-sided die that can be rolled
     *
     * @export
     * @class Dice
     */
    class Dice extends objects.GameObject {
        //#endregion
        constructor() {
            super();
            this._rollDuration = 1; // Seconds
            this._isRolling = false;
            this.Start();
        }
        //#endregion
        //#region public properties
        get object() {
            return this._object;
        }
        set object(v) {
            this._object = v;
        }
        get sprite() {
            return this._sprite;
        }
        set sprite(v) {
            this._sprite = v;
        }
        get result() {
            return this._result;
        }
        set result(v) {
            this._result = v;
        }
        _checkBounds() {
        }
        Start() {
            this.object = new createjs.Container();
            let spriteSheet = new createjs.SpriteSheet({
                images: [config.Game.ASSETS.getResult("diceSpriteSheet")],
                frames: {
                    width: 200,
                    height: 200,
                    count: 6,
                    regX: 100,
                    regY: 100,
                    spacing: 1,
                },
                animations: {
                    rollFast: {
                        frames: [0, 5],
                        speed: 1
                    },
                    rollSlow: {
                        frames: [0, 5],
                        speed: 0.1
                    }
                }
            });
            this.sprite = new createjs.Sprite(spriteSheet);
            this.sprite.scaleX = 0.5;
            this.sprite.scaleY = 0.5;
            this.object.addChild(this.sprite);
            this._label = new objects.Label("1", "14pt", "consolas", "#000000", 0, 80);
            this.object.addChild(this._label);
        }
        Update() {
            // If rolling,
            if (this._isRolling) {
                // Get time diff from roll start
                let timeDiff = createjs.Ticker.getTime() - this._rollStartTime;
                timeDiff /= 1000;
                // If more than required duration
                if (timeDiff >= this._rollDuration) {
                    // Generate result
                    this.result = Math.round((Math.random() * 5) + 1);
                    // Stop sprite
                    this.sprite.gotoAndStop(this.result - 1);
                    // Stop rolling
                    this._isRolling = false;
                    // Update label
                    this._label.text = this.result.toString();
                    this._label.visible = true;
                    // Callback
                    this._rollCallback(this.result, this);
                }
            }
        }
        Reset() {
        }
        /**
         * Rolls the die and then send result to callback fn
         *
         * @param {(result:number, dice:Dice) => void} callback
         * @memberof Dice
         */
        Roll(callback) {
            // Start rolling
            this._rollStartTime = createjs.Ticker.getTime();
            this._rollCallback = callback;
            this._isRolling = true;
            // Animate
            this._sprite.gotoAndPlay("rollSlow");
            // Hide label
            this._label.visible = false;
        }
    }
    objects.Dice = Dice;
})(objects || (objects = {}));
//# sourceMappingURL=Dice.js.map