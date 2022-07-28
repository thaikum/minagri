import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WebStorage } from 'src/app/core/storage/web.storage';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public CustomControler;
  public subscription: Subscription;
  public Toggledata=true;
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private storage: WebStorage, private _authService: AuthService, private router: Router) {
    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      // tslint:disable-next-line:triple-equals
      if(data != 0){
        this.CustomControler = data;
      }
    });
  }

  ngOnInit() {
    this.storage.Checkuser();
  }

  submit() {
    console.log(this.form.value.username, this.form.value.password);
    if(this._authService.login(this.form.value.username, this.form.value.password)){
      this.router.navigate(['home'])
      // this.storage.Login(this.form.value);/
    };
    // this.storage.Login(this.form.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  iconLogle(){
    this.Toggledata = !this.Toggledata
  }
}
