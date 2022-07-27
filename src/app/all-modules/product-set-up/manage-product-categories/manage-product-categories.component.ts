import {Component, HostListener, NgZone, OnInit} from '@angular/core';

@Component({
  selector: 'app-manage-product-categories',
  templateUrl: './manage-product-categories.component.html',
  styleUrls: ['./manage-product-categories.component.css']
})

@HostListener('window: resize', ['$event'])
export class ManageProductCategoriesComponent implements OnInit {

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

  deleteTicket() {

  }
}

