"use strict";
var scenes;
(function (scenes) {
    class Play extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
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
            this.Main();
        }
        Update() {
        }
        Main() {
        }
    }
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map