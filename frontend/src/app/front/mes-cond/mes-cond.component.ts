import { Component, OnInit } from '@angular/core';
import { Condidature } from 'src/app/core/models/condidature';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { CondidatureService } from 'src/app/core/services/condidature.service';

@Component({
  selector: 'app-mes-cond',
  templateUrl: './mes-cond.component.html',
  styleUrls: ['./mes-cond.component.css']
})
export class MesCondComponent implements OnInit {

  constructor(private condidatureService: CondidatureService,private authService:AuthService) { }
  con: Condidature[]; 
  currentUser:User;

  ngOnInit(): void {
    /********Get the user connected*********/
this.authService.CurrentUser().subscribe(
  (user: User) => {
      this.currentUser = user;
      this.getAllCondidatures();  

      console.log('Utilisateur connecté : ', this.currentUser);
  },
  (error) => {
      console.error('Erreur lors de la récupération de l\'utilisateur : ', error);
  }
);
/***********************************/
  }
  getAllCondidatures() {
    this.condidatureService.getAllCondidatures().subscribe(
      (condidatures: Condidature[]) => {
        // Filtrer les condidatures pour n'afficher que celles du user ayant l'ID égal à 1
        this.con = condidatures.filter(condidature => condidature.user.id === this.currentUser.id);
        console.log("Received Condidatures:", this.con); // Log the received data to the console
      },
      error => {
        console.error("Error fetching Condidatures:", error);
      } 
    ); 
  }
}
