import { Component, OnInit, ViewChild } from '@angular/core';
import { SuperheroesService } from '../superheroes.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { AddToTeamComponent } from '../teams/add-to-team.component';
import { AlertService } from 'src/app/alert/alert.service';
// modal
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';
import { Overlay } from '@angular/cdk/overlay';
//animation
import { transition, animate, trigger, style } from '@angular/animations';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
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
      // transition(':enter', [ // * => void
      //   style({ opacity: 0 }),
      //   animate('1s ease-in',
      //     style({ opacity: 1 }))
      // ]),
      transition(':leave', [ // * => void
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('.7s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)',
            opacity: 0,
            height: '0px',
            margin: '0px'
          }))
      ]),

    ]),

  ]
})
export class HeroesComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  // heroes: any;
  displayedColumns: string[] = ['select', 'name', 'modified', 'comics', 'details', 'actions' ];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  sortField = 'name';
  sortOrder = 'asc';
  pageNumber = 0;
  pageSize = 25;
  totalRows = 0;
  bulkCheckbox = false;
  searchKey: string;

  constructor(
    private superheroesService: SuperheroesService,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public matDialog: MatDialog,
    public overlay: Overlay,
  ) {

    // Get and set the teams, no DB!
    const memTeams = this.superheroesService.getAllTeams();
    // console.log('memTeams', memTeams);
    if (memTeams.length === 0) {
      // Get teams from API
      this.superheroesService.getTeams().subscribe(
        data => {
          const teams = data.body;
          // console.log('teams', this.teams);
          this.superheroesService.setAllTeams(teams);
        },
        error => {

        }
      );
    }

  }

  ngOnInit(): void {

    this.getAllHeroes();
    //Defaults
    this.sort.direction = 'asc';
    this.sort.active = 'name';
    this.dataSource.sort = this.sort;
  }

  getAllHeroes() {
    const orderBy = (this.sortOrder === 'asc') ? this.sortField : '-' + this.sortField;

    var searchCriteria = {
      orderBy: orderBy,
      limit: this.pageSize,
      offset: (this.pageNumber * this.pageSize),
      // offset: (this.pageNumber - 1) * this.pageSize + 1,
    };

    if (this.searchKey !== null && this.searchKey !== undefined && this.searchKey !== '') {
      searchCriteria['nameStartsWith'] = this.searchKey.trim();
    }

    // console.log('searchCriteria', searchCriteria);
    this.superheroesService.getAllHeroes(searchCriteria).subscribe(
      data => {
        const heroes = data.body.data;
        // console.log('heroes', heroes);
        this.dataSource = new MatTableDataSource(heroes.results);
        this.totalRows = heroes.total;
      },
      error => {

      }
    );

  }

  search() {
    this.pageNumber = 0;
    this.paginator.pageIndex = 0;
    this.dataSource = null;
    this.getAllHeroes();
  }

  clearSearch() {
    this.searchKey = '';
    this.pageNumber = 0;
    this.paginator.pageIndex = 0;
    this.dataSource = null;
    this.getAllHeroes();
  }

  // Sort
  sortChanged(e) {
    console.log(e);
    this.dataSource = null;
    //
    this.sortOrder = e.direction;
    this.sortField = e.active;
    this.getAllHeroes();
  }

  // Pagination
  // https://material.angular.io/components/paginator/overview
  pageChanged(e) {
    //{previousPageIndex: 2, pageIndex: 1, pageSize: 2, length: 10}
    //
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    // console.log(this.pageNumber + '---' + this.pageSize);
    this.getAllHeroes();
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
    // e.stopPropagation();

    // Uncheck bulk checkbox
    this.bulkCheckbox = false;
    row.selected = !row.selected;
  }

  //Create
  onCreate() {
    // this.router.navigate(['/users/user']);
    this.router.navigate([0], { relativeTo: this.activatedRoute });
  }

  //Edit
  onEdit(row, e){
    e.stopPropagation();

    console.log('edit', row);
    this.router.navigate([row.id], { relativeTo: this.activatedRoute });
  }

  //Delete
  onDelete(row, e) {
    e.stopPropagation();

    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.panelClass = 'confirm-dialog-container';
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    dialogConfig.height = "200px";
    dialogConfig.width = "400px";
    dialogConfig.data = {
      type: "confirm",
      title: "Remove",
      message: `Are you sure you want to remove ${row.name}?`
    }
    // // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(
      data => {
        // console.log(`Dialog result: ${data}`);
        // if yes/true
        if (data) {
          // faking out since no DB.
          const index = this.dataSource.data.findIndex(obj => obj.id === row.id);
          this.dataSource.data.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.dataSource.data);


        }
        modalDialog.close();
      }
    );

  }

  // Add to Team!
  addToTeam() {
    const selectedHeroes = this.dataSource.data.filter(obj => obj.selected === true);

    if (selectedHeroes.length === 0) {
      this.alertService.error('You must select some heroes first!');
      return false;
    }

    const addToTeamHeroes = [];
    selectedHeroes.forEach(obj => {
      const h = {
        id: obj.id,
        name: obj.name
      };
      addToTeamHeroes.push(h);
    });

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    dialogConfig.width = '40%';
    dialogConfig.data = {
      heroes: addToTeamHeroes
    }
    const dialogRef = this.matDialog.open(AddToTeamComponent, dialogConfig);
    //
    dialogRef.afterClosed().subscribe(result => {

      if (result !== null && result !== undefined) {
        if (result.data.length === 1) {
          this.alertService.success('Successfully added a hero to a team!');
        }
        else if (result.data.length > 0) {
          this.alertService.success('Successfully added ' + result.data.length + ' heroes to a team!');
        }
      }

    });
  }

}
