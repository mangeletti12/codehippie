import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';

// an interface is a virtual structure that only exists within the context of TypeScript, not JavaScript
// The TypeScript compiler uses interfaces solely for type-checking purposes.
// interface is a structural contract

export interface iPizza {
  name: string;
  toppings: string[];
}

// TypeScript shorthand to define class properties from arguments of the contructor.
export class Pizza {
  constructor(public name: string, public toppings: string[]) {}
}

// Class
export class PizzaMaker {
  //
  static create(event: iPizza) {
    return new Pizza(event.name, event.toppings);
  }

}

// Abstract classes are mainly for inheritance where other classes may derive from them
// We cannot create an instance of an abstract class.
abstract class Person {
  public firstName: string;
  public lastName: string;
  public age: number;
  private ssn: string;

  constructor(firstName:string, lastName: string, age: number, ssn: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
      this.ssn = ssn;
  }

  public getSSN() {
    return this.ssn;
  }

  abstract doWork(): void;
}
//
class Employee extends Person {
  skills: string[];

  doWork(): void {
    console.log(`${this.lastName}, ${this.firstName} doing work...`);
  }

}
//
class Pirate extends Person {
  public weapon: string;

  setWeapon(attackingWith) {
    this.weapon = attackingWith;
  }

  doWork(): void {
    console.log(`${this.lastName}, ${this.firstName} doing work...`);
  }

  attack() {
    return "attack with " + this.weapon;
  }
}
//
class Ninja extends Person {
  public weapon: string;

  doWork(): void {
    console.log(`${this.lastName}, ${this.firstName} doing work...`);
  }

  constructor(firstName:string, lastName: string, age: number, ssn: string, weapon: string) {
      super(firstName, lastName, age, ssn);
      this.weapon = weapon;
  }

  attack() {
    return "attack with " + this.weapon;
  }
}



