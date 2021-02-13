import { Component, OnInit, OnDestroy } from '@angular/core';
import { PermService } from './perms.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-perm-table',
  templateUrl: './perm-table.component.html',
  styleUrls: ['./perm-table.component.scss']
})
export class PermTableComponent implements OnInit, OnDestroy {
  displayedColumns: any[] = ['Details'];
  headerColumns: any;
  dataSource: any[] = [];
  public bulkCheckbox = false;
  private subs: Subscription;

  constructor(
    private permService: PermService,
  ) { }

  ngOnInit(): void {
    this.getPerms();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getPerms() {

    this.subs = this.permService.getPerms().subscribe(
      (data: any) => {
        const users = data.results[0].perms;
        console.log('users', users);
        // column heads
        this.headerColumns = { 'fields': this.displayedColumns, 'users': users };
        this.dataSource = data.results;
      }
    );
  }

  // Toggle Action
  toggleAction(id: number, item: any) {
    // console.log('toggleAction', id, item);
    const user = item.perms.filter(i => i.standardId === id)[0];
    const perm = user.permission;

    if (perm === true) {
      user.permission = false;
    } 
    else if (perm === false) {
      user.permission = null;
    }
    else if(perm === null) {
      user.permission = true;
    }

  }

  // Bulk Action
  bulkAction(item: any, action: string) {
    console.log('bulkAction', item, action);
    const filter = this.dataSource.filter(i => i.name === item.name)[0];

    let actionTrans = null;
    if (action === 'red') {
      actionTrans = false;
    }
    else if (action === 'green') {
      actionTrans = true;
    }
    filter.perms.forEach(i => i.permission = actionTrans);
  }

  // Hide/Show meta details row
  details(e: any, item: any) {
    console.log('details', item);
    const holdMeta = item.showMeta;
    console.log('hold', holdMeta);

    this.dataSource.forEach(e => e.showMeta = false);

    if (holdMeta === undefined || holdMeta === false) {
      item.showMeta = true;
    }
    else {
      item.showMeta = false;
    }

  }

  //
  toggleSelectAll() {
    if(!this.bulkCheckbox) {
      this.dataSource.forEach((i: any) => { i.selected = true; });
      this.bulkCheckbox = true;
    }
    else {
      this.dataSource.forEach((i: any) => { i.selected = false; });
      this.bulkCheckbox = false;
    }
  }

  //
  userSelected(user: any) {
    console.log('userSelected', user);
    // this.router.navigate([user.standardId], { relativeTo: this.activatedRoute });
  }
  
  //
  selectRow(row: any) {
    this.bulkCheckbox = false;
    row.selected = !row.selected;
  }



}
