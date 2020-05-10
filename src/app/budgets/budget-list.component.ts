import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
//
import { BudgetService } from './budget.service';
import { AlertService } from '../alert/alert.service';
//animation
import { transition, animate, trigger, state, style, query, animation, stagger, sequence } from '@angular/animations';


@Component({
  selector: 'budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss'],
  animations: [
    trigger('tableCells', [
      // transition(':enter', [ // void => *
      //   style({ background: '#fff' }),
      //   animate('1.0s ease-in',
      //     style({ background: 'red' }))
      // ]),
      transition(':enter', [ // * => void
        style({ opacity: 0 }),
        animate('1s ease-in',
          style({ opacity: 1 }))
      ]),

    ]),
    trigger('tableRows', [
      // transition(':enter', [ // void => *
      //   style({ transform: 'translateX(100%) ' }),
      //   animate('1.0s ease-in',
      //     style({ transform: 'translateX(0%) ' }))
      // ]),
      transition(':enter', [ // * => void
        style({ opacity: 0 }),
        animate('1s ease-in',
          style({ opacity: 1 }))
      ]),
      transition(':leave', [ // * => void
        style({ opacity: 1 }),
        animate('1s ease-out',
          style({ opacity: 0 }))
      ]),

    ]),


  ]
})
export class BudgetListComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  budgets: any;
  isLoading = false;

  displayedColumns: string[] = ['select', 'line_items', 'name', 'number', 'category', 'original_budget', 'approved_cos', 'revised_budget', 'pending_budget_changes', 'projected_budget']; // 'committed_costs', 'direct_costs', 'pending_costs_changes', 'projected_costs', 'forecast_to_complete', 'estimated_cost_at_completion', 'projected_over_under', 'actions'];
  displayedColumnsShort: string[] = ['Cost Code', 'Cat', 'Original Budget', 'Approved COs', 'Revised', 'Pending', 'Projected', 'Committed', 'Direct', 'Pending Cost', 'Projected Cost', 'Forecast', 'Estimated', 'Over/Under']; // 'committed_costs', 'direct_costs', 'pending_costs_changes', 'projected_costs', 'forecast_to_complete', 'estimated_cost_at_completion', 'projected_over_under', 'actions'];

/*
  {
    "name": "Project Manager",
    "number": "442",
    "category": "L",
    "original_budget": 30000,
    "approved_cos": 0,
    "revised_budget": 30000,
    "pending_budget_changes": 0,
    "projected_budget": 30000,
    "committed_costs": 0,
    "direct_costs": 0,
    "pending_costs_changes": 0,
    "projected_costs": 0,
    "forecast_to_complete": 30000,
    "estimated_cost_at_completion": 30000,
    "projected_over_under": 0
  }
*/

  //Sort Table
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: string;
  totalLength: number;
  //
  totalItems = 0;
  selectedItems: any[] = [];
  lastSelectedItem: any;
  //
  isActive = true;
  sortField = 'Date';
  sortOrder = 'desc';
  pageNumber = 0;
  pageSize = 10;
  //bulkCheckbox = false;
  //isCardsView: boolean = false;

  constructor(
    private budgetService: BudgetService,
    private alertService: AlertService,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit(): void {
    //
    this.getBudget();
    //Defaults
    this.sort.direction = 'asc';
    this.sort.active = 'Original Budget';


    //this.discountPrices([100, 200, 300], .5);
  }

  // Testing
  discountPrices (prices, discount) {
    var discounted = [];

    for (var i = 0; i < prices.length; i++) {
      var discountedPrice = prices[i] * (1 - discount);
      var finalPrice = Math.round(discountedPrice * 100) / 100;
      discounted.push(finalPrice);
    }

    console.log(i); // 3
    console.log(discountedPrice); // 150
    console.log(finalPrice); // 150

    return discounted;
  }



  getBudget() {


    this.isLoading = true;

    this.budgetService.getBudget(1).subscribe(
      data => {

        if (1 === 1) {

          this.budgets = data.body.results;
          //console.log(this.budgets);
          this.dataSource = new MatTableDataSource(this.budgets);
          // //
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          //Total line items
          this.budgets.forEach(c => {
            this.totalItems += c.line_items.length;
          });

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

  selectItem(item) {
    var isMultiSelect = true; //this.chkBoxMultiSelect.checked;
    this.lastSelectedItem = item;
    //console.log(isMultiSelect);

    if (!isMultiSelect) {
      //Mark all non-selecetd, before mark the new selected
      // this.list.forEach(i => { i.selected = false; });
      // item.selected = !item.selected;

      // this.selectedItems = [];
      // this.selectedItems.push(item);
    } else {
      //Multi Card
      item.selected = !item.selected;

      const indexInArray = this.selectedItems.findIndex(x => x.number === item.number);
      //console.log(indexInArray);
      //-1 no element found
      if (indexInArray === -1) {
        this.selectedItems.push(item);
      } else {
        //remove from array
        this.selectedItems.splice(indexInArray, 1);
      }

    }

  }

  //
  totalAllSelectedItems() {
    var sum = 0;
    this.selectedItems.forEach(c => {
      sum += c['original_budget'];
    });
    return sum;
  }

  // Select Row
  selectRow(row, e) {
    //e.stopPropagation();

    //Uncheck bulk checkbox
    //this.bulkCheckbox = false;
    row.selected = !row.selected;
  }

  // Sum a column
  sumColumn(budget, column) {
    var sum = 0;
    budget.line_items.forEach(c => {
      sum += c[column];
    });
    return sum;
  }

  // Hide/Show Columns
  hideColumn(column, index, e) {

    if (!e.checked) {
      this.elementRef.nativeElement.querySelectorAll('.col_' + index).forEach(element => {
        element.classList.add('hide');
      });
    } else {
      this.elementRef.nativeElement.querySelectorAll('.col_' + index).forEach(element => {
        element.classList.remove('hide');
      });
    }

  }

  // Hide all line items (just show totals)
  hideDetails(division) {
    division.isCollapsed = !division.isCollapsed;
    console.log(division);
  }

  sortData(e) {
    console.log(e);
  }

  // ALL
  totalColumn(column) {
    var sum = 0;

    if (this.budgets !== undefined) {
      //
      this.budgets.forEach(c => {
        //console.log(c.line_items);
        if (c.line_items !== undefined) {
          c.line_items.forEach(i => {
            sum += i[column];
          });
        }
      });

    }

    return sum;
  }





}
