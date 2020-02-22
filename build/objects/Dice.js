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
        get sprite() {
            return this._sprite;
        }
        set sprite(v) {
            this._sprite = v;
        }
        _checkBounds() {
        }
        Start() {
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
                    let result = Math.round((Math.random() * 5) + 1);
                    // Stop sprite
                    this.sprite.gotoAndStop(result - 1);
                    // Stop rolling
                    this._isRolling = false;
                    // Callback
                    this._rollCallback(result, this);
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
            this._rollStartTime = createjs.Ticker.getTime();
            this._rollCallback = callback;
            this._isRolling = true;
            this._sprite.gotoAndPlay("rollSlow");
        }
    }
    objects.Dice = Dice;
})(objects || (objects = {}));
//# sourceMappingURL=Dice.js.map