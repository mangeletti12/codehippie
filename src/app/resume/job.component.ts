import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  // get jobDetails from parent
  @Input() jobDetails: any;

  // Emit to partent
  @Output() jobEmitter = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
    // console.log('jobDetails', this.jobDetails);

  }

  showJobDetails(job) {
    // console.log('showJobDetails', job);
    this.jobEmitter.emit(job.description);

  }


}
