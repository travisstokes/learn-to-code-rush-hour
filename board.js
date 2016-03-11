'use strict';

class Board {
    constructor(width, height, exitSpace, boardOptions) {
        this.width = width;
        this.height = height;
        this.positions = [];
        this.vehicles = [];
        this.exit = exitSpace || {row: Math.round(height / 2 - 1.5), column: width - 1}; // Default to the top side of half way down on the far right.

        for(var x = 0; x < height; x++) {
            this.positions[x] = _.fill(Array(width), null);
        }
    }

    addVehicle(vehicle) {
        this.vehicles[vehicle.identifier] = vehicle;

        _.each(vehicle.getPositions(), (position) => {
            this.positions[position.row][position.column] = vehicle;
        });
    }

    getVehicleByIdentifier(identifier) {
        return this.vehicles[identifier];
    }

    getVehicleAt(row, column) {
        return this.positions[row][column];
    }

    isSpaceEmpty(row, column) {
        return this.positions[row][column] == null;
    }

    isSpaceExit(row, column) {
        return this.exit.row == row && this.exit.column == column;
    }

    isSpaceOnBoard(row, column) {
        return _.inRange(row, 0, height) && _.inRange(column, 0, width);
    }
}
