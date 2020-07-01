import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';

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
  square = 20;
  //
  startSquareValue;

  constructor() { }

  ngOnInit(): void {
    this.test();
    this.setGrid();
  }

  // Listen for window resize
  @HostListener('window:resize', ['$event'])
  onResize(e) {
    const vp = e.target.innerWidth;
    this.setGrid();
  }

  setGrid() {
    // Set carousel width and slides displayed count
    this.floorWidth = (this.floor.nativeElement as HTMLElement).offsetWidth;
    this.floorHeight = (this.floor.nativeElement as HTMLElement).offsetHeight;
    // this.numberOfSlidesDisplayed = Math.floor(this.carouselWidth/this.slideItemWidth) - 1; //-1 for btn spacing
    // this.slideHolderWidth = (this.numberOfSlidesDisplayed*this.slideItemWidth);
    console.log(this.floorWidth + ' - ' + this.floorHeight);
    //this.calcGrid();
  }

  calcGrid(value) {
    this.cells = [];
    this.square = value;

    this.gridColumns = Math.floor(this.floorWidth/value);
    this.gridRows = Math.floor(this.floorHeight/value);

    for(let row = 1; row <= this.gridRows; row++) {
      //
      for(let column = 1; column <= this.gridColumns; column++) {
        this.cells.push({place: row +':'+ column});
      }

    }

    console.log('cells', this.cells);

  }

  //
  onInputChange(e) {
    console.log('slide', e.value);
    this.calcGrid(e.value);
  }

  //
  squareSelect(item) {
    console.log('squareSelect', item);
  }

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
