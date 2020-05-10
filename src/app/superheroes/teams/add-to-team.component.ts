import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuperheroesService } from '../superheroes.service';

@Component({
  selector: 'app-add-to-team',
  templateUrl: './add-to-team.component.html',
  styleUrls: ['./add-to-team.component.scss']
})
export class AddToTeamComponent implements OnInit {
  passedInHeroes: any;
  teams: any;
  selectedTeam = 1; // default Avengers!

  constructor(
    private superheroesService: SuperheroesService,
    public dialogRef: MatDialogRef<AddToTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  ngOnInit(): void {
    this.passedInHeroes = this.data.heroes;
    // console.log('dialog heroes', this.passedInHeroes);

    // Get the teams from memory, no DB!
    this.teams = this.superheroesService.getAllTeams();
    // console.log('all teams', this.teams);
  }

  changeTeam(team) {
    // console.log('changeTeam', team);
    this.selectedTeam = team;
  }

  addToTeam() {
    // add to team?
    const selectedTeam = this.teams.filter(obj => obj.id === this.selectedTeam)[0];
    // console.log('selectedTeam', selectedTeam);
    for(let i = 0; i < this.passedInHeroes.length; i++) {
      // check to see if hero is already in team
      const isAlreadyInTeam = selectedTeam.members.filter(obj => obj.id === this.passedInHeroes[i].id);
      if (isAlreadyInTeam.length === 0) {
        selectedTeam.members.push(this.passedInHeroes[i]);
      }
    }

    // console.log('-- all teams --', this.teams);
    // set in memory, no DB!
    this.superheroesService.setAllTeams(this.teams);

    // set data for return trip
    this.dialogRef.close({ data: this.passedInHeroes });
  }

  onClose() {
    this.dialogRef.close();
  }

}
