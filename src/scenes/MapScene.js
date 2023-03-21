import BaseScene from './BaseScene';

export default class MapScene extends BaseScene {
    constructor() {
      super('MapScene');
    }

    currentLocation = 'Library';
    nextLocation = 'Library';
    playerDirection = '';
    playerInMotion = false;
    keyPressed = '';
    secretItemsArray = ['doll', 'glass', 'water']
    randomSecret = this.secretItemsArray[Math.floor(Math.random() * 3)];

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
        unlocked: false,
        items: ['frame'],
        keysNeeded: ['candle', 'glass'],
      },
      Bread: {
        x: 515,
        y: 122,
        ArrowLeft: 'Stairs',
        ArrowRight: 'Mouths',
        ArrowDown: 'Library',
        unlocked: false,
        items: ['bread'],
        keysNeeded: ['knife', 'water'],
      },
      Mouths: {
        x: 693,
        y: 122,
        ArrowLeft: 'Bread',
        ArrowDown: 'Flowers',
        unlocked: false,
        items: ['tooth', 'radio'],
        keysNeeded: ['bread', 'glass'],
      },
      Jewels: {
        x: 337,
        y: 300,
        ArrowUp: 'Stairs',
        ArrowRight: 'Library',
        ArrowDown: 'Mirrors',
        unlocked: false,
        items: ['ring', 'ruby'],
        keysNeeded: ['tooth', 'worm'],
      },
      Library: {
        x: 515,
        y: 300,
        ArrowUp: 'Bread',
        ArrowLeft: 'Jewels',
        ArrowRight: 'Flowers',
        ArrowDown: 'Rain',
        unlocked: true,
        items: [this.randomSecret],
        keysNeeded: [],
      },
      Flowers: {
        x: 693,
        y: 300,
        ArrowUp: 'Mouths',
        ArrowLeft: 'Library',
        ArrowDown: 'Hands',
        unlocked: false,
        items: ['seed'],
        keysNeeded: ['ruby', 'tooth', 'glass'], //threw glass here cuz it didn't unlock any cardinal room yet
      },
      Mirrors: {
        x: 337,
        y: 478,
        ArrowUp: 'Jewels',
        ArrowRight: 'Rain',
        unlocked: false,
        items: ['glass', 'doll'],
        keysNeeded: ['radio', 'frame'],
      },
      Rain: {
        x: 515,
        y: 478,
        ArrowUp: 'Library',
        ArrowLeft: 'Mirrors',
        ArrowRight: 'Hands',
        unlocked: false,
        items: ['water', 'worm'],
        keysNeeded: ['seed', 'doll'],
      },
      Hands: {
        x: 693,
        y: 478,
        ArrowUp: 'Flowers',
        ArrowLeft: 'Rain',
        unlocked: false,
        items: ['candle', 'knife'],
        keysNeeded: ['ring', 'doll'],
      },
    }

    flashWarning (message) {
      this.messageText.setText(message);
      this.time.delayedCall(2000, () => this.messageText.setText(''), null, this);
    }

    pickUpItem (item) {
      this.inventory = [...this.inventory, item];
      this.inventoryText.setText('INVENTORY:\n' + this.inventory.join('\n'));
    }

    tryUnlockRoom (room) {
      for (let i = 0; i < this.inventory.length; i++) {
        const currentItem = this.inventory[i];
        if (this.mapHash[room].keysNeeded.includes(currentItem)) {
          this.mapHash[room].unlocked = true;
          return true;
        }
      }
      return false;
    }

    tryToChangeRooms () {
      const currentRoomItems = this.mapHash[this.currentLocation].items;
      while (currentRoomItems.length> 0) {
        this.pickUpItem(currentRoomItems.pop());
      }
      
      const nextRoom = this.mapHash[this.currentLocation][this.keyPressed];
      if (this.mapHash[nextRoom]) {
        if (this.mapHash[nextRoom].unlocked) {
          this.triggerWalkToRoom(nextRoom);
        } else {
          this.tryUnlockRoom(nextRoom) ? this.triggerWalkToRoom(nextRoom) : this.flashWarning(`The ${nextRoom} door is locked.`);
        }
      }
    }

    triggerWalkToRoom (nextRoom) {
      this.nextLocation = nextRoom;
      if (this.player.x < this.mapHash[nextRoom].x) {
        this.playerDirection = 'right';
      } else if (this.player.x > this.mapHash[nextRoom].x) {
        this.playerDirection = 'left';
      } else if (this.player.y < this.mapHash[nextRoom].y) {
        this.playerDirection = 'down';
      } else if (this.player.y > this.mapHash[nextRoom].y) {
        this.playerDirection = 'up';
      }
    }

    arriveAtNextRoom () {
      if (this.playerDirection === 'up') {
        if (this.player.y <= this.mapHash[this.nextLocation].y) {
          this.player.moveInMap('arrive');
        }
      } else if (this.playerDirection === 'down') {
        if (this.player.y >= this.mapHash[this.nextLocation].y) {
          this.player.moveInMap('arrive');
        }
      } else if (this.playerDirection === 'left') {
        if (this.player.x <= this.mapHash[this.nextLocation].x) {
          this.player.moveInMap('arrive');
        }
      } else if (this.playerDirection === 'right') {
        if (this.player.x >= this.mapHash[this.nextLocation].x) {
          this.player.moveInMap('arrive');
        }
      }
    }

    centerPlayerInRoom () {
      this.player.x = this.mapHash[this.currentLocation].x;
      this.player.y = this.mapHash[this.currentLocation].y;
    }

    //////////////////////////////////PRELOAD//////////////////////////////////////////////////////////////
    


    //////////////////////////////////////////CREATE///////////////////////////////////////////////////////

    create() {
      this.createInventory();
      this.createMap();
      this.createMessageText();
      this.createPlayer(515, 300);

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

      if (this.keyPressed.length > 0 && !this.playerInMotion) {
        this.tryToChangeRooms();
        this.keyPressed = '';
      }

      if (this.playerDirection.length > 0) {
        this.player.moveInMap(this.playerDirection);
      }

      if (this.currentLocation !== this.nextLocation){
        this.arriveAtNextRoom();
      } else {
        this.centerPlayerInRoom()
      }
    }
  }

  