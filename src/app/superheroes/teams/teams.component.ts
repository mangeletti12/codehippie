import { Component, OnInit } from '@angular/core';
import { SuperheroesService } from '../superheroes.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewTeamComponent } from '../teams/view-team.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams: any[] = [];

  constructor(
    private superheroesService: SuperheroesService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getTeams();

  }

  getTeams() {
    // Get and set the teams, no DB!
    this.teams = this.superheroesService.getAllTeams();
    // console.log('this.teams', this.teams);
    if (this.teams.length === 0) {
      // Get teams from API
      this.superheroesService.getTeams().subscribe(
        data => {
          this.teams = data.body;
          // Set in memory, no DB!
          this.superheroesService.setAllTeams(this.teams);
        },
        error => {

        }
      );
    }

  }

  viewTeam(team) {
    // console.log('viewTeam', team);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = {
      selectedTeam: team
    }
    const dialogRef = this.dialog.open(ViewTeamComponent, dialogConfig);

  }

}