@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit, OnChanges {
  @Input() stages: string[];
  @Input() newIdeaer: string;

  public ideas: any[] = [];
  public developments: any[] = [];
  public testings: any[] = [];
  public deployments: any[] = [];

  listItems = [
    {type: 'idea', value: 'idea1'},
    {type: 'idea', value: 'idea2'},
    {type: 'development', value: 'develpoment1'},
    {type: 'development', value: 'develpoment2'},
    {type: 'testing', value: 'testing1'},
    {type: 'deployment', value: 'deployment1'},
  ];

  merch = [
    { name: 'bike', price: 100 },
    { name: 'TV', price: 200 },
    { name: 'Album', price: 10 },
    { name: 'Book', price: 5 },
    { name: 'Phone', price: 500 },
    { name: 'Computer', price: 1000 },
    { name: 'keyboard', price: 25 }
  ]

  // fruits = [
  //   {type: 'apple', id: '1'},
  //   {type: 'apple', id: '2'},
  //   {type: 'apple', id: '3'},
  //   {type: 'orange', id: '4'},
  //   {type: 'orange', id: '5'},
  //   {type: 'banana', id: '6'},
  // ];
  
  
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
    //
    this.ideas = this.listItems.filter(i => i.type === 'idea');
    this.developments = this.listItems.filter(i => i.type === 'development');
    this.testings = this.listItems.filter(i => i.type === 'testing');
    this.deployments = this.listItems.filter(i => i.type === 'deployment');

    // this.arrayPlay();

    //////
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
    this.pizzaPlay();

    //////
    const array1 = [1,6,3,5,8,9,4,10,2];
    this.findMedian(array1);
    const array2 = [1,6,3,5,8,9,4,10,2,7];
    this.findMedian(array2);

    // this.notes();
  }

  //
  pizzaPlay() {

    const pizza1 = PizzaMaker.create({
      name: 'Inferno',
      toppings: ['cheese', 'peppers'],
    });

    console.log('pizzaPlay', pizza1);

    // const pizzaMaker = new Pizza('MKA Pie', ['cheese', 'pepperoni']);
    // console.log('pizzaMaker', pizzaMaker);

    // var p = new Person("Mario", "Super", 29, "123-90-4567");
    // console.log("Last name: " + p.lastName + " SSN: " + p.getSSN());
    // 
    var e = new Employee("Luke", "Skywalker", 43, "555-34-3333");
    // console.log(e.talk('Did you hear...'));
    //
    var n = new Ninja('Bruce', 'Lee', 22, '663-23-555', 'knife');
    console.log('Ninja', n);
    //
    let p = new Pirate('Black', 'Baerd', 66, '344-34-555');
    p.setWeapon('cannon');
    console.log('Pirate', p);

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

  // Find Array
  findMedian(arr) {
    if (arr.length === 0) { return 0; }

    arr.sort((a, b) => a-b);

    const halfway = arr.length / 2;

    // is array odd or even?
    const isEven =  halfway % 1 == 0; 
    // console.log('isEven', isEven);
    let median;
    if (isEven) {
      // If even, the median is the average of the two numbers on both sides of the halfway.
      median = (arr[halfway - 1] + arr[halfway]) / 2 ;
    } else {
      // If odd, get the middle number
      median = arr[Math.floor(halfway)];
    }
    console.log('median', median);
  }


  //
  arrayPlay() {
    // filter
    const filtered = this.merch.filter(i => i.price <= 100);
    console.log('filtered', filtered);
    // map
    const justNames = this.merch.map(i => i.name);
    console.log('justNames', justNames);
    // map
    const twoPercent = this.merch.map(i => {
      var percentToGet = 2;
      var percentAsDecimal = (percentToGet / 100);
      var percent = percentAsDecimal * i.price;
      return i.price + percent;
    
    });
    console.log('twoPercent', twoPercent);


    // find
    const findItem = this.merch.find(i => i.name === 'Book');
    console.log('findItem', findItem);
    // foreach
    this.merch.forEach(i => {
      // console.log(i);
    });
    // some
    const hasTenDollarItem = this.merch.some(i => i.price === 10);
    console.log('hasTenDollarItem', hasTenDollarItem);
    // reduce
    const total = this.merch.reduce((currentTotal, i) => {
      return i.price + currentTotal;
    }, 0);
    console.log('total', total);



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
    // console.log('onLeftClick1', item);

     switch(item.type) {
      case 'idea':
        item.type = "development";
        this.developments.push(item);
        let i = this.ideas.findIndex(i => i.type === item.type && i.value === item.value);
        this.ideas.splice(i, 1);

        break;
      case 'development':
        item.type = "testing";
        this.testings.push(item);
        let d = this.developments.findIndex(i => i.type === item.type && i.value === item.value);
        this.developments.splice(d, 1);

        break;
      case 'testing':
        item.type = "deployment";
        this.deployments.push(item);
        let t = this.testings.findIndex(i => i.type === item.type && i.value === item.value);
        this.testings.splice(t, 1);

        break;
      case 'deployment':
        // delete
        let del = this.developments.findIndex(i => i.type === item.type && i.value === item.value);
        this.deployments.splice(del, 1);

        break;
      default:
 
    }
     
    // console.log('onLeftClick2', item);
    console.log('this.listItems', this.listItems);

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
        this.ideas.push(item);
        let d = this.developments.findIndex(i => i.type === item.type && i.value === item.value);
        this.developments.splice(d, 1);

        break;
      case 'testing':
        item.type = "development";
        this.developments.push(item);
        let t = this.testings.findIndex(i => i.type === item.type && i.value === item.value);
        this.testings.splice(t, 1);

        break;
      case 'deployment':
        item.type = "testing";
        this.testings.push(item);
        let dep = this.deployments.findIndex(i => i.type === item.type && i.value === item.value);
        this.deployments.splice(dep, 1);

        break;
      default:
    }

    return false;
  }

}
