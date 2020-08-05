import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { SuperheroesService } from '../superheroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.scss']
})
export class ViewTeamComponent implements OnInit {
  selectedTeam: any;

  constructor(
    // private superheroesService: SuperheroesService,
    private router: Router,
    public dialogRef: MatDialogRef<ViewTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.selectedTeam = this.data.selectedTeam;
    console.log('>> dialog selectedTeam', this.selectedTeam);
  }

  details(hero, e) {
    // console.log('details', hero);
    // close modal
    this.dialogRef.close();
    this.router.navigate(['/superheroes/heroes/' + hero.id]);
  }

  delete(hero, e) {
    console.log('delete', hero);
    const delIndex = this.selectedTeam.members.findIndex(obj => obj.id === hero.id);
    this.selectedTeam.members.splice(delIndex, 1);
  }

  onClose() {
    this.dialogRef.close();
  }

}
