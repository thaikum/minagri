import {Component, NgZone, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-set-up',
  templateUrl: './product-set-up.component.html',
  styleUrls: ['./product-set-up.component.css']
})
export class ProductSetUpComponent implements OnInit {

  public innerHeight: any;
  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }

  constructor(private ngZone: NgZone) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + 'px';
      });
    };
    this.getScreenHeight();
  }

  ngOnInit() {
  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
  }

}
