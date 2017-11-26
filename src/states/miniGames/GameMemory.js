//import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
const DEFAULT_FRAME = 193;

export default class GameMemory extends Phaser.State {
  init() {
    this.firstTile = null;
    this.secondTile = null;
    this.canPick = true;
    this.game.stage.backgroundColor = '#888888';
    this.images = [81, 111, 141, 354, 373, 379, 779, 749];
  }
  onSaveAndNext() {  }

  create(game) {
    let findTilesCount = 0;
    // choose 8 random tile images
    let chosenTiles = [];
    while(chosenTiles.length<16){
      let candidate=Math.floor(Math.random()*8);
      if(chosenTiles.indexOf(candidate) === -1){
        chosenTiles.push(candidate,candidate)
      }
    }

    for(let i=0;i<32;i++){
      let from = Math.floor(Math.random()*16);
      let to = Math.floor(Math.random()*16);
      [chosenTiles[from], chosenTiles[to]] = [chosenTiles[to], chosenTiles[from]];
    }
    console.log(chosenTiles);

    for(let i = 0;i < 4; ++i){
      for(let j = 0;j < 4; ++j){
        let tile = this.game.add.tileSprite(9+i*23, 9+j*23, 21, 21, 'game_tiles', DEFAULT_FRAME);
        tile.buttonMode = true;
        tile.inputEnabled  = true;
        tile.interactive = true;
        tile.isSelected = false;
        tile.theVal = this.images[chosenTiles[i*4+j]];
        tile.alpha = 0.5;
        tile.events.onInputDown.add((data) => {
          if(this.canPick) {
            if(!data.isSelected){
              data.frame = data.theVal;
              data.isSelected = true;
              data.alpha = 1;
              if(this.firstTile === null){
                this.firstTile=data
              }
              else{
                this.secondTile=data;
                this.canPick=false;
                if(this.firstTile.theVal === this.secondTile.theVal){
                  setTimeout(() => {
                    findTilesCount += 2;
                    this.firstTile.alpha=0;
                    this.secondTile.alpha=0;
                    this.firstTile=null;
                    this.secondTile=null;
                    this.canPick=true;
                    if (findTilesCount === 16) {
                      this.onSaveAndNext({
                        isDone: true,
                      });
                    }
                  },500);
                }
                else{
                  setTimeout(() => {
                    this.firstTile.isSelected=false;
                    this.secondTile.isSelected=false;
                    this.firstTile.frame = DEFAULT_FRAME;
                    this.secondTile.frame = DEFAULT_FRAME;
                    this.firstTile.alpha=0.5;
                    this.secondTile.alpha=0.5;
                    this.firstTile=null;
                    this.secondTile=null;
                    this.canPick=true;
                  },500);
                }
              }
            }
          }
        });
      }
    }
  }
}



