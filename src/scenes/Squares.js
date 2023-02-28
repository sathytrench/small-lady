import BaseScene from './BaseScene';

export default class Squares extends BaseScene {
    constructor() {
      super('Squares');
    }

    currentLocation = 'Library';
    keyPressed = '';

    //////////////////////////CLASS METHODS/////////////////////////////////////

    //   Stairs - Bread - Mouths
    //    |         |        |
    //    |         |        |
    //   Jewels - Library - Flowers
    //    |         |        |
    //    |         |        |
    //   Mirrors - Rain -  Hands

    mapHash = {
      Stairs: {
        x: 337,
        y: 122,
        ArrowRight: 'Bread',
        ArrowDown: 'Jewels',
        unlocked: true,
      },
      Bread: {
        x: 515,
        y: 122,
        ArrowLeft: 'Stairs',
        ArrowRight: 'Mouths',
        ArrowDown: 'Library',
        unlocked: true,
      },
      Mouths: {
        x: 693,
        y: 122,
        ArrowLeft: 'Bread',
        ArrowDown: 'Flowers',
        unlocked: true,
      },
      Jewels: {
        x: 337,
        y: 300,
        ArrowUp: 'Stairs',
        ArrowRight: 'Library',
        ArrowDown: 'Mirrors',
        unlocked: true,
      },
      Library: {
        x: 515,
        y: 300,
        ArrowUp: 'Bread',
        ArrowLeft: 'Jewels',
        ArrowRight: 'Flowers',
        ArrowDown: 'Rain',
        unlocked: true,
      },
      Flowers: {
        x: 693,
        y: 300,
        ArrowUp: 'Mouths',
        ArrowLeft: 'Library',
        ArrowDown: 'Hands',
        unlocked: true,
      },
      Mirrors: {
        x: 337,
        y: 478,
        ArrowUp: 'Jewels',
        ArrowRight: 'Rain',
        unlocked: true,
      },
      Rain: {
        x: 515,
        y: 478,
        ArrowUp: 'Library',
        ArrowLeft: 'Mirrors',
        ArrowRight: 'Hands',
        unlocked: true,
      },
      Hands: {
        x: 693,
        y: 478,
        ArrowUp: 'Flowers',
        ArrowLeft: 'Rain',
        unlocked: true,
      },
    }

    changeRooms (key) {
      const nextRoom = this.mapHash[this.currentLocation][key] ? this.mapHash[this.currentLocation][key] : 'You cannot go this way';
      if (this.mapHash[nextRoom]) {
        if (this.mapHash[nextRoom].unlocked) {
          console.log(nextRoom);
          this.currentLocation = nextRoom;
          this.playerLocation.x = this.mapHash[this.currentLocation].x;
          this.playerLocation.y = this.mapHash[this.currentLocation].y;
        } else {
          console.log(`The ${nextRoom} room is locked!`);
        }
      }
    };

    //////////////////////////////////PRELOAD//////////////////////////////////////////////////////////////
    


    //////////////////////////////////////////CREATE///////////////////////////////////////////////////////

    create() {
      this.createInventory();
      this.createMap();

      this.playerLocation = this.add.image(515, 300, 'singleRoom');

      //KEYBOARD MANAGER
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    ///////////////////////////////////////////UPDATE////////////////////////////////////////////////////

    update() {
      this.input.keyboard.on('keyup', e => {
        if (this.keyPressed.length === 0){
          this.keyPressed = e.key;
        }
      });

      if (this.keyPressed.length > 0) {
        this.changeRooms(this.keyPressed);
        this.keyPressed = '';
      }
    }
  }

  