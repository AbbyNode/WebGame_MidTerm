"use strict";
/**
 * Source: Play4d6.ts
 * Author: Abby Shah
 * Date: 2020, Feb 22
 *
 * Description:
 * This scene does the following:
 * Rolls 4 dice
 * Removes the lowest number
 * Displays the results visually and numerically
 */
var scenes;
(function (scenes) {
    class Play4D6 extends objects.Scene {
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        constructor() {
            super();
            this.Start();
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //initialize and instatiate
        Start() {
            this._rollButton = new objects.Button(config.Game.ASSETS.getResult("rollButton"), 300, 430, true);
            this._d46Button = new objects.Button(config.Game.ASSETS.getResult("play_2d6"), 520, 430, true);
            this._dice = [];
            this._createDice(4);
            this.Main();
        }
        Update() {
            this._dice.forEach(dice => {
                dice.Update();
            });
        }
        Main() {
            this.addChild(this._rollButton);
            this._rollButton.on("click", () => {
                this._roll();
            });
            this.addChild(this._d46Button);
            this._d46Button.on("click", () => {
                config.Game.SCENE = scenes.State.PLAY;
            });
        }
        /**
         * Rolls the dice
         *
         * @private
         * @memberof Play
         */
        _roll() {
            let total = 0;
            let completed = 0;
            this._dice.forEach(dice => {
                dice.Roll((result, dice) => {
                    total += result;
                    completed++;
                    if (completed >= this._dice.length) {
                        this._showResult(total);
                    }
                });
            });
        }
        _showResult(result) {
            console.log(result);
        }
        /**
         * Creates x number of dice
         *
         * @private
         * @param {number} amount
         * @memberof Play
         */
        _createDice(amount) {
            let offset = 120;
            let spacing = (640 - offset) / amount;
            for (let i = 0; i < amount; i++) {
                let dice = new objects.Dice();
                dice.object.x = spacing * i + offset;
                dice.object.y = 200;
                this.addChild(dice.object);
                this._dice[i] = dice;
            }
        }
    }
    scenes.Play4D6 = Play4D6;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play4D6.js.map