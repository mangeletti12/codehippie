import { Component, OnInit,  } from '@angular/core';
import { Alert, AlertType } from './alert';
import { AlertService } from './alert.service';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['./alert.component.scss']
})
 
export class AlertComponent implements OnInit  {
    alerts: Alert[] = [];
    //timerTransIn ;

    constructor(
        private alertService: AlertService
        ) { }
 
    ngOnInit() {
        
        this.alertService.getAlert().subscribe((alert: Alert) => {
            if (!alert) {
                // clear alerts when an empty alert is received
                this.alerts = [];
                return;
            }

            //We do this cause we can't use css transitions on elements that arent there
            // so this gets the element in the DOM, then adds the class transIn
            ///
            //this means we will only ever have an array of one
            // you can comment out this if you want a toaster alerts (many)
            this.alerts = [];
            //clearTimeout(killArray);

            //add alert to array
            this.alerts.push(alert);
            
            //kill the array
            // var killArray = setTimeout( ()=> {
            //     this.alerts = [];
                             
            // }, 6000);
        });

    }

    //
    // setTransIn(alert: any) {
    //     this.timerTransIn = setTimeout( ()=> {
    //         console.log('set transIn');
    //         alert.transIn = true;
                      
    //     }, 2);
    // }

    lastAlert() {
        console.log('last alert');
    }
 
    removeAlert(alert: Alert) {
        this.alerts = this.alerts.filter(x => x !== alert);
    }
 
    cssClass(alert: Alert) {
        if (!alert) {
            return;
        }
 
        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Success:
                return 'alert-element alert-good';
            case AlertType.Error:
                return 'alert-element alert-bad';
            case AlertType.Info:
                return 'alert-element alert-info';
            case AlertType.Warning:
                return 'alert-element alert-warning';
        }
    }


}