import { Component, OnInit, ViewChild } from '@angular/core';
import { GRMService } from './grm.service';
//
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
//
import { animate, state, style, transition, trigger } from '@angular/animations';


export class TableExpandableRowsExample {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  expandedElement: PeriodicElement | null;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

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

//
const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  }, {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
  }, {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`
  }, {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`
  }, {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`
  }, {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
  }, {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
        the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
        agent that readily forms oxides with most elements as well as with other compounds.`
  }, {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`
  }, {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
  },
];




@Component({
  selector: 'app-grm-dashboard',
  templateUrl: './grm-dashboard.component.html',
  styleUrls: ['./grm-dashboard.component.scss'],
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
export class GrmDashboardComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['contactStatus', 'contactName', 'contactGround', 'contactEquipment'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  contacts: any;
  alerts: any;
  sortField = 'name';
  sortOrder = 'asc';
  pageNumber = 0;
  pageSize = 5;
  totalRows = 0;
  //
  // dataSource2 = ELEMENT_DATA;
  // columnsToDisplay2 = ['name', 'weight', 'symbol', 'position'];
  expandedElement: Contact | null;
  //


  constructor(
    private grmService: GRMService,
  ) { }

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
    this.grmService.getContacts(searchCriteria).subscribe(
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
          this.totalRows = data.body.length;
        } else {
          // concatenate arrays
          this.contacts = [...this.contacts, ...data.body];

        }
        // Totals
        // this.totalRows = data.body.data.total;
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
    this.grmService.getAlerts(searchCriteria).subscribe(
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
    console.log(e);
    // this.dataSource = null;
    //
    this.sortOrder = e.direction;
    this.sortField = e.active;
    // this.getAllHeroes();
  }

  // Pagination
  // https://material.angular.io/components/paginator/overview
  pageChanged(e) {

    //
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    // console.log(this.pageNumber + '---' + this.pageSize);
    this.dataSource = null;
    // fake pagination
    // this should happen on the backend
    // that you would only get the records you asked for, not all
    const start = (this.pageNumber * this.pageSize);
    const end = (start + this.pageSize);
    console.log(start + " - " + end);

    const ds = this.contacts.slice(start, end);
    this.dataSource = ds;

    // this.getAllHeroes();
  }




}
