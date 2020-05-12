import { Component, OnInit } from '@angular/core';
import { ExternalService } from '../home/external.service';
//
import { AlertService } from '../alert/alert.service';
import { Claims } from '../constants/claims';

@Component({
  selector: 'app-test-alerts',
  providers: [ExternalService],
  templateUrl: './test-alerts.component.html',
  styleUrls: ['./test-alerts.component.scss']
})
export class TestAlertsComponent implements OnInit {

  constructor(
    private externalService: ExternalService,
    public claims: Claims,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {

  }

  alertGood() {
    this.alertService.success('Oh, say can you see by the dawn\'s early light. What so proudly we hailed at the twilight\'s last gleaming? Whose broad stripes and bright stars through the perilous fight, O\'er the ramparts we watched were so allantly streaming? And the rocket\'s red glare, the bombs bursting in air, Gave proof through the night that our flag was still there. Oh, say does that star-spangled banner yet wave O\'er the land of the free and the home of the brave?');
  }
  alertBad() {
    this.alertService.error('This is an error message?');
  }
  alertClear() {
    this.alertService.clear();
  }

  error401() {
    this.externalService.error401()
    .subscribe(
      data => {
        console.log(data);

      },
      error => {

      }
      );
  }

  error404() {
    this.externalService.error404()
    .subscribe(
      data => {
        console.log(data);
      },
      error => {

      }
      );
  }

  error405() {
    this.externalService.error405()
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log('405 error');
      });
  }

  longRequest() {
    this.externalService.longReguest()
    .subscribe(
      data => {
        console.log(data);
        this.alertService.success('This is the long request?');
      },
      error => {

      });
  }

}
