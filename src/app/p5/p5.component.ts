import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';

// Penrose Tile L-System by Geraldine Sarmiento.
// This code was based on Patrick Dwyer's L-System class.
// p5.js
// https://p5js.org/
import * as p5 from 'p5';
// import "p5/lib/addons/p5.sound";
// import "p5/lib/addons/p5.dom";

/*
class LSystem
{
  steps: number = 0;

  axiom: string;
  rule: string;
  production: string;

  startLength: number;
  drawLength: number;
  theta: number;

 generations: number;

  LSystem() {
    this.axiom = "F";
    this.rule = "F+F-F";
    this.startLength = 190.0;
    this.theta = radians(120.0);
    this.reset();
  }

  reset(): void {
    this.production = this.axiom;
    this.drawLength = this.startLength;
    this.generations = 0;
  }

  getAge(): number {
    return this.generations;
  }

  render(): void {
    translate(width/2, height/2);

    this.steps += 5;
    if (this.steps > this.production.length()) {
      this.steps = this.production.length();
    }
    for (var i = 0; i < this.steps; i++) {
      var step = this.production.charAt(i);
      if (step == 'F') {
        rect(0, 0, -drawLength, -drawLength);
        noFill();
        translate(0, -drawLength);
      }
      else if (step == '+') {
        rotate(theta);
      }
      else if (step == '-') {
        rotate(-theta);
      }
      else if (step == '[') {
        pushMatrix();
      }
      else if (step == ']') {
        popMatrix();
      }
    }
  }

 simulate(gen: number): void {
    while (this.getAge() < gen) {
      this.production = this.iterate(this.production, this.rule);
    }
  }

  iterate(prod_: string, rule_: string): string {
    this.drawLength = this.drawLength * 0.6;
    this.generations++;
    var newProduction = prod_;
    newProduction = newProduction.replaceAll("F", rule_);
    return newProduction;
  }
}
*/

@Component({
  selector: 'app-p5',
  templateUrl: './p5.component.html',
  styleUrls: ['./p5.component.scss']
})
export class P5Component implements OnInit, OnDestroy  {
  private p5;
  private toggle = true;

  constructor() {
    //
    window.onresize = this.onWindowResize;
  }

  ngOnInit() {
    //
    this.createCanvas();
  }

  ngOnDestroy(): void {
    this.destroyCanvas();
  }

  //
  private onWindowResize = (e) => {
    this.p5.resizeCanvas(this.p5.windowWidth, this.p5.windowHeight);

  }

  private createCanvas = () => {
    // this.p5 = new p5(this.drawing);
    //
    this.p5 = new p5(this.penrose);
  }

  private destroyCanvas = () => {
    this.p5.noCanvas();
  }

  //
  private drawing = function (p: any) {

    console.log('drawing', p);

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight).parent('canvas');
      p.angleMode(p.DEGREES);
      p.rectMode(p.CENTER);
      p.background(0);
    };

    p.center = { x: 0, y: 0 };

    p.draw = () => {

      p.background(0);
      p.center.x = p.width / 2;
      p.center.y = p.height / 2;

      let hr = p.hour();
      let mn = p.minute();
      let sc = p.second();
      let ms = p.millis();

      p.push();

      p.translate(p.center.x, p.center.y);
      p.rotate(-90);

      p.strokeWeight(8);
      p.noFill();

      // dail
      p.stroke(175);
      p.arc(0, 0, 210, 210, 0, 360);

      // second
      let sc_end = p.map(sc % 60, 0, 60, 0, 360);

      p.push();
      p.rotate(sc_end);
      p.stroke(255, 0, 0);
      p.line(0, 0, 90, 0);
      p.pop();

      // minute
      let mn_end = p.map(mn % 60, 0, 60, 0, 360);
      p.push();
      p.rotate(mn_end);
      p.stroke(0, 230, 0);
      p.line(0, 0, 70, 0);
      p.pop();

      // hour
      let hr_end = p.map(hr % 12, 0, 12, 0, 360);
      p.push();
      p.rotate(hr_end);
      p.stroke(0, 0, 230);
      p.line(0, 0, 50, 0);
      p.pop();

      // center
      p.fill(255);
      p.noStroke();
      p.ellipse(0, 0, 8, 8);

      p.pop();

      let clock = hr + ':' + mn + ':' + sc;
      p.fill(255);
      p.noStroke();
      p.textSize(14);
      p.text(clock, 100, 50);


    };

  };


  // https://p5js.org/learn/
  private penrose = (p: any) => {

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight).parent('canvas');
      // p = new this.PenroseLSystem();
      // please, play around with the following line
      // p.simulate(5);
    };

    p.center = { x: 0, y: 0 };


    p.draw = () => {
      //
      p.background(220);
      // p.render();

      p.center.x = p.width / 2;
      p.center.y = p.height / 2;
      // draws an ellipse, with its center 50 pixels over from the left
      // and 50 pixels down from the top, with a width and height of 80 pixels
      p.ellipse(50,50,80,80);

      //

      // if (p.mouseIsPressed) {
      //   p.fill(0);
      // } else {
      //   p.fill(255);
      // }
      // p.ellipse(p.mouseX, p.mouseY, 80, 80);


    }; // end draw



  }

  //
  PenroseLSystem() {
    let steps = 0;

   //these are axiom and rules for the penrose rhombus l-system
   //a reference would be cool, but I couldn't find a good one
    let axiom = "[X]++[X]++[X]++[X]++[X]";
    let ruleW = "YF++ZF----XF[-YF----WF]++";
    let ruleX = "+YF--ZF[---WF--XF]+";
    let ruleY = "-WF++XF[+++YF++ZF]-";
    let ruleZ = "--YF++++WF[+ZF++++XF]--XF";

    //please play around with the following two lines
    let startLength = 460.0;
    let theta = this.p5.TWO_PI / 10.0; //36 degrees, try TWO_PI / 6.0, ...
    // this.reset();
  }


