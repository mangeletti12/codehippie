import { Component, OnInit } from '@angular/core';
import { AboutService } from './about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  mySkills: any[] = [];
  selectedType = 'all';
  cardFront = true;
  pic: any;
  myPics = [
    {image: 'flc.jpg', details: 'Fort Lewis College, Durango 2017'},
    {image: 'mka1.jpg', details: 'Red Rocks Amphitheater 2017'},
    {image: 'breck.jpg', details: 'Breckenridge 2017'},
  ];

  constructor(
    private aboutService: AboutService,
  ) { }

  ngOnInit(): void {
    this.getSkills();
    this.getRandomPic();
  }

  getSkills() {
    this.aboutService.getSkills().subscribe(
      data => {
        this.mySkills = data.body;
        // console.log('skills', this.mySkills);
      }
    )
  }

  //
  filterSkill(skill) {

    // Mark all selected false
    this.mySkills.forEach(obj => {

        if (obj.type === skill) {
          // just a single color
          obj.selected = true;
        }
        else {
          obj.selected = false;
        }
    });

    // clicked same skill/color again!
    // so show all!
    if (this.selectedType === skill) {
      this.mySkills.forEach(obj => obj.selected = true);
      skill = 'all';
    }
    //
    this.selectedType = skill;
  }

  //
  getRandomPic() {
    //
    this.pic = this.myPics[Math.floor(Math.random() * this.myPics.length)];
  }

}
