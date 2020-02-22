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

            this.Main();
        }

        public Update(): void {

        }

        public Main(): void {
            this.addChild(this._rollButton);
            this._rollButton.on("click", ()=> {
                console.log("roll");
            });

            this.addChild(this._d46Button);
            this._d46Button.on("click", ()=>{
                config.Game.SCENE = scenes.State.PLAY;
            });
        }
    }
}