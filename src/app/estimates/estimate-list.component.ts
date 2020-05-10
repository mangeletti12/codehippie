import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

//
import { EstimateService } from './estimate.service';
//import { AlertService } from '../alert/alert.service';
//animation
import { transition, animate, trigger, state, style, query, animation, stagger, sequence } from '@angular/animations';


@Component({
  selector: 'estimating-list',
  templateUrl: './estimate-list.component.html',
  styleUrls: ['./estimate-list.component.scss'],
  animations: [
    trigger('tableCells', [
      transition(':enter', [ // void => *
        style({ background: '#fff' }),
        animate('1.5s ease-in',
          style({ background: 'red' }))
      ]),
      // transition(':leave', [ // * => void
      //   style({ opacity: 1 }),
      //   animate('1s ease-out',
      //     style({ opacity: 0 }))
      // ]),

    ]),
    trigger('tableRows', [
      transition(':enter', [ // void => *
        style({ transform: 'translateX(100%) ' }),
        animate('1.5s ease-in',
          style({ transform: 'translateX(0%) ' }))
      ]),
      // transition(':leave', [ // * => void
      //   style({ opacity: 1 }),
      //   animate('1s ease-out',
      //     style({ opacity: 0 }))
      // ]),

    ]),


  ]
})
export class EstimateListComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  costs: any;
  isLoading = false;


  //Sort Table
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  totalLength: number;
  //
  isActive = true;
  sortField = 'Date';
  sortOrder = 'desc';
  pageNumber = 0;
  pageSize = 10;
  bulkCheckbox = false;
  isCardsView = false;
  //

  constructor(
    private estimateService: EstimateService,
    //private alertService: AlertService,
    //private elementRef: ElementRef
  ) {
  }

  ngOnInit(): void {
    //
    this.getEstimate();
  }


  getEstimate() {

    this.isLoading = true;

    this.estimateService.getCosting(1).subscribe(
      data => {

        if (1 === 1) {

          //this.costs = data.body;
          this.costs = data.body.line_items;
          console.log(this.costs);
          this.dataSource = new MatTableDataSource(this.costs);
          // //
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          // //Total records
          this.totalLength = 55;
          //
          this.isLoading = false;
        }

      },
      error => {

      }
    );


  }


  //Select all files
  // selectAllFiles(event: any) {

  //   if (!this.bulkCheckbox) {
  //     //Mark all files selected
  //     this.dataSource.data.forEach(i => { i.selected = true; });
  //     this.bulkCheckbox = true;
  //   } else {
  //     //Mark all files unselected
  //     this.dataSource.data.forEach(i => { i.selected = false; });
  //     this.bulkCheckbox = false;
  //   }
  // }

  // //Select Row
  // selectRow(row, e) {
  //   //e.stopPropagation();

  //   //Uncheck bulk checkbox
  //   this.bulkCheckbox = false;
  //   row.selected = !row.selected;
  // }

  // //Sum a column
  // sumColumn(budget, column) {
  //   var sum = 0;
  //   budget.line_items.forEach(c => {
  //     sum += c[column];
  //   });
  //   return sum;
  // }

  // hideColumn(column, index, e) {
  //   //console.log(column, index, e);
  //   //console.log(e.checked);
  //   if (!e.checked) {
  //     this.elementRef.nativeElement.querySelectorAll('.col_' + index).forEach(element => {
  //       element.classList.add('hide');
  //     });
  //   } else {
  //     this.elementRef.nativeElement.querySelectorAll('.col_' + index).forEach(element => {
  //       element.classList.remove('hide');
  //     });
  //   }

  // }

  nodeSelect(node, e){
    e.stopPropagation();
    node.selected = !node.selected;
    //if closed, loop over and close ALL children too
    if (!node.selected) {
      //
      if (node.children.length) {
        //
        this.nodeClose(node);
      }

    }
  }

  //Recursion
  nodeClose(node) {
    node.selected = false;
    node.children.forEach(i => { this.nodeClose(i); });
  }

}
