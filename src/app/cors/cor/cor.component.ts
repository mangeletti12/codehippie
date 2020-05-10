import { Component, OnInit } from '@angular/core';
import { CorService } from '../cor.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/alert/alert.service';
// import { DatePipe } from '@angular/common';
import { MatDatepicker } from '@angular/material/datepicker';

//animation
import {
  transition,
  animate,
  trigger,
  state,
  style,
  query,
  animation,
  stagger,
  sequence
} from '@angular/animations';


@Component({
  selector: 'cor',
  templateUrl: './cor.component.html',
  styleUrls: ['./cor.component.scss'],
  animations: [
    trigger('items', [
      transition(':enter', [
        // void => *
        style({ transform: 'scale(0.5)', opacity: 0 }), // initial
        animate(
          '1s cubic-bezier(.8, -0.6, 0.2, 1)', // 1 to not enlarge
          style({
            transform: 'scale(1)',
            opacity: 1
          })
        )
      ]),
      transition(':leave', [
        // * => void
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate(
          '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)',
            opacity: 0,
            height: '0px',
            margin: '0px'
          })
        )
      ])
    ])
  ]
})
export class CorComponent implements OnInit {
  title = 'Update';
  form: FormGroup;
  id;

  constructor(
    private corService: CorService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {

  }


  ngOnInit(): void {
    // Get params
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    //
    if (this.id === '0' || this.id === undefined) {
      this.title = 'Create';
    } else {
      this.getChangeOrders();
    }

    //
    this.form = this.fb.group({
      $key: new FormControl(null),
      actionDate: new FormControl('', Validators.required),
      corDate: new FormControl('', Validators.required),
      amountApproved: new FormControl('', [Validators.required, Validators.minLength(8)]),
      amountQuoted: new FormControl('', [Validators.required, Validators.minLength(8)]),
      equipmentCost: new FormControl(),
      laborCost: new FormControl(),
      laborHours: new FormControl(),
      materialCost: new FormControl(),
      otherCost: new FormControl(),
      comments: new FormControl()
    });

  }

  // Clear Form
  onClear() {
    this.form.reset();
    this.initializeFormGroup();
  }

  // Reset
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      actionDate: '',
      corDate: '',
      amountApproved: '',
      amountQuoted: '',
      equipmentCost: '',
      laborCost: '',
      laborHours: '',
      materialCost: '',
      otherCost: '',
      comments: '',
    });
  }

  // Get Season Matches
  getChangeOrders() {

    this.corService.getChangeOrders(1).subscribe(
      data => {
        // console.log(data.body.cors);
        //console.log(this.id);
        const cor = data.body.cors.filter(n => n.Number === this.id);
        // console.log(cor);

        const actionDateDisplay = new Date(cor[0].Action_Date);
        const corDateDisplay = new Date(cor[0].COR_Date);

        this.form.setValue({
          $key: null,
          actionDate: actionDateDisplay,
          corDate: corDateDisplay,
          amountApproved: cor[0].Amount_Approved,
          amountQuoted: cor[0].Amount_Quoted,
          equipmentCost: cor[0].Equipment_Cost,
          laborCost: cor[0].Labor_Cost,
          laborHours: cor[0].Labor_Hours,
          materialCost: cor[0].Material_Cost,
          otherCost: cor[0].Other_Cost,
          comments: cor[0].Comments,
        });


      },
      error => {

      }

    );
  }

  onSubmit() {
    console.log(this.form.controls);
    this.alertService.success('Successfully updated!');
  }


}
