import {Component, HostListener, NgZone, OnInit} from '@angular/core';

@Component({
  selector: 'app-manage-subsidy',
  templateUrl: './manage-subsidy.component.html',
  styleUrls: ['./manage-subsidy.component.css']
})

@HostListener('window: resize', ['$event'])
export class ManageSubsidyComponent implements OnInit {

  public innerHeight: any;
  addSubsidyForm: any;
  editSubsidyForm: any;

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

  addSubsidy() {

  }

  editSubsidy() {

  }

  deleteSubsidy() {

  }

  from($event: any) {

  }
}
