'use strict';

class BoardOptions {
    constructor(emptyIdentifier, objectiveVehicleIdentifier, exitSpace) {
        this.emptyIdentifier = emptyIdentifier || "0";
        this.objectiveVehicleIdentifier = objectiveVehicleIdentifier || "R";
        this.exitSpace = exitSpace;
    }
}
