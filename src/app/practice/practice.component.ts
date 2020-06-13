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

    // call attaches prop to function
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



    ////
    // pt2

    // prototype inheritance
    // allows you to add properties or methods to an object

    let car = function(model) {
      this.model = model;
    };

    car.prototype.getModel = function() {
      return this.model;
    }

    let toyota = new car('toyota');
    console.log(toyota.getModel());


    // difference between function delcaration and function expression?

    // function declaration
    function funcD() {
      console.log('function declaration');
    };

    // function expression
    // function is saved into a variable
    // not available until declaration
    let funcE = function() {
      console.log('function expression');
    };


    // promise
    // async call that has to wait for something to happen

    var p1 = new Promise(function(resolve, reject) {
      resolve("another ajax call");
    });


    // CLOSURES
    // What is closure and how do you use it?
    // They control what is and isn't in scope in a particular function.
    // Closures are most used for object data privacy.
    // A closure gives you access to an outer function's scope from an inner function.

    // Ex. 1

    const family = (lastName = 'Angeletti') => {
      let fullName;

      return {
        set: (firstName) => {
          fullName = firstName + ' ' + lastName;
        },
        get: () => {
          return fullName;
        }
      }
    }

    let l = family();
    l.set('landon');
    console.log(l);
    console.log(l.get());
    //
    let s = family();
    s.set('sofia');
    console.log(s);
    console.log(s.get());

    // in above '.get()' method is defined inside the scope of 'family',
    // which gives it access to any variables from 'family', and makes it a
    // privileged method. In this case, the parameter, 'lastName'.

    /*
    test('closure', assert => {
      const msg = '.get() should have access to the closure.';
      const expected = 'Angeletti';
      const obj = family();

      try {
        assert.ok()
      } catch(e) {

      }

    });
    */

    // Hoisting
    // Variable declarations are assigned a default value of 'undefined' during the creation phase









  }

}