//////////////////////////////////////////////


/*
  setup() {
    createCanvas(710, 400);
    this.ds = new this.PenroseLSystem();
    //please, play around with the following line
    this.ds.simulate(5);
  }

  draw() {
    background(0);
    this.ds.render();
  }

  PenroseLSystem() {
      this.steps = 0;

     //these are axiom and rules for the penrose rhombus l-system
     //a reference would be cool, but I couldn't find a good one
      this.axiom = "[X]++[X]++[X]++[X]++[X]";
      this.ruleW = "YF++ZF----XF[-YF----WF]++";
      this.ruleX = "+YF--ZF[---WF--XF]+";
      this.ruleY = "-WF++XF[+++YF++ZF]-";
      this.ruleZ = "--YF++++WF[+ZF++++XF]--XF";

      //please play around with the following two lines
      this.startLength = 460.0;
      this.theta = TWO_PI / 10.0; //36 degrees, try TWO_PI / 6.0, ...
      this.reset();
  }

  PenroseLSystem.prototype.simulate = function (gen) {
    while (this.getAge() < gen) {
      this.iterate(this.production);
    }
  }

  PenroseLSystem.prototype.reset = function () {
      this.production = this.axiom;
      this.drawLength = this.startLength;
      this.generations = 0;
    }

  PenroseLSystem.prototype.getAge = function () {
      return this.generations;
    }

  //apply substitution rules to create new iteration of production string
  PenroseLSystem.prototype.iterate = function() {
      let newProduction = "";

      for(let i=0; i < this.production.length; ++i) {
        let step = this.production.charAt(i);
        //if current character is 'W', replace current character
        //by corresponding rule
        if (step == 'W') {
          newProduction = newProduction + this.ruleW;
        }
        else if (step == 'X') {
          newProduction = newProduction + this.ruleX;
        }
        else if (step == 'Y') {
          newProduction = newProduction + this.ruleY;
        }
        else if (step == 'Z') {
          newProduction = newProduction + this.ruleZ;
        }
        else {
          //drop all 'F' characters, don't touch other
          //characters (i.e. '+', '-', '[', ']'
          if (step != 'F') {
            newProduction = newProduction + step;
          }
        }
      }

      this.drawLength = this.drawLength * 0.5;
      this.generations++;
      this.production = newProduction;
  }

  //convert production string to a turtle graphic
  PenroseLSystem.prototype.render = function () {
      translate(width / 2, height / 2);

      this.steps += 20;
      if(this.steps > this.production.length) {
        this.steps = this.production.length;
      }

      for(let i=0; i<this.steps; ++i) {
        let step = this.production.charAt(i);

        //'W', 'X', 'Y', 'Z' symbols don't actually correspond to a turtle action
        if( step == 'F') {
          stroke(255, 60);
          for(let j=0; j < this.repeats; j++) {
            line(0, 0, 0, -this.drawLength);
            noFill();
            translate(0, -this.drawLength);
          }
          this.repeats = 1;
        }
        else if (step == '+') {
          rotate(this.theta);
        }
        else if (step == '-') {
          rotate(-this.theta);
        }
        else if (step == '[') {
          push();
        }
        else if (step == ']') {
          pop();
        }
      }
    }
  */



}
