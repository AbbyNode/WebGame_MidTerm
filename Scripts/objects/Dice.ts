module objects {
    /**
     * Represents a 6-sided die that can be rolled
     *
     * @export
     * @class Dice
     */
    export class Dice extends GameObject {
        //#region private vars
        private _object: createjs.Container;
        private _sprite: createjs.Sprite;
        private _label: objects.Label;

        private _rollDuration: number = 1; // Seconds

        private _rollStartTime: number;
        private _isRolling: boolean = false;
        private _rollCallback: (result: number, dice: Dice) => void;

        private _result : number;

        //#endregion

        //#region public properties

        public get object(): createjs.Container {
            return this._object;
        }
        public set object(v: createjs.Container) {
            this._object = v;
        }

        public get sprite(): createjs.Sprite {
            return this._sprite;
        }
        public set sprite(v: createjs.Sprite) {
            this._sprite = v;
        }

        public get result() : number {
            return this._result;
        }
        public set result(v : number) {
            this._result = v;
        }

        //#endregion

        constructor() {
            super();

            this.Start();
        }

        protected _checkBounds(): void {
        }

        public Start(): void {
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

            this._label = new objects.Label("1", "12pt", "consolas", "#000000", 0, 80);
            this.object.addChild(this._label);
        }

        public Update(): void {
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

        public Reset(): void {
        }

        /**
         * Rolls the die and then send result to callback fn
         *
         * @param {(result:number, dice:Dice) => void} callback
         * @memberof Dice
         */
        public Roll(callback: (result: number, dice: Dice) => void): void {
            this._rollStartTime = createjs.Ticker.getTime();
            this._rollCallback = callback;
            this._isRolling = true;
            this._sprite.gotoAndPlay("rollSlow");

            this._label.visible = false;
        }
    }
}