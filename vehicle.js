'use strict';

class Vehicle {
    constructor(identifier, top, left, size, orientation, isObjective) {
        this.identifier = identifier;
        this.size = size;
        this.orientation = orientation;
        this.positions = [];
        this.isObjective = isObjective;

        this.moveMap = [0, 1];

        if (this.orientation == "VERTICAL") {
            this.moveMap = [1, 0];
        }

        var curPosition = {
            row: top,
            column: left
        };
        this.positions.push(curPosition);
        for (var x = 1; x < size; x++) {
            this.positions.push(this.forwardTarget());
        }
    }

    forwardTarget() {
        // If we were doing more complicated stuff, we could probably replace this with a real matrix library. For this little bit, probably not worth it.
        var lastPosition = _.last(this.positions);
        return {
            row: lastPosition.row + this.moveMap[0],
            column: lastPosition.column + this.moveMap[1]
        };
    }

    reverseTarget() {
        var firstPosition = this.positions[0];
        return {
            row: firstPosition.row - this.moveMap[0],
            column: firstPosition.column - this.moveMap[1]
        };
    }

    getPositions() {
        return this.positions;
    }
}
