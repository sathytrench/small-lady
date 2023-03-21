import Player from '../entity/Player.js';

export default class BaseScene extends Phaser.Scene {
  constructor(name) {
    super(name);
  }

  inventory = [];
  inventoryString = 'INVENTORY:';
  messageString = '';

  //////////////////////////////////PRELOAD//////////////////////////////////////////////////////////////
    
  preload() {  
    //background
    this.load.image('inventory', 'assets/inventory.png');
    this.load.image('map', 'assets/map.png');
    this.load.image('room', 'assets/room.png');
    //sprites 
    //player
    this.load.spritesheet('raspberry', 'assets/raspberrySpritesheet.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('singleRoom', 'assets/singleRoom.png')
  }

  //////////////////////////CLASS METHODS/////////////////////////////////////

  createInventory() {
    this.add.image(115, 300, 'inventory');
    this.inventoryText = this.add.text(40, 40, this.inventoryString);
  }

  createMessageText() {
    this.messageText = this.add.text(430, 80, this.messageString, { fill: 'black', backgroundColor: 'white' });
  }

  createMap() {
    this.add.image(515, 300, 'map');
  }

  createRoom() {
    this.add.image(515, 300, 'room');
  }

  createPlayer(x, y) {
    this.player = new Player(this, x, y, 'raspberry');
  }
}