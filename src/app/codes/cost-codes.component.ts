import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { CostCodesService } from './cost-codes.service';
import { AlertService } from '../alert/alert.service';
import { GlobalService } from '../globals/global.service';

@Component({
  selector: 'app-cost-codes',
  templateUrl: './cost-codes.component.html',
  styleUrls: ['./cost-codes.component.scss']
})
export class CostCodesComponent implements OnInit {
  costCodes: any;
  @ViewChild('node') node: ElementRef;
  @Output() public childEvent = new EventEmitter();

  constructor(
    private codesService: CostCodesService,
    private alertService: AlertService,
    private _globalService: GlobalService,
  ) { }

  ngOnInit() {
    this.getParentCostCodes();
  }

  // GET all Top-level cost codes
  getParentCostCodes(): void {
    this.codesService.getCostCodes().subscribe(
      data => {
        this.costCodes = data.body.line_items;
        // console.log('- getParentCostCodes', this.costCodes);
        // Open doors now!
        this._globalService.toggleDoors('openDoors');

      },
      err => {
        this.alertService.warn('Could not retreive cost codes');

      });

  }

  // Node label clicked
  nodeSelect(node, e) {
    e.stopPropagation();
    // console.log('OPEN', node);
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

  // Select or Unselect ALL
  selectUnselectAllNodesAndDescendants(node, isSelected: boolean) {
    node.selected = isSelected;
    node.children.forEach(i => { this.selectUnselectAllNodesAndDescendants(i, isSelected); });
  }

  // Checkbox selected
  codeSelected(node, e) {
    //
    this.selectUnselectAllNodesAndDescendants(node, e.checked);

    const bidItem = {
      cost_code: node.data.cost_code,
      item_id: node.data.item_id,
      item_parent: node.data.item_parent,
      name: node.data.name,
    };

    //
    const bArray = this.addAllDescendants(node, []);
    // console.log('ONE', bArray);
    const bArray2 = this.addAllAncestors(bidItem, []);
    // console.log('TWO', bArray2);
    const combineArrays = bArray.concat(bArray2);
    const noDupsArray = this.removeDupsFromArray(combineArrays);
    // console.log('noDupsArray', noDupsArray);
    const bidsTree = this.unflatten(noDupsArray);
    // console.log('bidsTree', bidsTree);

    // Emitter
    this.childEvent.emit(bidsTree);
  }

  // Add All + Descendants
  addAllDescendants(node, bArray: any[]) {
    // console.log('node', node);
    const bidItem = {
      cost_code: node.data.cost_code,
      item_id: node.data.item_id,
      item_parent: node.data.item_parent,
      name: node.data.name,
    };
    bArray.push(bidItem);
    // All kids too
    node.children.forEach(i => { this.addAllDescendants(i, bArray); });

    return bArray;
  }

  // All Ancestors
  addAllAncestors(bidItem: any, bArray: any[]) {
    bArray.push(bidItem);

    if (bidItem.item_parent !== '0') {
      const parent = document.getElementById(bidItem.item_parent);
      const parnentDetails = JSON.parse(parent.getAttribute('data-details'));

      const pBidItem = {
        cost_code: parnentDetails.cost_code,
        item_id: parnentDetails.item_id,
        item_parent: parnentDetails.item_parent,
        name: parnentDetails.name,
      };

      this.addAllAncestors(pBidItem, bArray);
    }

    return bArray;
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



}
