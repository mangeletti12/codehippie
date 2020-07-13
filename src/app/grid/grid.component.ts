import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';

interface Tile {
  row: number;
  column: number;
  bot: string;
  botDirection: number;
  botPath: string[];
  isPathShown: false;
}

class TileMaker {
  static create(row: number, column: number) {
    return { row: row, column: column, bot: null, botDirection: null };
  }
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @ViewChild('floor', {static: true}) floor: ElementRef;
  floorWidth;
  floorHeight;
  gridColumns;
  gridRows;
  cells: any[] = [];
  tile;
  square = 20;
  floorGrid = [];
  isFloorSet = false;
  isPathSetting = false;
  pathingArray = [];

  constructor() { }

  ngOnInit(): void {
    // this.test();
    this.setGrid();
  }

  // Listen for window resize
  // @HostListener('window:resize', ['$event'])
  // onResize(e) {
  //   const vp = e.target.innerWidth;
  //   this.setGrid();
  // }

  setGrid() {
    this.floorWidth = (this.floor.nativeElement as HTMLElement).offsetWidth;
    this.floorHeight = (this.floor.nativeElement as HTMLElement).offsetHeight;
    // console.log(this.floorWidth + ' - ' + this.floorHeight);

    // Default / starter grid
    this.calcGrid(20);
  }

  // 
  calcGrid(value) {
    this.cells = [];
    this.square = value;

    this.gridColumns = Math.floor(this.floorWidth/value);
    this.gridRows = Math.floor(this.floorHeight/value);

    // console.log(this.gridColumns + ' - ' + this.gridRows);
    for(let row = 1; row <= this.gridRows; row++) {
      //
      for(let column = 1; column <= this.gridColumns; column++) {
        this.cells.push(row +':'+ column);
      }
    }
    // console.log('cells', this.cells);
    // create the grid now?
    if (!this.isFloorSet) {
      this.createGrid();
    }
  }

  // Take the cells and create rows
  gridArrayRows(arr) {
    //
    let newArr = [];
    let preRow = 0;
    let preCcolumn = 0;
    let localArr = [];

    arr.forEach((data) => {

      let array = data.split(':');
      let row: number = +array[0];
      let column: number = +array[1];
      
      // create tile
      const tile = TileMaker.create(row, column);

      if (preRow === +row) {
        localArr.push(tile);
      } else {
        if (localArr.length === 0) {
          localArr.push(tile);
        } else {
          newArr.push(localArr);
          localArr = [];
          localArr.push(tile);
        }
      }

      preRow = +row;
      preCcolumn = +column;
    });
    //
    newArr.push(localArr);
    // console.log(newArr);
    return newArr;
  }

  // Set grid button
  createGrid() {
    this.floorGrid = this.gridArrayRows(this.cells);
    this.isFloorSet = true;
    // console.log('createGrid', this.floorGrid);
  }

  // Slider change
  onSliderChange(e) {
    // console.log('slide', e.value);
    this.calcGrid(e.value);
  }

  // Select a square from floor
  squareSelect(item) {

    if (!this.isPathSetting) {
      // only one
      this.floorGrid.forEach(row => {
        row.forEach(element => {
          element.selected = false;
        });
      });

      item.selected = !item.selected;
      this.tile = item;

    } else {
      // Set path for bot
      item.path = !item.path;
      this.tile.isPathShown = true;
      // Add to path array
      this.pathingArray.push(item);
    }
 
    console.log('squareSelect', item);
  }

  //
  setBot() {
    // console.log('tile', this.floorGrid);

    this.floorGrid.forEach(row => {

      row.forEach(element => {
        
        if(element.row === this.tile.row && element.column === this.tile.column) {
          //
          this.tile.bot = 'r2';
          this.tile.botDirection = 1; 
          // console.log('setBot', this.tile);
        }

      });

    });
    
  }

  // Turn bot
  turnBot() {
    if (this.tile.botDirection !== 4) {
      this.tile.botDirection = this.tile.botDirection +1; 
    } else {
      this.tile.botDirection = 1;
    }

    // console.log('turnBot', this.tile);
  }

  // Set bot path
  setPath() {
    console.log('setPath', this.tile);
    console.log('floorGrid', this.floorGrid);
    this.isPathSetting = true;
    // Check available paths
    // Above
    // -1 for array starts at zero but row starts at 1
    // -1 for row above
    const row = this.floorGrid[this.tile.row -2];
    const sqaure = row.filter(r => r.column === this.tile.column)[0];
    console.log('sqaure', sqaure);
    sqaure.path = true;

    // Below

    // Left

    // Right
  }

  // Stop setting path
  endPath() {   
    this.tile.botPath = this.pathingArray;
    this.isPathSetting = false;
    this.pathingArray = [];
    console.log('endPath', this.tile);
  }

  // Show path
  showPath() {
    this.tile.isPathShown = true;
    console.log('showPath', this.tile);
    //
    this.tile.botPath.forEach(box => {
      //
      // console.log('box', box);
      this.floorGrid.forEach(row => {

        row.forEach(element => {
          //
          if(element.row === box.row && element.column === box.column) {
            //
            element.path = true;
            // console.log('element2 ', element);
          }
        });
      });
    });

  }

  //
  hidePath() {
    this.tile.isPathShown = false;
    console.log('hidePath', this.tile);
    //
    this.tile.botPath.forEach(box => {
      //
      // console.log('box', box);
      this.floorGrid.forEach(row => {

        row.forEach(element => {
          // 
          if(element.row === box.row && element.column === box.column) {
            //
            element.path = false;
            // console.log('element2 ', element);
          }
        });
      });
    });

  }

  // Delete Path
  deletePath() {
    console.log('deletePath', this.tile);
    //
    this.tile.botPath.forEach(box => {
      //
      // console.log('box', box);
      this.floorGrid.forEach(row => {

        row.forEach(element => {
          // 
          if(element.row === box.row && element.column === box.column) {
            //
            element.path = false;
            // console.log('element2 ', element);
          }
        });
      });
    });

    // Remove bot path
    this.tile.botPath = null;
  }









  // Testing
  test() {
    let array1 = [1,2,3];
    let cArray = [...array1]; // copy array
    array1.push(4);
    console.log('cArray', cArray); // [1,2,3]
    let combineArray = [...cArray, ...array1]; // combine
    console.log('combineArray', combineArray); // [1, 2, 3, 1, 2, 3, 4]

    const addMoreArray = [...array1, 5,6];
    console.log('addMoreArray', addMoreArray); // [1, 2, 3, 4, 5, 6]
  }


}
