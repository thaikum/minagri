import {Component, HostListener, NgZone, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {SubsidyService} from "../subsidy.service";
import {NgForm} from "@angular/forms";

interface Subsidy {

}

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

  constructor(private ngZone: NgZone,http: HttpClient, public sb: SubsidyService,) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + 'px';
      });
    };
    this.getScreenHeight();
  }

  ngOnInit() {
    //subsidies
    this.getData();
  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
  }

  editSubsidy() {

  }

  deleteSubsidy() {

  }

  from($event: any) {

  }


//  Endpoints
//  1. get all Subsidies
  public getData(): void{
    this.sb.getSubsidy('').subscribe((response:any) => {
      console.log(response)
    })
  }

//  2. Add susbsidy
  public onAddSubsidy(addForm: NgForm): void {
    this.sb.addSubsidy('',addForm.value).subscribe(
      (response:Subsidy) => {
        console.log(response);
        this.getData();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }
}
