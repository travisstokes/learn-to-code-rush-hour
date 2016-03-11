'use strict';

class StringBoardSerializer {
    constructor(boardOptions) {
        this.boardOptions = boardOptions;
    }

    deserialize(layoutString) {
        if (_.isEmpty(layoutString)) {
            throw "The layout string must be a string of 1 or more characters";
        }

        // This is a bonus compared to the specs (some may call it gold-plating, I call it future proofing :)).
        // The idea is to allow non-6x6, non-square versions of the game.
        var boardSize = StringBoardSerializer.getClosestSizeToSquare(layoutString.length);

        // Create a new board with the width and height detected.
        var board = new Board(boardSize.width, boardSize.height, this.boardOptions.exitSpace);

        var seenIdentifiers = {};
        for (var x = 0; x < layoutString.length; x++) {
            var curIdentifier = layoutString[x];

            // Our board defaults to all empty and we are loading entire vehicles the first time we see them, so skip empty spaces and seen vehicles.
            if (curIdentifier === this.boardOptions.emptyIdentifier || !_.isEmpty(seenIdentifiers[curIdentifier])) {
                continue;
            }

            // This must be a vehicle we haven't seen, so load the whole thing and add it to the board.
            var vehicle = this.loadVehicle(layoutString, x, boardSize.width, boardSize.height);
            seenIdentifiers[vehicle.identifier] = vehicle;
            board.addVehicle(vehicle);
        }

        return board;
    }

    serialize(board) {
        return _.flatMap(board.positions, (vehicle) => {
            if(vehicle) {
                return vehicle.identifier
            }

            return this.boardOptions.emptyIdentifier
        });
    }

    loadVehicle(layoutString, currentPosition, width, height) {
        var curIdentifier = layoutString[currentPosition];
        var modifier = 1;
        var constraint = (Math.floor(currentPosition / width) + 1) * width;
        var orientation = "HORIZONTAL";
        if (layoutString.length <= currentPosition + modifier || layoutString[currentPosition + modifier] !== curIdentifier) {
            modifier = width;
            constraint = layoutString.length;
            orientation = "VERTICAL";
        }

        var start = {
            column: currentPosition % width,
            row: Math.floor(currentPosition / height)
        }

        var size = 1;

        for (currentPosition += modifier; currentPosition < constraint; currentPosition += modifier) {
            if (layoutString[currentPosition] !== curIdentifier) break;
            size++;
        }

        return new Vehicle(curIdentifier, start.row, start.column, size, orientation, curIdentifier == this.boardOptions.objectiveVehicleIdentifier);
    }

    static getClosestSizeToSquare(size) {
        var firstSide = Math.floor(Math.sqrt(size));
        var secondSide;
        do {
            if (size % firstSide == 0) {
                secondSide = size / firstSide;
                break;
            }
        }
        while (--firstSide > 0)

        // Return the larger of the two sides as the height.
        if (firstSide > secondSide) {
            return {width: secondSide, height: firstSide};
        }

        return {width: firstSide, height: secondSide};
    }
}
