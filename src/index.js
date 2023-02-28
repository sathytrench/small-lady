import Phaser from 'phaser';
import config from './config/config';
import BaseScene from './scenes/BaseScene';
import MapScene from './scenes/MapScene';
import RoomScene from './scenes/RoomScene';
import Squares from './scenes/Squares';

class Game extends Phaser.Game {
    constructor() {
      super(config);
  
      this.scene.add('BaseScene', BaseScene);
      this.scene.add('MapScene', MapScene);
      this.scene.add('RoomScene', RoomScene);
      this.scene.add('Squares', Squares);
      this.scene.start('Squares');
    }
  }
  
  window.onload = function () {
    window.game = new Game();
  }

  // intro text - library scene - map scene <--> room scene
  // base scene will have box for itinerary and box for map/room asset