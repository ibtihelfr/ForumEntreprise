import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Offre } from 'src/app/core/models/Offre';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { OfferService } from 'src/app/core/services/offer.service';

export interface IAlert {
  id: number;
  type: string;
  strong?: string;
  message: string;
  icon?: string;
}

@Component({
  selector: 'app-entreprise-offers',
  templateUrl: './entreprise-offers.component.html',
  styleUrls: ['./entreprise-offers.component.css'],
  providers:[OfferService]
})
export class EntrepriseOffersComponent implements OnInit {
  public alerts: Array<IAlert> = [];
  closeResult: string;
  @ViewChild('offerModal') offerModal: any;
  o:Offre=new Offre();
  offers:Offre[]=[];
  currentUser:User;



  constructor(private offreService: OfferService ,private router: Router ,private modalService: NgbModal,private authService:AuthService) { }

  ngOnInit(): void {
/********Get the user connected*********/
this.authService.CurrentUser().subscribe(
  (user: User) => {
      this.currentUser = user;
      this.getOffersByUserId(this.currentUser.id);

      console.log('Utilisateur connecté : ', this.currentUser);
  },
  (error) => {
      console.error('Erreur lors de la récupération de l\'utilisateur : ', error);
  }
);
/***********************************/

  }


  ///////////// ADD OFFER /////////////
  onSubmitForm(): void {
    console.log(this.o);
    if (!this.o.idOffre) {
        this.offreService.addOffer(this.o, this.currentUser.id)
          .subscribe(response => {
            console.log('Offer saved successfully:', response);
            this.modalService.dismissAll(this.offerModal);
          }, error => {
            console.error('Error saving offer:', error);
          });
      
    } 
    else {
      this.offreService.updateOffre(this.o)
  .subscribe(response => {
    console.log('Offer updated successfully:', response);
    this.modalService.dismissAll(this.offerModal);
    }, error => {
    console.error('Error updating offer:', error);
  });
    }
  
   }
  
  openOfferModal() {
    this.modalService.open(this.offerModal);
  }
  ///////////// GET OFFERS /////////////
  getOffersByUserId(id: number): void {
    this.offreService.getOffersByUserId(id).subscribe(
      (data) => {
        this.offers = data;
      },
      (error) => {
        console.error('Error fetching offers by user ID:', error);
      }
    );
  }
  ///////////////////////////////////////
  getOfferTypeDisplayName(type: string): string {
    switch (type) {
      case 'STAGE_PFE':
        return 'Stage PFE';
      case 'STAGE_ETE':
        return 'Stage Été';
      case 'OFFRE_EMPLOI':
        return 'Offre d\'emploi';
      default:
        return type;
    }
  }
///////////// UPDATE OFFER /////////////

openUpdate(offreToUpdate: Offre) {
    this.o = offreToUpdate;
      this.openOfferModal();

 }


 ///////////// DELETE OFFER /////////////

 delete(id: number): void {
   this.offreService.deletOffre(id).subscribe(
     () => {
       console.log('Offer deleted successfully');
       // Fetch the updated list of offers after deletion
       this.offreService.getAllOffers().subscribe(
         offers => {
           // Update the offers list in the component
           this.offers = offers;
           // Add a success alert
           this.alerts.push({
             id: this.alerts.length + 1,
             type: 'success',
             strong: 'Success!',
             message: 'Offer deleted successfully',
             icon: 'ni ni-like-2'
           });
         },
         error => {
           console.error('Error refreshing offers:', error);
           // Add a warning alert
           this.alerts.push({
             id: this.alerts.length + 1,
             type: 'warning',
             strong: 'Warning!',
             message: 'Error refreshing offers: ' + error.message,
             icon: 'ni ni-bell-55'
           });
         }
       );
     },
     error => {
       console.error('Error deleting offer:', error);
       // Add a warning alert
       this.alerts.push({
         id: this.alerts.length + 1,
         type: 'warning',
         strong: 'Warning!',
         message: 'Error deleting offer: ' + error.message,
         icon: 'ni ni-bell-55'
       });
     }
   );
 }

/// ************ LOAD MORE & SHOW LESS **************** ////
displayedOffers: number = 3;

loadMoreOffers(): void {
  if (this.offers) {
    this.displayedOffers += 3;
  }
}
showLessOffers(): void {
  // Ensure the displayedOffers never go below 3
  if (this.offers) {
    // Ensure the displayedOffers never go below 3
    this.displayedOffers = Math.max(this.displayedOffers - 3, 3);
  }
}


}
