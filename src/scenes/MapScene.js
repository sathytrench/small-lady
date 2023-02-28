import BaseScene from './BaseScene';

export default class MapScene extends BaseScene {
    constructor() {
      super('MapScene');
      this.playerPosition = {
        x: 515,
        y: 300
      }
    }

    //////////////////////////CLASS METHODS/////////////////////////////////////

    //////////////////////////////////////////CREATE///////////////////////////////////////////////////////

    create() {
      this.createInventory();
      this.createMap();
      this.createPlayer(this.playerPosition.x, this.playerPosition.y);

      //KEYBOARD MANAGER
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    ///////////////////////////////////////////UPDATE////////////////////////////////////////////////////

    update() {
      this.player.update(this.cursors, this.walkSound);
    }
  }

  