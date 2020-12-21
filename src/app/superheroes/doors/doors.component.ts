import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../globals/global.service';
import { Subscription } from 'rxjs';
import { SuperheroesService } from '../superheroes.service';
import { take } from 'rxjs/operators';
// animation
import { transition, animate, trigger, state, style } from '@angular/animations';


@Component({
  selector: 'app-doors',
  templateUrl: './doors.component.html',
  styleUrls: ['./doors.component.scss'],
  animations: [
    // trigger('hideShowItems', [
    //   state('showItems', style({
    //     opacity: 1,
    //     transform: 'translateY(0)'
    //   })),
    //   state('hideItems', style({
    //     opacity: 0,
    //     transform: 'translateY(-700px)'
    //   })),
    //   transition('showItems => hideItems', animate('900ms ease-in')),
    //   transition('hideItems => showItems', animate('900ms ease-out'))
    // ]),
    // // Details
    // trigger('hideShowDetails', [
    //   state('hideItems', style({
    //     opacity: 1,
    //     transform: 'translateY(0)'
    //   })),
    //   state('showItems', style({
    //     opacity: 0,
    //     transform: 'translateY(-700px)'
    //   })),
    //   transition('* => *', animate('1000ms ease-out')),
    // ]),
    ////////////////////
    trigger('items', [
      transition(':enter', [ // void => *
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('900ms cubic-bezier(.8, -0.6, 0.2, 1)', // 1 to not enlarge
          style({
            transform: 'scale(1)',
            opacity: 1
          }))
      ]),
      transition(':leave', [ // * => void
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('700ms cubic-bezier(.8, -0.6, 0.2, 1.5)',
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
export class DoorsComponent implements OnInit, OnDestroy, AfterViewInit {
  listSource: any[] = [];
  listSource2: any[] = [];

  sortField = 'name';
  sortOrder = 'asc';
  //Defaults
  private defaultSortField = this.sortField;
  private defaultSortOrder = this.sortOrder;
  pageNumber = 0;
  pageSize = 25;
  totalRows = 0;
  bulkCheckbox = false;
  searchKey: string;
  
  allHeroes = 0;
  filteredHeroes = 0;
  private subs: Subscription;
  public isSortOrFilter = false;
  // infinite scroll
  @ViewChild('anchor', { static: true })
  public anchor: ElementRef<HTMLElement>;
  private observer: IntersectionObserver;
  public itemsFetchedCount = 0;
  public itemsTotalCount = 0;
  public isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private _globalService: GlobalService,
    private heroService: SuperheroesService,
  ) { }

  ngOnInit(): void {

    /*
    // from resolver-doors.service.ts
    const routeData = this.route.snapshot.data;
    console.log('routeData', routeData.resolved);

    // Open doors now!
    this.subs = this._globalService.doorsTransition.subscribe(
      data => {
        // Toggle done with loading, if true, else no need
        if (data) {
          this._globalService.toggleDoors(false);
        }
      }
    );
    */

    this.getAllHeroes();

  }

  ngAfterViewInit() {
    this.infiniteScrollListener();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // Get Heroes
  getAllHeroes() {
    this.isLoading = true;

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
    // console.log('searchCriteria', searchCriteria);

    // if (!this.isSortOrFilter) {
    //   // NgRx
    //   //-----
    //   this.subs = this.store.select(HeroSelectors.selectHeroes(this.pageNumber)).pipe(
    //     distinctUntilChanged(),
    //     ).subscribe(
    //       data => {
    //         console.log('->', data);
    //         if (data) {
    //           this.dataSource = new MatTableDataSource(data);
    //           this.totalRows = this.allHeroes;
    //         }
    //         else {
    //           //
    //           console.log('DB ----->', this.pageNumber);
    //           this.store.dispatch(HeroActions.getAllHeroes({ searchCriteria }));
    //         }

    //       }
    //     );
        
    // }
    // else {
      // call service for search, not NgRx
      //-----
      this.subs = this.heroService.getAllHeroes(searchCriteria).pipe(
        take(1),
      ).subscribe(
        data => {
          console.log('service', data.body.data);
          this.listSource = this.listSource.concat(data.body.data.results);
          this.itemsFetchedCount = this.listSource.length;
          this.itemsTotalCount = data.body.data.total;
          this.isLoading = false;
        }
      );

    // }

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

  // infinite-scroll
  public infiniteScrollListener() {
    const config = {
      root: null as any,
      rootMargin: '0px',
      threshold: 0, // look this up
    };

    this.observer = new IntersectionObserver(([entry]) => {
      // if isIntersecting is true, the target element has become
      // as least as visible as the threshold that was passed in the config.
      if (entry.isIntersecting && !this.isLoading) {
        if (this.itemsFetchedCount !== this.itemsTotalCount) {
          console.log('--- SCROLLING');
          this.pageNumber++;
          //
          this.getAllHeroes();
        }
      }
    }, config);
    //
    this.observer.observe(this.anchor.nativeElement);
  }

  // Drop event
  onDrop(event: CdkDragDrop<any[]>) {
    console.log('onDrop', event);

    //
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, 
        event.currentIndex);
    }



    
  }

  // Select a card
  selectItem(item) {
    // console.log('selectItem', item);
    // Mark all non-selecetd, before mark the new selected
    // this.heroes.forEach(i => { i.selected = false; });

    item.selected = !item.selected;
    // this.selectedItem = item;
  }

  //Get selected cards
  getSelectedCards() {
    // var selected = this.list1.filter(i => i.isSelected);
    // console.log(selected);

  }


  //Remove
  remove(index, e) {
    e.stopPropagation();

    // const dialogConfig = new MatDialogConfig();
    // // The user can't close the dialog by clicking outside its body
    // dialogConfig.disableClose = true;
    // dialogConfig.id = "modal-component";
    // dialogConfig.panelClass = 'confirm-dialog-container';
    // dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    // dialogConfig.height = "200px";
    // dialogConfig.width = "400px";
    // dialogConfig.data = {
    //   type: "confirm",
    //   title: "Remove",
    //   message: 'Are you sure you want to remove this item?'
    // }
    // // // https://material.angular.io/components/dialog/overview
    // const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);

    // modalDialog.afterClosed().subscribe(
    //   data => {
    //     // console.log(`Dialog result: ${data}`);
    //     // if yes/true
    //     if (data) {
    //       if (!this.heroes.length) { return; }
    //       // remove item from array
    //       this.heroes.splice(index, 1);
    //     }
    //     modalDialog.close();
    //   }
    // );

  }

}
