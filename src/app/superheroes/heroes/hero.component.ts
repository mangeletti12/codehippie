import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SuperheroesService } from '../superheroes.service';
import { AlertService } from '../../alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  form: FormGroup;
  heroId: number;

  constructor(
    public superheroesService: SuperheroesService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    // get hero id
    this.route.paramMap.subscribe(params => {
      this.heroId = Number(params.get('id'));
      // console.log('heroId', this.heroId);
      // Get Hero and fill form
      if (this.heroId !== 0) {
        this.getHero(this.heroId);
      }
    });

    // Assume New hero, so initialize the form as a NEW, and add the validators
    this.form = this.fb.group( {
      $key: new FormControl(null),
      name: new FormControl('', [Validators.required, Validators.minLength(4)] ),
      modified: new FormControl('', Validators.required),
      comics: new FormControl('' ),

    } );
  }

  //Get hero
  getHero(id) {

    this.superheroesService.getHero(id).subscribe(
      data => {
        const hero = data.body.data.results[0];
        console.log('hero', hero);

        const modDate = this.datePipe.transform(hero.modified, 'yyyy-MM-dd');
        let zModDate = new Date(modDate);
        zModDate.setMinutes( zModDate.getMinutes() + zModDate.getTimezoneOffset() );

        // update the values of the form with data from the dto
        this.form.get( '$key' ).setValue( hero.id );
        this.form.get( 'name' ).setValue( hero.name );
        this.form.get( 'modified' ).setValue( zModDate );
        this.form.get( 'comics' ).setValue( hero.comics.available );

      },
      error => {

      }
    );

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
      name: '',
      modified: '',
      comics: '',

    });
  }

  // Submit form
  onSubmit() {
    // console.log(this.form.controls);

    //
    if (this.form.valid) {
        var heroId = this.form.get('$key').value;

      // Insert
      if (!heroId) {
        const newHero = {
          name: this.form.get('name').value,
          modified: this.form.get('modified').value,
          comics: { 'available': Number(this.form.get('comics').value) },
        };

        // console.log('insert hero', newHero);
        this.superheroesService.setHeroToInsert(newHero);
        // msg
        this.alertService.success('Successfully added Hero! Kidding, no DB!');
        //
        // this.router.navigate(['..'], { relativeTo: this.route });
        // this.location.back();

      } else {
        // Update

      }

    }

  }


}
