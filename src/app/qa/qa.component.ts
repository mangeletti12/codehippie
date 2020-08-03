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
    "#fff3aa",
    "#ffd0a8",
    "#ffb1b1",
    "#d9d1ff",
    "#b7efff",
    "#96ceb4",
    "#ffeead",
    "#ff6f69",
    "#ffcc5c",
    "#FF555E",
    "#FF8650",
    "#FFE981",
    "#8BF18B",
    "#83B2FF",
    "#9B6EF3"
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
    const austin = this.users.filter(obj => obj.lastName === 'Austin')[0];

    //
    this.qaService.getUsersAnswers(me).subscribe(
      data => {
        
        var colorPicker = this.setRandomNoRepeats(this.colors);
        // set a random color and date
        for (let i = 0; i < data.length; i++) {
          //const color = this.setRandomColor();
          const color = colorPicker();
          
          data[i].data['color'] = color;
          data[i].data['lightColor'] = this.LightenDarkenColor(color, -40);
          data[i].data['formattedDate'] = this.timeConverter(data[i].data.date.seconds);
        }
        // console.log('getQuestionsByUser', data);
        // sort date
        const sorted = data.sort((a, b) => b.data.date.seconds - a.data.date.seconds);
        console.log('sorted', sorted);

        this.qAndA = sorted;
      }
    );

  }

  // Get random color from array
  setRandomColor() {
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    // console.log('random color', color);
    return color;
  }
  
  //
  setRandomNoRepeats(array) {
    var copy = array.slice(0);
    return function() {
      if (copy.length < 1) { copy = array.slice(0); }
      var index = Math.floor(Math.random() * copy.length);
      var item = copy[index];
      copy.splice(index, 1);
      return item;
    };
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

  timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

}
