import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  // get jobDetails from parent
  @Input() jobDetails: string;

  constructor() { }

  ngOnInit(): void {
    // console.log('jobDetails', this.jobDetails);

  }

}
