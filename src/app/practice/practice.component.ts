import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // var has function scope
    // var gets hoisted
    // let has block scrope

    {
      console.log('v1', v);
      // console.log('l1', l); //cant before initialization

      var v = 2;
      let l = 1;
      const cName = {
        name: 'Austin',
      }

      cName['middle'] = 'Todd';

      console.log('cName', cName);
    }

    console.log('v', v);
    // let AND const can only be accessed within the code block it was instantiated in
    // console.log('l', l);
    // console.log('cName', cName);


    //////////////////////////
    // difference between '==' and '==='
    // == compares value only
    // === compares type too
    // if ('1' == 1) {

    // }


    ///////////////
    // function v arrow function =>

    const profile = {
      firstName: '',
      lastName: '',

      setName: function(name) {

        let splitName = (n) => {
          let nameArray = n.split(' ');
          this.firstName = nameArray[0];
          this.lastName = nameArray[1];
        }
        splitName(name);
      }

    }

    profile.setName('bob marley');
    console.log(profile.firstName);



  }




}
