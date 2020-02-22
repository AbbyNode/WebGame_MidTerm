/**
 * Source: Play.ts
 * Author: Abby Shah
 * Date: 2020, Feb 22
 * 
 * Description:
 * This scene rolls 2 dice and displays the results visually and numerically
 */

module scenes {
    export class Play extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _rollButton: objects.Button;
        private _d46Button: objects.Button;

        private _table: createjs.Bitmap;

        private _dice: objects.Dice[];

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor() {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void {
            this._rollButton = new objects.Button(config.Game.ASSETS.getResult("rollButton"), 300, 430, true);
            this._d46Button = new objects.Button(config.Game.ASSETS.getResult("play_4d6"), 520, 430, true);

            this._table = new createjs.Bitmap(config.Game.ASSETS.getResult("table"));
            this._table.scaleX = 1.1;
            this._table.scaleY = 1.1;
            this._table.x = -100;

            this._dice = [];
            this._createDice(2);

            this.Main();
        }

        public Update(): void {
            this._dice.forEach(dice => {
                dice.Update();
            });
        }

        public Main(): void {
            this.addChild(this._table);

            this._dice.forEach(dice => {
                this.addChild(dice.object);
            });

            this.addChild(this._rollButton);
            this._rollButton.on("click", ()=> {
                this._roll();
            });

            this.addChild(this._d46Button);
            this._d46Button.on("click", ()=>{
                config.Game.SCENE = scenes.State.PLAY_4D6;
            });

        }

        /**
         * Rolls the dice
         *
         * @private
         * @memberof Play
         */
        private _roll(): void {
            // Play sound
            createjs.Sound.play("diceRollSound");

            // Roll all die
            let completed = 0;
            this._dice.forEach(dice => {
                dice.Roll((result, dice) => {
                    completed++;
                    if (completed >= this._dice.length) {
                        this._showResult();
                    }
                });
            })
        }

        private _showResult(): void {
            // Stop sound
            createjs.Sound.stop();

            // Show total in console
            let total = 0;
            this._dice.forEach(dice => {
                total += dice.result;
            });
            console.log(total);
        }

        /**
         * Creates x number of dice
         *
         * @private
         * @param {number} amount
         * @memberof Play
         */
        private _createDice(amount: number): void {
            let offset = 200;
            let spacing = (640-offset) / amount;

            for (let i = 0; i<amount; i++) {
                let dice = new objects.Dice();
                dice.object.x = spacing * i + offset;
                dice.object.y = 200;
                this._dice[i] = dice;
            }
        }
    }
}