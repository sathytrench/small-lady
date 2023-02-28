import Player from '../entity/Player.js';

export default class BaseScene extends Phaser.Scene {
  constructor(name) {
    super(name);
  }

  //////////////////////////////////PRELOAD//////////////////////////////////////////////////////////////
    
  preload() {  
    //background
    this.load.image('inventory', 'assets/inventory.png');
    this.load.image('map', 'assets/map.png');
    this.load.image('room', 'assets/room.png');
    //sprites 
    //player
    this.load.image('player', 'assets/player.png');
    this.load.image('singleRoom', 'assets/singleRoom.png')
  }

  //////////////////////////CLASS METHODS/////////////////////////////////////

  createInventory() {
    this.add.image(115, 300, 'inventory');
  }

  createMap() {
    this.add.image(515, 300, 'map');
  }

  createRoom() {
    this.add.image(515, 300, 'room');
  }

  createPlayer(x, y) {
    this.player = new Player(this, x, y, 'player');
  }
}