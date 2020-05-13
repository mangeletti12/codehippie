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

  constructor(
    private aboutService: AboutService,
  ) { }

  ngOnInit(): void {
    this.getSkills()
  }

  getSkills() {
    this.aboutService.getSkills().subscribe(
      data => {
        this.mySkills = data.body;

        // const sortedSkills = data.body;

        // sortedSkills.sort((n1,n2) => {
        //   if (n1.skill > n2.skill) {
        //       return 1;
        //   }

        //   if (n1.skill < n2.skill) {
        //       return -1;
        //   }

        //   return 0;
        // });
        // console.log('sortedSkills', sortedSkills);
        console.log('skills', this.mySkills);
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

}
