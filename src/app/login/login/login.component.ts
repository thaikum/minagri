import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WebStorage } from 'src/app/core/storage/web.storage';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public CustomControler;
  public subscription: Subscription;
  public Toggledata = true;
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  loginError = '';
  isLoading = false;

  get f() {
    return this.form.controls;
  }

  constructor(
    private storage: WebStorage,
    private _authService: AuthService,
    private router: Router
  ) {
    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      // tslint:disable-next-line:triple-equals
      if (data != 0) {
        this.CustomControler = data;
      }
    });
  }

  ngOnInit() {
    this.storage.Checkuser();
  }

  submit() {
    this.isLoading = true;
    this.loginError = '';

    this._authService
      .login(this.form.value.username, this.form.value.password)
      .subscribe(
        (dt) => {
          if (!!dt) {
            console.log(dt);

            console.log(dt);

            sessionStorage.setItem('accessToken', dt.access_token);

            localStorage.removeItem('userData');
            localStorage.setItem(
              'userName',
              JSON.stringify(this.form.value.username)
            );

            const expDate = +new Date() + dt.expires_in * 1000000;

            localStorage.setItem('expTime', expDate.toString());

            this.router
              .navigate(['layout'])
              .then(() => {
                console.log('hello world');
              })
              .then(() => (this.isLoading = false));
          }
        },
        () => {
          this.loginError = 'Invalid credentials';
          this.isLoading = false;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }
}
