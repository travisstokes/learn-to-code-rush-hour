'use strict';

class GameController {
    constructor(boardOptions, view) {
        this.layout = null;
        this.boardOptions = boardOptions;
        this.boardSerializer = new StringBoardSerializer(boardOptions);
        this.view = view;
    }

    loadLayout(layoutString) {
        this.board = this.boardSerializer.deserialize(layoutString);
        this.targetVehicle = this.board.getVehicleByIdentifier(this.boardOptions.objectiveVehicleIdentifier);
        this.updateView();
    }

    updateView() {
        this.view.render(this.board);
    }
}
