import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from './dashboard.service';
//
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
//
import { animate, state, style, transition, trigger } from '@angular/animations';
//
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import * as Chart from 'chart.js';



// export class TableExpandableRowsExample {
//   dataSource = ELEMENT_DATA;
//   columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
//   expandedElement: PeriodicElement | null;
// }

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
//   description: string;
// }

export interface Contact {
  contactAzimuth: number;
  contactBeginTimestamp: number;
  contactDetail: string;
  contactElevation: number;
  contactEndTimestamp: number;
  contactEquipment: string;
  contactGround: string;
  contactId: string;
  contactLatitude: number;
  contactLongitude: number;
  contactName: number;
  contactResolution: string;
  contactResolutionStatus: string;
  contactSatellite: string;
  contactState: string;
  contactStatus: string;
  contactStep: string;
  _id: string;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('tableCells', [
      transition(':enter', [ // * => void
        style({ opacity: 0 }),
        animate('1s ease-in',
          style({ opacity: 1 }))
      ]),

    ]),
  ],

})
export class ContactsComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['contactStatus', 'contactName', 'contactGround', 'contactEquipment' , 'contactState', 'contactBeginTimestamp'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  contacts: any;
  alerts: any;
  sortField = 'name';
  sortOrder = 'asc';
  pageNumber = 0;
  pageSize = 10;
  totalRows = 0;
  //
  // dataSource2 = ELEMENT_DATA;
  // columnsToDisplay2 = ['name', 'weight', 'symbol', 'position'];
  expandedElement: Contact | null;
  //

  // Pie Chart

  // var original = Chart.defaults.global.legend.onClick;
  // Chart.defaults.global.legend.onClick = function(e, legendItem) {
  //   // update_caption(legendItem);
  //   original.call(this, e, legendItem);
  // };
  

  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'right',
      onClick: (e, legendItem) => {
        console.log('e', e);
        console.log('item', legendItem);
      }
    },
    // onClick: (e, legendItem) => {
    //   console.log('e', e);
    //   console.log('item', legendItem);
    // }
  };

  public pieChartLabels: Label[] = [
    'Normal',
    'Caution',
    'Serious',
    'Critical',
  ];
  public pieChartData: SingleDataSet = [13, 7, 6, 5 ];
  public pieChartColors: Color[] = [
    {
      // borderColor: 'black',
      borderWidth: 0,
      backgroundColor: ['#56f000', '#fce83a', '#ffb300', '#ff3838'],
    },
  ];

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  


  constructor(
    private dashboardService: DashboardService,
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.getAllContacts();
    this.getAllAlerts();
    //Defaults
    this.sort.direction = 'asc';
    this.sort.active = 'contactName';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Get All contacts
  getAllContacts() {
    const orderBy = (this.sortOrder === 'asc') ? this.sortField : '-' + this.sortField;

    var searchCriteria = {
      orderBy: orderBy,
      limit: this.pageSize,
      offset: (this.pageNumber * this.pageSize),
      // offset: (this.pageNumber - 1) * this.pageSize + 1,
    };

    // if (this.searchKey !== null && this.searchKey !== undefined && this.searchKey !== '') {
    //   searchCriteria['nameStartsWith'] = this.searchKey.trim();
    // }

    // console.log('searchCriteria', searchCriteria);
    this.dashboardService.getContacts(searchCriteria).subscribe(
      data => {
        console.log('contacts', data.body);
        if (this.pageNumber === 0) {
          this.contacts = data.body;

          // fake pagination
          // this should happen on the backend
          // that you would only get the records you asked for, not all
          const start = (this.pageNumber * this.pageSize);
          const end = (start + this.pageSize);
          console.log(start + " - " + end);
          const ds = this.contacts.slice(start, end);

          this.dataSource = new MatTableDataSource(ds);
        } else {
          // concatenate arrays
          this.contacts = [...this.contacts, ...data.body];

        }
        // Totals
        this.totalRows = data.body.length;
      },
      error => {

      }
    );

  }

  // Get All alerts
  getAllAlerts() {
    const orderBy = (this.sortOrder === 'asc') ? this.sortField : '-' + this.sortField;

    var searchCriteria = {
      orderBy: orderBy,
      limit: this.pageSize,
      offset: (this.pageNumber * this.pageSize),
      // offset: (this.pageNumber - 1) * this.pageSize + 1,
    };

    // if (this.searchKey !== null && this.searchKey !== undefined && this.searchKey !== '') {
    //   searchCriteria['nameStartsWith'] = this.searchKey.trim();
    // }

    // console.log('searchCriteria', searchCriteria);
    this.dashboardService.getAlerts(searchCriteria).subscribe(
      data => {
        console.log('alerts', data.body);
        if (this.pageNumber === 0) {
          this.alerts = data.body;

        } else {
          // concatenate arrays
          this.alerts = [...this.contacts, ...data.body];

        }
        // Totals
        // this.totalRows = data.body.data.total;
      },
      error => {

      }
    );

  }

  //Select Row
  selectRow(row, e) {
    // e.stopPropagation();

    // Uncheck bulk checkbox
    //this.bulkCheckbox = false;
    row.selected = !row.selected;
  }

  // Sort
  sortChanged(e) {
    this.sortOrder = e.direction;
    this.sortField = e.active;
    // sort local, this should be done on the backend
    this.contacts.sort(this.sortValues(this.sortField, this.sortOrder));
    this.dataSource = this.getPaginatedSlice();

    // this.getAllContacts();
  }

  // Pagination
  // https://material.angular.io/components/paginator/overview
  pageChanged(e) {
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    // console.log(this.pageNumber + '---' + this.pageSize);
    this.dataSource = this.getPaginatedSlice();

    // this.getAllContacts();
  }

  // Sort
  // array is sorted by band in descending order
  // singers.sort(sortValues('band', 'desc'));
  sortValues(key, order = 'asc') {

    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  // Fake pagination
  // this should happen on the backend
  // that way you only get the records you asked for, not all
  getPaginatedSlice() {
    const start = (this.pageNumber * this.pageSize);
    const end = (start + this.pageSize);
    const ds = this.contacts.slice(start, end);
    return ds;
  }



}
