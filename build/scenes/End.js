"use strict";
var scenes;
(function (scenes) {
    class End extends objects.Scene {
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        constructor() {
            super();
            this.Start();
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        // Initializing and Instantiating
        Start() {
            //instantiate a new Text object
            this._endLabel = new objects.Label("End Scene", "80px", "Consolas", "#FFFF00", 320, 180, true);
            // buttons
            this._backButton = new objects.Button(config.Game.ASSETS.getResult("backButton"), 320, 430, true);
            this._ocean = new objects.Ocean();
            this.Main();
        }
        Update() {
            this._ocean.Update();
        }
        Main() {
            this.addChild(this._ocean);
            this.addChild(this._endLabel);
            this.addChild(this._backButton);
            this._backButton.on("click", () => {
                config.Game.SCENE = scenes.State.PLAY;
            });
        }
    }
    scenes.End = End;
})(scenes || (scenes = {}));
//# sourceMappingURL=End.js.map