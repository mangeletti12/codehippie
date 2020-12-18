import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { AddToTeamComponent } from '../teams/add-to-team.component';
import { AlertService } from 'src/app/alert/alert.service';
// modal
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';
import { Overlay } from '@angular/cdk/overlay';
// animation
import { transition, animate, trigger, style } from '@angular/animations';
import { tap, filter, take, distinctUntilChanged, map } from 'rxjs/operators';
// ngrx
import { Store } from '@ngrx/store';
import { State } from '../state/superheroes.state';
import * as HeroActions  from '../state/superheroes.actions';
import * as HeroSelectors from '../state/superheroes.selectors';
import { Subscription } from 'rxjs';


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
export class HeroesComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  displayedColumns: string[] = ['select', 'name', 'modified', 'comics', 'details', 'actions' ];
  dataSource = new MatTableDataSource<any>();
  // superheroes: Superheroes;
  // ngrx
  // sups$ = this.store.pipe(select(state => state.superheroes));
  sortField = 'name';
  sortOrder = 'asc';
  pageNumber = 0;
  pageSize = 25;
  totalRows = 0;
  bulkCheckbox = false;
  searchKey: string;
  isLoading: boolean;
  private subs: Subscription; 

  constructor(
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public matDialog: MatDialog,
    public overlay: Overlay,
    //
    private store: Store<State>,
  ) {

  }

  ngOnInit(): void {
    //Defaults
    this.sort.active = 'name';
    this.sort.direction = 'asc';
    this.dataSource.sort = this.sort;

    //------
    // Set selectors (streams)

    // isLoading
    this.subs = this.store.select(HeroSelectors.selectHeroesLoading).pipe(
      ).subscribe(
        data => {
          console.log('selectHeroesLoading', data);
          this.isLoading = data;
        }
      );
    // totals
    this.subs = this.store.select(HeroSelectors.selectHeroesTotal).pipe(
      ).subscribe(
        data => {
          console.log('selectHeroesTotal', data);
          this.totalRows = data;
        }
      );
    // error
    this.subs = this.store.select(HeroSelectors.selectHeroesError).pipe(
      ).subscribe(
        data => {
          console.log('selectHeroesError', data);
        }
      );

      this.getAllHeroes();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getAllHeroes() {
    const orderBy = (this.sortOrder === 'asc') ? this.sortField : '-' + this.sortField;

    var searchCriteria = {
      orderBy: orderBy,
      limit: this.pageSize,
      offset: (this.pageNumber * this.pageSize),
      page: this.pageNumber 
    };

    if (this.searchKey !== null && this.searchKey !== undefined && this.searchKey !== '') {
      searchCriteria['nameStartsWith'] = this.searchKey.trim();
    }
    console.log('searchCriteria', searchCriteria);
  
    // get all
    this.subs = this.store.select(HeroSelectors.selectAllHeroes(this.pageNumber)).pipe(
      distinctUntilChanged(),
      ).subscribe(
        data => {
          console.log('selectAllHeroes', data);
          if (data !== undefined ) {
            this.dataSource = new MatTableDataSource(data);
          }
          else {
            //
            console.log('DB ----->', this.pageNumber);
            this.store.dispatch(HeroActions.getAllHeroes({ searchCriteria }));
          }

        }
      );
    

    /*
    //----------
    // NgRx 
    // return an Observable stream from the store
    this.store
      // selecting the state using a feature selector
      .select(HeroSelectors.selectHeroesDetails).pipe(
        
        // the .tap() operator allows for a side effect, at this
        // point, I'm checking if the superhereos property exists on my
        // Store slice of state
        tap((data: any) => {
          console.log('tap >', data);

          // if there are no items, dispatch an action to hit the backend
          // if (!data.superheroes.length) {
          if (!data.loading) {
            console.log('DB >', data);
            this.store.dispatch(HeroActions.getAllHeroes({ searchCriteria }));
          }
        }),
        // filter out data.superheroes, no length === empty!
        filter((data: any) => data.superheroes.length),
        // which if empty, we will never .take()
        // this is the same as .first() which will only
        // take 1 value from the Observable then complete
        // which does our unsubscribing.
        take(1),
      ).subscribe(
        data => {
          console.log('-->', data);
          this.dataSource = new MatTableDataSource(data.superheroes);
          this.totalRows = data.total;
        }
      );
    */

  }

  search(e) {

    //if (e.key === "Enter") {
      // console.log('SEARCH', e);
      //
      this.pageNumber = 0;
      this.paginator.pageIndex = 0;
      this.dataSource = null;
      this.getAllHeroes();
    //}

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
    // console.log(e);
    this.dataSource = null;
    //
    this.sortOrder = e.direction;
    this.sortField = e.active;
    this.getAllHeroes();
  }

  // Pagination
  // https://material.angular.io/components/paginator/overview
  pageChanged(e) {
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

    console.log('edit', row.id);
    // get single hero
    // this.subs = this.store.select(HeroSelectors.selectHero(row.id)).pipe(
    //   // map((func) => func(row.id))
    //   ).subscribe(
    //     data => {
    //       console.log('selectHero', data);
    //     }
    //   );

    // this.router.navigate([row.id], { relativeTo: this.activatedRoute });
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
          row.removed = true;
          // console.log('ROW', row);
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
