import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  loading = false;
  error = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  get r() { return this.registerForm.controls; }

  onRegisterSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    console.log('username', this.r.username.value);
    console.log('password', this.r.password.value);
    console.log('password', this.r.confirmPassword.value);
    // DO register TASK
    this.auth.register(this.r.username.value, this.r.password.value).subscribe(
      data => {
        if(data.access_token) {
          this.auth.setToken(data.access_token);
          this.router.navigate(['/game/menu']);
        } else {
          alert(data.message);
        }
      },
      error => this.error = true
    );
  }
}
