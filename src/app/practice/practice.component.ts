import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit, OnChanges {
  @Input() stages: string[];
  @Input() newIdeaer: string;

  ideas: any[] = [];
  developments: any[] = [];
  testings: any[] = [];
  deployments: any[] = [];

  listItems = [
    {type: 'idea', value: 'idea1'},
    {type: 'idea', value: 'idea2'},
    {type: 'development', value: 'develpoment1'},
    {type: 'development', value: 'develpoment2'},
    {type: 'testing', value: 'testing1'},
    {type: 'deployment', value: 'deployment1'},
  ];
  
  ngOnChanges(e) {
    const newIdeaValue = e.newIdeaer.currentValue;
    console.log('ngOnChanges', e );
    if (newIdeaValue !== undefined) {
      const newIdea = {
        type: 'idea',
        value: newIdeaValue
      }

      this.ideas.push(newIdea);
    }
    
    
  }

  constructor() { }

  ngOnInit(): void {


    this.ideas = this.listItems.filter(i => i.type === 'idea');
    this.developments = this.listItems.filter(i => i.type === 'development');
    this.testings = this.listItems.filter(i => i.type === 'testing');
    this.deployments = this.listItems.filter(i => i.type === 'deployment');


    const roman1 = this.romanEncoder(1986);
    // console.log('roman1', roman1);
    const roman2 = this.romanEncoder(1000);
    // console.log('roman2', roman2);

    //////
    const camelCaseString1 = "hello world";
    const camelResult = this.camelCase(camelCaseString1);
    // console.log('camelResult', camelResult);

    //////
    const test1 = "2 4 7 8 10";
    const iq1 = this.iqTest(test1);
    // console.log('ig1', iq1);
    const test2 = "1 2 2";
    const iq2 = this.iqTest(test2);
    // console.log('ig2', iq2);

    //////



    // this.notes();
  }

  //
  notes() {
    /////////
    // Practice

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

    console.log('v2', v);
    // let AND const can only be accessed within the code block it was instantiated in
    // console.log('l', l);
    // console.log('cName', cName);


    //////////////////////////
    // difference between '==' and '==='
    // == compares value only
    // === compares type too
    // if ('1' == 1) {
    //   console.log('==', 'pass');
    // }
    // if ('1' === 1) {
    //   console.log('===', 'fail');
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
    console.log(profile.firstName + ' ' + profile.lastName);

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




  // Create a function taking a positive integer as its parameter and 
  // returning a string containing the Roman Numeral representation of that integer.
  // Remember that there can't be more than 3 identical symbols in a row.
  romanEncoder(num: number): string {
    // convert the number to a roman numeral
    // 1986 = M CM LXXX VI
    // MCMLXXXVI

    const romanize = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    };

    // const numHolder = num.toString().split('').map(n => +n);
    // console.log('numHolder', numHolder);
    // for (var x = 0; x < numHolder.length; x++ ) {

    // }
    var str = '';
    for (var i of Object.keys(romanize)) {
      //
      var q = Math.floor(num / romanize[i]);
      // console.log('q >', q);

      num -= q * romanize[i];
      // console.log('num >', num);

      // str += i.repeat(q);
      for (var x = 0; x < q; x++) {
        str += i;
      }
      // console.log('str >', str);
    }
    
    return str;
  } 



  // All words must have their first letter capitalized without spaces.
  // camelCase("hello case"); // => "HelloCase"
  camelCase(str: string): string {
    const strArray: string = str.split(' ').map(l => l.charAt(0).toUpperCase() + l.substr(1)).join('');
    // console.log('strArray', strArray);
    return strArray;
  }


  // IQ Test
  // find out which one of the given numbers differs from the others
  // given numbers finds one that is different in evenness, and return a position of this number.
  iqTest(numbers: string): number {

    let numsArray: number[] = numbers.split(' ').map(n => +n % 2);
    // console.log('numsArray', numsArray);

    var selectedCard = numsArray[0];
    var same = [];
    var diff = [];
    // is this your card?
    for (var n = 0; n < numsArray.length; n++) {
      if(numsArray[n] === selectedCard) {
        same.push(n+1);
      } else {
        diff.push(n+1);
      }
    }
    // console.log('same', same);
    // console.log('diff', diff);

    if (same.length === 1) { return same[0]; }
    if (diff.length === 1) { return diff[0]; }

    return 0;


    // var positions = [[], []];

    // for (var i = 0; i < nums.length; i++) {
    //     positions[+nums[i] % 2].push(i + 1);
    // }
    // console.log('positions', positions);

    // if (positions[0].length === 1) return positions[0][0];
    // if (positions[1].length === 1) return positions[1][0];
  }


  // return the sum of all the muliples of 3 or 5 below the number passed in
  // note: if a number is a multiple of both 3 and 5 only count it once
  multiples(num: number) {
    let sum = 0;
    for(var i = 0; i < num; i++) {
      // console.log('mod ' + i, i % 5);
      if(i % 3 === 0 || i % 5 === 0) {
        sum = sum + i;
      }
    }
    // console.log('sum', sum);
  }

  // Testing
  test() {
    let array1 = [1,2,3];
    let cArray = [...array1]; // copy array
    array1.push(4);
    console.log('cArray', cArray); // [1,2,3]
    let combineArray = [...cArray, ...array1]; // combine
    console.log('combineArray', combineArray); // [1, 2, 3, 1, 2, 3, 4]

    const addMoreArray = [...array1, 5,6];
    console.log('addMoreArray', addMoreArray); // [1, 2, 3, 4, 5, 6]
  }





  onLeftClick(item) {
    console.log('onLeftClick1', item);

     switch(item.type) {
      case 'idea':
        item.type = "development";
        let i = this.ideas.findIndex(i => i.type === item.type && i.value === item.value);
        console.log('index', i);
        this.developments.push(item);
        this.ideas.splice(i, 1);

        break;
      case 'development':
        item.type = "testing";
        let d = this.developments.findIndex(i => i.type === item.type && i.value === item.value);
        this.testings.push(item);
        this.developments.splice(d, 1);

        break;
      case 'testing':
        item.type = "deployment";
        let t = this.developments.findIndex(i => i.type === item.type && i.value === item.value);
        this.deployments.push(item);
        this.testings.splice(t, 1);

        break;
      case 'deployment':
        // delete
        let del = this.developments.findIndex(i => i.type === item.type && i.value === item.value);
        this.deployments.splice(del, 1);

        break;
      default:
 
    }
     
    //  console.log('onLeftClick2', item);
    //  console.log('this.listItems', this.listItems);
    //return false;
  }
  //
  onRightClick(item) {
    console.log('onRightClick', item);
    
    switch(item.type) {
      case 'idea':
        let i = this.ideas.findIndex(i => i.type === item.type && i.value === item.value);
        this.ideas.splice(i, 1);

        break;
      case 'development':
        item.type = "idea";
        let d = this.developments.findIndex(i => i.type === item.type && i.value === item.value);
        this.ideas.push(item);
        this.developments.splice(d, 1);

        break;
      case 'testing':
        item.type = "development";
        let t = this.testings.findIndex(i => i.type === item.type && i.value === item.value);
        this.developments.push(item);
        this.testings.splice(t, 1);

        break;
      case 'deployment':
        item.type = "testing";
        let dep = this.deployments.findIndex(i => i.type === item.type && i.value === item.value);
        this.testings.push(item);
        this.deployments.splice(dep, 1);

        break;
      default:
    }

    return false;
  }

}
