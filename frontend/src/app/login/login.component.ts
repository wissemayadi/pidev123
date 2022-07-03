import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../service/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  formSubmitted: boolean = false;
  constructor(private router:Router,private s:AuthentificationService) { }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      
      password: new FormControl('', [Validators.required])
    });
  }
  login() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return alert("error");
    }
    this.s.loginUser(this.loginForm.value).subscribe((response: any) => {
        // set the token in the localStorage
        localStorage.setItem('token', response.token);
        // redirect to dashboard
        this.router.navigateByUrl('/profile');
      },
      (error: any)=>{
        console.log(error);

        if (error.status === 404) {
          // this.toasterService.pop('error', 'Veuillez vérifier votre e-mail ou votre mot de passe!', error.error.message);
        alert("cannot get!!")
        }
      });
  }

}
