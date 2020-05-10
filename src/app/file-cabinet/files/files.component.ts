import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

import { FilesService } from './files.service';
import { UploadService } from './upload.service';


// model (abstract out later)
export class FileForUpload {
  Id: number;
  Name: string;
  Note: string;
  Number: number;
  Date: string;
  FileName: string;
  FileType: string;
  FileValue: string;
  IsActive: boolean;
  DownloadUrl: string;
  LastModifiedOn: string;
  // DocumentDescriptors: any;
  Revisions: any;
  LoggedEvents: any;
  Events: any;
  // DocumentSetKeyword: string;
  // Filters: any;
  ClientIdentifier: string;
}


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  filesRetrieved: any[] = [];
  files: Set<File> = new Set();
  @ViewChild('file') file;
  @ViewChild('dropzone') dropzone;
  currentFolder: any;
  pageSize = 20;
  currentPage = 1;
  itemsRetrieved = 0;
  itemsTotal = 0;
  lastRenderedRange = 0;

  selectedItems: any[] = [];
  lastSelectedItem: any;

  searching = false;

  status: string;
  projectId: string;
  sort: string;
  sortField: string;
  sortOrder: number;
  textSearch: string;

  totalSizeInBytes;
  uploading = false;
  uploadSuccessful = false;
  progress;

  constructor(
    private filesService: FilesService,
    private uploadService: UploadService,
  ) { }

  ngOnInit(): void {
    this.setupPage();
  }

  /** Sets up the meta data for the page, then loads the estimates */
  setupPage() {
    // set defaults here... later will look for a cookie
    this.sort = 'createdAt~desc';
    this.sortField = 'createdAt';
    this.sortOrder = -1;

    // this.estimateService.getProjects().subscribe(
    //   data => {
    //   this.projects = data.body.projects;

    //   this.searchEstimate(); // Get all Estimates, for project
    // } );

    this.searchCriteria();
  }

  /** Get Files using filter and search criteria */
  getFiles( searchCriteria ) {
    this.searching = true;

    this.filesService.getFiles( searchCriteria ).subscribe(
      data => {

        // this.files = ( data.body ? data.body.items : [] ) || [];
        this.filesRetrieved = ( data.body ? data.body.items[0].folder.children : [] ) || [];
        console.log(this.filesRetrieved);
        console.log(data.body.items[0]);

        this.currentFolder = data.body.items[0];

        // if ( this.currentPage == 1 ) {
        //   this.list = dataList || [];
        //   this.selectItem( this.list[0] );  // Default, display first item
        // } else {
        //   this.list = this.list.concat( dataList );
        // }

        // this.itemsRetrieved = this.list.length;
        this.itemsTotal = data.body ? data.body.totalItems : 0;
        this.searching = false;
      },
      error => {

       }
    );
  }

  /** Sets up the search criteria */
  searchCriteria() {
    const filters = {
      status: this.status,
      projectId: this.projectId,
      searchTerm: this.textSearch,
    };

    Object.keys( filters ).forEach( k => {
      !filters[k] && ( filters[k] === null || filters[k] === undefined || typeof filters[k] === 'string' ) && delete filters[k]
    });

    const sorting = {
      sortKey: this.sortField,          // assuming the key is the name of the field
      sort: this.sortOrder,             // asc = 1, desc = -1
    };

    const searchCriteria = {
      includeAll: true,
      pageSize: this.pageSize,
      query: JSON.stringify( filters ), // assuming this fields usage
    };

    if ( this.sortField ) {
      Object.assign( searchCriteria, sorting );
    }

    // const searchCriteria = {
    //   PageNumber: this.currentPage,
    //   PageSize: this.pageSize,
    //   StartDate: null,
    //   EndDate: null,
    //   SearchCriteria: this.textSearch,
    //   SortColumn: this.sortField,
    //   SortDirection: this.sortOrder,
    //   IsActive: true,
    //   Filters: filters,
    // };

    this.getFiles( searchCriteria );
  }

  // Select a folder or file
  selectItem(item) {
    console.log(item);
    // Mark all non-selecetd, before mark the new selected
    this.filesRetrieved.forEach(i => { i.selected = false; });

    item.selected = !item.selected;
    // this.selectedItem = item;
  }

  // Pack a file with FileReader
  packageFile(file: File): Observable<FileForUpload> {

    return Observable.create(observer => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileForUpload = new FileForUpload();
        const encodedString = window.btoa(<string>reader.result);
        fileForUpload.FileValue = encodedString;
        fileForUpload.FileName = file.name;
        fileForUpload.FileType = file.type;
        // fileForUpload.DocumentSetKeyword = this.documentSetKeyword;
        // fileForUpload.ClientIdentifier = this.clientIdentifier;
        fileForUpload.IsActive = true;

        observer.next(fileForUpload);
        observer.complete();
      };

      // The readAsDataURL() method takes in a File or Blob an produces a data URL.
      // This is basically a base64 encoded string of the file data.
      // You can use this data URL for things like setting the src property for an image.
      reader.readAsDataURL(file);

    });

  }

  // Pack up ALL files
  packageFiles(): Observable<FileForUpload[]> {
    // Make the Set an Array
    const filesArray = Array.from(this.files.values());

    // https://www.learnrxjs.io/operators/combination/forkjoin.html
    // you wish to issue multiple requests
    // and only want to take action when a response has been receieved for all.
    return forkJoin(
      filesArray.map(file => this.packageFile(file))
    );

  }

  // Upload btn click
  uploadFiles() {
    console.log('uploadFiles');

    // set the component state to "uploading"
    this.uploading = true;

    // Package up ALL files
    this.packageFiles()
      .subscribe(
        filesToUpload => {
          //
          console.log(filesToUpload);

          // // start the upload and save the progress map
          // this.progress = this.uploadService.uploadStream(filesToUpload);


          // for (const key in this.progress) {
          //   this.progress[key].progress.subscribe(val => console.log(key + ' - ' + val));
          // }

          // // convert the progress map into an array
          // let allProgressObservables = [];
          // for (let key in this.progress) {
          //   allProgressObservables.push(this.progress[key].progress);
          // }

          // // Hide the cancel-button
          // this.showCancelButton = false;

          // // When all progress-observables are completed...
          // // https://www.learnrxjs.io/operators/combination/forkjoin.html
          // forkJoin(allProgressObservables).subscribe(end => {
          //   // ... the upload was successful...
          //   this.uploadSuccessful = true;

          //   // ... and the component is no longer uploading
          //   this.uploading = false;

          //   this.fileUploadStatusMsg = 'Successfully uploaded files!';

          //   // Get files again now!!!
          //   this.searchFileCabinet();
          //   // Auto reset
          //   // Remove to NOT auto reset!
          //   // this.resetUpload();
          // });

          //
        },
        error => {
          console.log('-- error');
        },

      );

  }



  // Add files btn click
  addFiles() {
    // console.log("click");
    // if (this.files.size > 0) {
      // this.resetUpload();
    // }

    // if (this.uploading || this.uploadSuccessful) {
    //  this.fileUploadStatusMsg = "You must reset!";
    // } else {
      this.file.nativeElement.click();
    // }
  }

  // Added files
  onFilesAdded() {
    const files: { [key: string]: any } = this.file.nativeElement.files;
    this.qFiles(files);
  }

  qFiles(files: any) {
    console.log('qFiles', files);

    // this.searchInput.nativeElement.value = "";

    if (this.uploading || this.uploadSuccessful) {
      // this.fileUploadStatusMsg = "You must reset!";
    } else {
      //
      for (const key in files) {
        if (!isNaN(parseInt(key))) {
          // Give it byteSize property
          files[key].byteSize = this.formatBytes(files[key].size);
          this.files.add(files[key]);
        }
      }

      // Show cancel button if we have files
      if (this.files.size > 0) {
        this.totalSize();
        // this.showCancelButton = true;
        console.log('totalSizeInBytes', this.totalSizeInBytes);
        // Automatically add files!!
        // Remove this to NOT auto upload!
        this.uploadFiles();
      }
    }

  }

  // Get Total File Size of Set
  totalSize() {
    //
    var totalFileSize = 0;

    if (this.files.size > 0) {
      this.files.forEach(f => {
        totalFileSize += f.size;
      });
      this.totalSizeInBytes = this.formatBytes(totalFileSize);
    }
  }

  // Format byte size
  formatBytes(bytes, decimals?) {
    if (bytes === 0) { return '0 Bytes'; }
    const k = 1024,
      dm = decimals <= 0 ? 0 : decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }



}
