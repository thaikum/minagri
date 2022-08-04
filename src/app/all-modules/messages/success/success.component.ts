import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  message: any;

  constructor(private _location: Location, private _router: Router) {
    this.message = this._router.getCurrentNavigation().extras.state.message;
  }

  ngOnInit(): void {
  }

  goBack() {
    this._location.back();
  }
}
