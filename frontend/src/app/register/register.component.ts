import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../service/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm !:FormGroup;
  formSubmitted: boolean = false;
  constructor(private router : Router,private s:AuthentificationService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required])
    });
  }
  register() {
    this.formSubmitted = true;
    if (this.signupForm.invalid) {
      return alert("nien");
    }
    this.s.registerUser(this.signupForm.value).subscribe((response: any) => {
       alert("register success")
        // redirect to dashboard
        this.router.navigateByUrl('/login');
      },
      (error: any)=>{
        console.log(error);

        if (error.status === 404) {
          alert('error')
        }
      });
  }
}
