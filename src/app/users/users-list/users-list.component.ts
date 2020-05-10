import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { UsersService } from '../users.service';
import { UserComponent } from '../user/user.component';

import { DialogService } from '../../mat-confirm-dialog/mat-confirm-dialog.service';
// import { Router } from '@angular/router';

//https://blog.angular-university.io/angular-material-data-table/

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  //We will not be using the built-in MatTableDataSource because
  // its designed for filtering, sorting and pagination of a client-side data array
  dataSource: MatTableDataSource<any>;

  users: any;
  isLoading = false;

  displayedColumns: string[] = ['select', 'fullName', 'birthYear', 'gender', 'hairColor', 'height', 'actions'];
  //Sort Table
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: string;
  totalLength: number;
  //
  isActive = true;
  sortField = 'Date';
  sortOrder = 'desc';
  pageNumber = 0;
  pageSize = 10;
  bulkCheckbox = false;
  isCardsView: boolean = false;

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    // private router: Router,
  ) {
  }

  ngOnInit(): void {
    //
    this.searchUsers();
    //Defaults
    this.sort.direction = 'asc';
    this.sort.active = 'height';
  }

  //Get Users
  searchUsers() {
    this.bulkCheckbox = false;

    var searchCriteria = {
      PageNumber: this.pageNumber,
      PageSize: this.pageSize,
      //StartDate: this.startDateSearch,
      //EndDate: this.endDateSearch,
      //SearchCriteria: this.textSearch,
      SortColumn: this.sortField,
      SortDirection: this.sortOrder,
      IsActive: this.isActive,
      //Filters: filters,
      //DocumentSetKeyword: this.searchContext,
    };
    //console.log(searchCriteria);

    this.isLoading = true;

    this.usersService.getUsers(++this.pageNumber).subscribe(
      data => {
        //console.log(data.body);
        if(1 === 1) {
          this.users = data.body.results;
          //console.log(this.users);
          this.dataSource = new MatTableDataSource(this.users);
          //
          // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;

          //Total records
          this.totalLength = 55;
          //
          this.isLoading = false;
        }

      },
      error => {

      }
    );


  }

  // Sort
  sortChanged(e) {
    console.log(e);
    this.dataSource = null;
    //
    this.sortOrder = e.direction;
    this.sortField = e.active;
    this.searchUsers();
  }

  // Pagination
  // https://material.angular.io/components/paginator/overview
  pageChanged(e) {
    //{previousPageIndex: 2, pageIndex: 1, pageSize: 2, length: 10}
    console.log('pageChanged', e);
    // this.dataSource = null;
    //
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    this.searchUsers();
  }

  // Filter
  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  // }


  //Create
  onCreate() {
    //this.router.navigate(['/users/user']);

    this.usersService.initializeFormGroup();
    //
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    //
    this.dialog.open(UserComponent, dialogConfig);
  }

  //Edit
  onEdit(row, e){
    e.stopPropagation();

    console.log(row);
    this.usersService.populateForm(row);
    //
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    //
    this.dialog.open(UserComponent, dialogConfig);
  }

  //Delete
  onDelete(row, e) {
    e.stopPropagation();

    console.log(row);
    //call confirm box now
    this.dialogService.openConfirmDialog('Are you sure you want to delete ' + row.name + '?')
    .afterClosed().subscribe(
      data => {
        console.log(data);
      }
    );


  }


  //Select all files
  selectAllFiles(event: any) {

    if (!this.bulkCheckbox) {
      //Mark all files selected
      this.dataSource.data.forEach(i => { i.selected = true; });
      this.bulkCheckbox = true;
    } else {
      //Mark all files unselected
      this.dataSource.data.forEach(i => { i.selected = false; });
      this.bulkCheckbox = false;
    }
  }

  //Select Row
  selectRow(row, e) {
    //e.stopPropagation();

    //Uncheck bulk checkbox
    this.bulkCheckbox = false;
    row.selected = !row.selected;
  }


  //Check viewport size
  // and switch views to cards view if overflow-y
  changeViews() {
    //var element = HTMLElement = this.fcHolder.nativeElement;
    //console.log(element.scrollWidth + " - " + element.clientWidth);
    //if (element.scrollWidth > element.clientWidth) {
      //console.log('overflow-y');
      this.isCardsView = !this.isCardsView;
    //}
  }


}
