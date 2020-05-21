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
        this.qAndA = data;
      }
    );

  }


}
