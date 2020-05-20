import { Component, OnInit, ViewChild, ElementRef, HostListener, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnChanges {
  form: FormGroup;
  searching = false;
  hasSearchOptions = false;
  searchHasfocus = false;
  hideSearch = true;
  useAdvancedSearch = false;

  @Output() searchBarEvent = new EventEmitter<any>();
  @Input('searchStatus') searchStatus = '';
  @ViewChild('advSearchHolder', { static: true }) advSearchHolder: ElementRef;

  constructor(
    private fb: FormBuilder,
  ) {

  }

  ngOnInit() {

    // Set default date range to current month
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const fd = firstDay.toISOString().slice(0, 10);
    const ld = lastDay.toISOString().slice(0, 10);
    // console.log(fd + ' - ' + ld);

    this.form = this.fb.group({
      startDateSearch: [fd],
      endDateSearch: [ld],
      textSearch: [''],
      showInactive: [false],
      // dynamic fields (descriptors) added below
      // descriptors: this.fb.group({})
    });

  }

  ngOnChanges(): void {
    console.log('searchStatus', this.searchStatus);
    this.searching = this.searchStatus === 'true';
  }

  // Check for click in the document, so we can close element
  @HostListener('document: click', ['$event'])
  onClick(e: Event) {
    // const element: HTMLElement = this.advSearchHolder.nativeElement;
    const idAttr = (e.target as Element).id;

    if (idAttr !== 'showSearchOptions') {
      // https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
      if (this.advSearchHolder.nativeElement.contains(e.target)) {
        // console.log('inside');
      } else {
        // console.log('outside');
        this.hideSearch = true;
      }
    }
  }

  // This is called from 'other' components
  setSearchBar(searchValue: string) {
    console.log('setSearchBar', searchValue);
    this.form.get('textSearch').setValue(searchValue);
    this.hasSearchOptions = true;
  }

  //
  onSearchChange(searchValue: string) {
    console.log('onSearchChange', searchValue);
    this.form.get('textSearch').setValue(searchValue);
  }

  // Submit
  searchSubmit() {
    // Called from search, so we assume a NEW search
    this.hideSearch = true;
    this.searching = true;
    //
    const searchBarParams = this.form.value;
    // console.log('searchSubmit', searchBarParams);

    if (searchBarParams.textSearch !== ''
      || searchBarParams.showInactive !== false) {
      this.hasSearchOptions = true;
    } else {
      this.hasSearchOptions = false;
    }
    // Output the search now!
    this.searchBarEvent.emit(searchBarParams);
  }

  // X button to clear and submit
  xFilter() {
    this.clearFilterForm();
    this.searchSubmit();
  }

  // Clear form
  clearFilterForm() {
    // this.form.reset();

    this.hasSearchOptions = false;
    // Default to one month, the current month
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const fd = firstDay.toISOString().slice(0, 10);
    const ld = lastDay.toISOString().slice(0, 10);

    this.form.get('startDateSearch').setValue(fd);
    this.form.get('endDateSearch').setValue(ld);
    this.form.get('textSearch').setValue('');
    this.form.get('showInactive').setValue(false);

    // Clear dynamic descriptors
    // var desc = this.form.get('descriptors');
    // for (var fc in desc['controls']) {
    //   desc.get(fc).setValue("");
    // }
  }

  // Focus Search
  focusSearch() {
    this.hideSearch = true;
    this.searchHasfocus = true;
  }

  // Focus OUT Search
  focusOutSearch() {
    this.searchHasfocus = false;
  }


}
