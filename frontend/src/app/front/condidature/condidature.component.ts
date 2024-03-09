import { Component, OnInit, ViewChild } from '@angular/core';
import { Condidature, EtatCondidature } from 'src/app/core/models/condidature';
import { User } from 'src/app/core/models/user';
import { CondidatureService } from 'src/app/core/services/condidature.service'; 
import { FormGroup, NgForm } from '@angular/forms';
import { Offre } from 'src/app/core/models/Offre';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAlert } from 'src/app/sections/alerts-section/alerts-section.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-condidature',
  templateUrl: './condidature.component.html',
  styleUrls: ['./condidature.component.css'],
  providers: [CondidatureService] 
}) 

export class CondidatureComponent implements OnInit {  
  offreId: number;

  modelesLettre: string[] = [
    "model1" ,
   " model 2 "
  ]; 
  levelForm: FormGroup;
  submitted = false;
  closeResult: string;

  @ViewChild('classic1') classic1: any;
  @ViewChild('classic2') classic2: any; 
con: Condidature[]; 

  public alerts: Array<IAlert> = [];

 
  condidatures: Condidature[]= []
  f: Condidature = new Condidature();
  c: Condidature[]; 
  user: User // Initialize user object
  offre: Offre //= { idOffre: 1 }; // Initialize offre object 
  coverLetter: string = 'coverLetter';
  showCondidaturesTable: boolean = false;
  showSuccessAlert: boolean = false; 
  showFailedsAlert: boolean = false; 
  showBadWordsAlert : boolean = false ;
  isEdit: boolean = false;
  editingCondidature: Condidature;
  lettreMotivation: string = '';
  currentUser:User;

  
  constructor(private route: ActivatedRoute,private condidatureService: CondidatureService,private authService:AuthService) { 
    
  
    this.coverLetter = this.coverLetter;  
    
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.offreId = +params['id'] ||0; // Utilisation de + pour convertir la chaîne en nombre
      // Maintenant, vous pouvez utiliser this.offreId dans votre composant pour accéder à l'ID de l'offre
    });

    console.log("opppppppllllll",this.offreId);

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
  onSelectModele(modele: string) {
    this.lettreMotivation = modele;
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
  toggleCondidaturesTable() 
    {
      this.showCondidaturesTable = !this.showCondidaturesTable;
    }
  
  containsBadWords(text: string): boolean {
    const badWordsList: string[] = ['badword1', 'badword2', 'badword3']; // Replace with your list of bad words
    const lowercasedText = text.toLowerCase();
    console.log('Lowercased text:', lowercasedText);
    console.log('Bad words list:', badWordsList);
    const containsBadWords = badWordsList.some(word => {
      console.log('Checking word:', word);
      return lowercasedText.includes(word);
    });
    console.log('Contains bad words:', containsBadWords);
    return containsBadWords;
  }

  OnSubmit(form: NgForm): void { 
    if (form.invalid) {
      console.error('Veuillez remplir tous les champs obligatoires.');
      this.openFailedAlert();  // Afficher l'alerte d'échec lorsque le formulaire est invalide
      return;
    }
    
    
  
    // Reset the alert status if the submission is successful
    
    this.showBadWordsAlert = false;
    // Set the CV file
    const cvFile: File = form.value.cv;
    if (cvFile) {
      this.f.user.cv = "cv";
    }

    
    // Set the coverLetter
    this.f.coverLetter = form.value.coverLetter;
    if (this.f.coverLetter && this.containsBadWords(this.f.coverLetter)) {
      console.error('Error: The review contains inappropriate language.'); // Bad words alert
      this.showBadWordsAlert = true;  // Show the alert
      return;
    }
    // Set the condidature state
    this.f.etatCondidature = EtatCondidature.Waitlisted;
    console.log("oppppppp",this.offreId);
    // Add the condidature to the condidature service
    this.condidatureService.addCondidature(this.f, this.offreId, this.currentUser.id).subscribe(
      response => {
        // Handle the response of the request, for example, log it to the console
        console.log('Condidature added successfully:', response);
        // Show success alert
        this.openSuccessAlert();
      }, 
      
      error => {
        // Handle errors in case the request fails
        console.error('Error adding condidature:', error); 
        this.openFailedAlert();
      }
    ); 
   
    // Reset the form after submission
    form.reset();
  }

  
  handleCVFileInput(event: any): void {
    const file = event.target.files[0];
    // You can perform additional actions with the selected file if needed
  }

  openSuccessAlert() {
    this.showSuccessAlert = true;
    setTimeout(() => { this.showSuccessAlert = false; }, 3000); // Fermer l'alerte après 3 secondes
  } 
  closeAlert() {
    this.showSuccessAlert = false;
  }
  openFailedAlert() {
    this.showFailedsAlert = true;
    setTimeout(() => { this.showFailedsAlert = false; }, 3000); // Fermer l'alerte après 3 secondes
  }

  closeFailedAlert() {
    this.showSuccessAlert = false;
  }

  deleteCondidature(idCondidature: number): void { 
    console.log( idCondidature);
    if (idCondidature === undefined || idCondidature === null) {
      console.error('Invalid condidature id:', idCondidature);
      return;
    }
    
    this.condidatureService.deleteCondidature(idCondidature).subscribe(
      () => {
        console.log('Condidature deleted successfully');
        // Rafraîchir la liste des condidatures après la suppression
        this.getAllCondidatures();
      },
      error => {
        console.error('Error deleting condidature:', error);
      }
    );
  } 
  editCondidature(condidature: Condidature): void {
    this.f = condidature;
    this.isEdit = true;
  }

  updateCondidature(condidature: Condidature): void {
    this.condidatureService.updateCondidature(condidature).subscribe(
      response => {
        console.log('Condidature updated successfully:', response);
        // Show success alert
        this.openSuccessAlert();
        // Rafraîchir la liste des condidatures après la mise à jour
        this.getAllCondidatures();
      },
      error => {
        console.error('Error updating condidature:', error);
      }
    );
  } 
 
}
