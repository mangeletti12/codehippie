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
    // let has block scope

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
    // => allow you to access outer variables

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

    //
    //////////////////////////
    // 'this' keyword


    const cleanTable = function(soap) {
      console.log(`cleaning ${this.table} using ${soap}.`);
    }

    let garage = {
      table: 'garage table',
    };

    cleanTable.call(garage, 'garage soap');

    //

    // constructor function
    // let createRoom = function(name) {
    //   this.table = `${name}s table`;
    // }

    // //
    // createRoom.prototype.cleanTable = function(soap) {
    //   console.log(`cleaning ${this.table} using ${soap}.`)
    // }

    class createRoom {
      table: string;

      constructor(name) {
        this.table = `${name}'s table`
      }
      cleanTable(soap) {
        console.log(`cleaning ${this.table} using ${soap}.`)
      }
    }

    const jillsRoom = new createRoom('jill');
    const johnsRoom = new createRoom('john');

    jillsRoom.cleanTable('jill soap');
    johnsRoom.cleanTable('john soap');

  }




}
