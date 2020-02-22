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

module scenes {
    export class Play4D6 extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _rollButton: objects.Button;
        private _d46Button: objects.Button;

        private _table: createjs.Bitmap;

        private _dice: objects.Dice[];
        
        private _resultLabel: objects.Label;
        
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
            this._d46Button = new objects.Button(config.Game.ASSETS.getResult("play_2d6"), 520, 430, true);

            this._table = new createjs.Bitmap(config.Game.ASSETS.getResult("table"));
            this._table.scaleX = 1.1;
            this._table.scaleY = 1.1;
            this._table.x = -100;

            this._dice = [];
            this._createDice(4);

            this._resultLabel = new objects.Label("Result: ", "14pt", "consolas", "#000000", 300, 350, true);
            this._resultLabel.visible = false;

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
            
            this.addChild(this._resultLabel);

            this.addChild(this._rollButton);
            this._rollButton.on("click", ()=> {
                this._roll();
            });

            this.addChild(this._d46Button);
            this._d46Button.on("click", ()=>{
                config.Game.SCENE = scenes.State.PLAY;
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

            // Find lowest dice
            let lowestResult = 7;
            let lowestDiceIndex = -1;
            for (let i = 0; i< this._dice.length; i++) {
                let dice = this._dice[i];
                if (dice.result < lowestResult) {
                    lowestResult = dice.result;
                    lowestDiceIndex = i;
                }
            }

            // Calculate total
            let total = 0;
            for (let i = 0; i< this._dice.length; i++) {
                if (i != lowestDiceIndex) {
                    total += this._dice[i].result;
                }
            }

            // Show result on label
            this._resultLabel.visible = true;
            this._resultLabel.text = "Result: " + total;
        }

        /**
         * Creates x number of dice
         *
         * @private
         * @param {number} amount
         * @memberof Play
         */
        private _createDice(amount: number): void {
            let offset = 120;
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