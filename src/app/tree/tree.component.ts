import { Component, OnInit } from '@angular/core';

// import { MatIconModule } from '@angular/material/icon'
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatSelectModule } from '@angular/material/select';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  bidItems: any[] = [];

  foods: Food[] = [
    {value: '0', viewValue: 'Steak'},
    {value: '1', viewValue: 'Pizza'},
    {value: '2', viewValue: 'Tacos'}
  ];

  constructor() { }

  ngOnInit() {
  }


  // Node label clicked
  nodeSelect(node, e) {
    e.stopPropagation();
    console.log('OPEN- ', node);
    node.open = !node.open;

    // if closed, loop over and close ALL children too
    if (!node.open) {
      //
      if (node.children.length) {
        //
        this.nodeClose(node);
      }
    }

  }

  // Recursion
  nodeClose(node) {
    node.open = false;
    node.children.forEach(i => { this.nodeClose(i); });
  }

  //
  codeSelected(child, $event) {
    console.log(child);
  }

  // EventEmitter from child
  arrayChangeEvent(e) {
    console.log('emitter', e);

    // Is bidItems loaded?
    if (this.bidItems.length === 0) {
      this.bidItems = e;
    } else {
      // flatten and then add to our array
      // console.log('e', e);

      let flatEmitted = [];
      e.forEach(n => {
        const items = this.flatten(n, []);
        flatEmitted = flatEmitted.concat(items);
      });
      console.log('flatEmitted', flatEmitted);

      this.addEmittedToBidItems(flatEmitted);
    }

  }

  // Flatten array
  flatten(node, arr) {
    // console.log('node', node);
    const bidItem = {
      cost_code: node.cost_code,
      item_id: node.item_id,
      item_parent: node.item_parent,
      name: node.name,
      children: node.children
    };

    arr.push(bidItem);
    // All kids too
    node.children.forEach(i => { this.flatten(i, arr); });

    return arr;
  }

  //
  getFlattendBidItems() {
    console.log('- bidItems', this.bidItems);
    let flatBidItems = [];
    this.bidItems.forEach(n => {
      const items = this.flatten(n, []);
      flatBidItems = flatBidItems.concat(items);
    });
    console.log('-- flat-bidItems', flatBidItems);
    return flatBidItems;
  }

  //
  addEmittedToBidItems(flatEmitted) {
    // loop
    flatEmitted.forEach(node => {

      const flatBidItem = this.getFlattendBidItems();
      //
      const found = flatBidItem.filter(n => n.item_id === node.item_id);
      // console.log('have', found);
      // did not find it, so add it
      if (found.length === 0) {
        console.log('add', node);

        if (node.item_parent === '0') {
          // top level
          this.bidItems.push(node);
          // You just updated bitItems!
          // why we have to re-do flatBidItems in the loop above

        } else {
          const parent = flatBidItem.filter(n => n.item_id === node.item_parent)[0];
          console.log('parent', parent);

          parent.children.push(node);
        }

      }

    });

  }



  // Take array to tree
  unflatten(arr) {
    var tree = [],
        mappedArr = {},
        arrElem,
        mappedElem;

    // First map the nodes of the array to an object -> create a hash table.
    for (var i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.item_id] = arrElem;
      mappedArr[arrElem.item_id]['children'] = [];
    }
    //
    for (const id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];

        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.item_parent !== '0') {
          mappedArr[mappedElem['item_parent']]['children'].push(mappedElem);
        } else {
          tree.push(mappedElem);
        }
      }
    }

    return tree;
  }



  // Remove dups from array
  removeDupsFromArray(array) {
    const a = array.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i].item_id === a[j].item_id) {
            a.splice(j--, 1);
        }
      }
    }

    return a;
  }



  //Delete
  onDelete(row, e) {
    e.stopPropagation();

    console.log(row);
    // //call confirm box now
    // this.dialogService.openConfirmDialog('Are you sure you want to delete ' + row.name + '?')
    // .afterClosed().subscribe(
    //   data => {
    //     console.log(data);
    //   }
    // );

  }

    // Food Select change
    changeFood(value, item) {

      item.food = value;
    }

}
