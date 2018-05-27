import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  submitted = false;
  loading = false;
  error = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onLoginSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    console.log('username', this.f.username.value);
    console.log('password', this.f.password.value);
    // DO LOGIN TASK
    this.auth.login(this.f.username.value, this.f.password.value).subscribe(
      data => {
        if(data.access_token) {
          this.auth.setToken(data.access_token);
          this.router.navigate(['/game/menu']);
        } else {
          alert(data.message);
        }
      },
      error => this.error = true,
      () => this.loading = false
    );
  }


}
