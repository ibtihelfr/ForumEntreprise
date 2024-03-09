import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../core/services/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-signup-client',
  templateUrl: './signup-client.component.html',
  styleUrls: ['./signup-client.component.css']
})
export class SignupClientComponent  {

  test: Date = new Date();
  focus;
  focus1;
  focus2;

  validateForm !: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService

      , private router: Router, private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      firstName: [null, [ Validators.required]],
      lastName: [null, [Validators.required]],

      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      cin: [null, [Validators.required]],
      cv: [null, [Validators.required]],

      email: [null, [Validators.email,Validators.required]],
    });

  }passwordMismatch(): boolean {
    return this.validateForm.get('password')?.value !== this.validateForm.get('confirmPassword')?.value;
  }
  submitForm() {
    console.log("aaaaaaa1",this.validateForm.value);
    if(this.validateForm.valid && !this.passwordMismatch()) {

      console.log('Form Submitted!');


      this.authService.signupClient(this.validateForm.value).subscribe(
          res => {
            console.log('User Added Successfully');
            Swal.fire({
              customClass: { popup: 'animated tada' },
              animation: false,

              icon: 'success',
              title: 'Gongratulations!Your Registration has been saved',
              showConfirmButton: false,


            });
            // Redirection après 3 secondes
            setTimeout(() => {
              this.router.navigate(['/front/landing']);
            }, 3000);





          }, error => {
            console.log('Error Adding User',error);




          });
    }
  }


}
