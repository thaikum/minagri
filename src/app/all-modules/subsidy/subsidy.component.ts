import {Component, HostListener, NgZone, OnInit} from '@angular/core';

@HostListener('window: resize', ['$event'])
@Component({
  selector: 'app-subsidy',
  templateUrl: './subsidy.component.html',
  styleUrls: ['./subsidy.component.css']
})
@HostListener('window: resize', ['$event'])
export class SubsidyComponent implements OnInit {

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
