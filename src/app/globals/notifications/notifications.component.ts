import { Component, OnInit } from '@angular/core';

export class Notifications {
  id: number;
  description: string;
  daysOld: number;
  type: string;
  status: string;
}


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications: Notifications[] = [
    { 'id': 0, 'description': 'Server Error 401', 'daysOld': 1, 'type': 'error', 'status': 'open' },
    { 'id': 1, 'description': 'Bad Request', 'daysOld': 3, 'type': 'error', 'status': 'closed'  },
    { 'id': 2, 'description': 'Happy Birthday', 'daysOld': 3, 'type': 'success', 'status': 'open'  },
    { 'id': 3, 'description': 'Your chicken and waffles are ready!', 'daysOld': 15, 'type': 'success', 'status': 'open'  },
  ];

  constructor() { }

  ngOnInit() {
  }

}
