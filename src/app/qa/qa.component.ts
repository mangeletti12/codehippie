import { Component, OnInit } from '@angular/core';
import { QaService } from './qa.service';


@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.scss']
})
export class QaComponent implements OnInit {
  users: any[] = [];
  qAndA: any[] = [];

  colors = [
    "#bde052",
    "#e23dd0",
    "#86e98f",
    "#bde052",
    "#DBF6FA",
    "#E6B0AA",
    "#FADBD8",
    "#EBDEF0",
    "#a3e4d7",
    "#aed6f1",
    "#ebdef0",
    "#fadbd8",
    "#f5b7b1",
    "#d1f2eb",
    "#a9dfbf",
    "#a3e4d7",
    "#aed6f1",
    "#ebdef0",
    "#fadbd8",
    "#f5b7b1",
]

  constructor(
    private qaService: QaService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    //
    this.qaService.getUsers().subscribe(
      data => {
        this.users = data;
        // console.log('users', this.users);
        // Get the users answers and questions now
        this.getQuestionsByUser();
      }
    );

  }

  getQuestionsByUser() {

    const me = this.users.filter(obj => obj.lastName === 'Angeletti')[0];
    // console.log('me', me);
    //
    this.qaService.getUsersAnswers(me).subscribe(
      data => {
        console.log('getQuestionsByUser', data);

        // set a random color
        for (let i = 0; i < data.length; i++) {
          const color = this.setRandomColor();
          data[i].data['color'] = color;
          data[i].data['lightColor'] = this.LightenDarkenColor(color, -40);
        }

        // Attach a random color
        this.qAndA = data;
      }
    );

  }

  // Get random color from array
  setRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)]
  }

  // Lighten or Darken color
  LightenDarkenColor(col, amt) {

    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}


}
