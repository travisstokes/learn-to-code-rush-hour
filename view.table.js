'use strict';

class TableView {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = $('#' + containerId);
    }

    render(board) {
        this.container.empty();
        var table = $('<table>');
        for (var row = 0; row < board.height; row++) {
            var tableRow = $("<tr>");

            for (var column = 0; column < board.width; column++) {
                var space = this.createSpace(board.getVehicleAt(row, column), board.isSpaceExit(row, column));
                tableRow.append(space);
            }
            table.append(tableRow);
        }

        this.container.append(table);
    }

    createSpace(vehicle, isExit) {
        var space = $("<td>");

        if (isExit) {
            space.addClass('exit');
        }

        if (vehicle) {
            space.addClass('vehicle');
            space.addClass('vehicle-' + vehicle.size);
            space.text(vehicle.identifier);

            if (vehicle.isObjective) {
                space.addClass('objective-vehicle');
            }
        } else {
            space.addClass('empty');
        }

        return space;
    }
}
