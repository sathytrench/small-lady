export default {
    physics: {    
      default: 'arcade',  
      arcade: {
        arcade: {
          gravity: { y: 0, x: 0 },
        },
        debug: true,    
      }
    },
    type: Phaser.AUTO,  
    width: 800,   
    height: 600, 
    parent: "canvas-container"
  };
  
  //10   20            10
  ///////////////////////
  //     //   550x550  //
  // 210 //            //
  //  x  //            //
  // 550 //            //
  ///////////////////////

  //10 px margin left and right, 25 px on top and bottom, and 20 px between inventory and map

  //x: 10-210-20-550-10
  //y: 25-550-25

  // 9 positions in map room:
  
  // (331.66, 116.66) (515, 116.66) (698.33, 116.66)
  // (331.66, 300) (515, 300) (698.33, 300)
  // (331.66, 483.34) (515, 483.34) (698.33, 483.34)
  
  

