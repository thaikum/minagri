import {Injectable, NgModule} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';


// loin headers
export const loginHeaders = new HttpHeaders()
  .set('Accept', '*/*')
  .set('Content-Type', 'application/x-www-form-urlencoded')
  .set('Authorization', 'Basic ' + btoa('minagri_clientid_703:secret'))


export const headers = new HttpHeaders()
  .set('Accept', '*/*')
  .set('Content-Type', 'application/json')
  .set('Authorization', 'Bearer ' + getAuthToken())


export const withFileHeaders = new HttpHeaders()
  .set('Accept', '*/*')
  .set('Content-Type', 'multipart/form-data')
  .set('Authorization', 'Bearer ' + getAuthToken())

function getAuthToken(): string{
  return JSON.parse(localStorage.getItem('userData'))?.accessToken || '';
}

