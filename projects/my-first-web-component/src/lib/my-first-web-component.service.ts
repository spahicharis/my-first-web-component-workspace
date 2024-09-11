import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class MyFirstWebComponentService {

  url = '/pokemon/charizard';

  constructor(
    private http: HttpClient
  ) {
  }

  getPikachu(rootUrl: string) {
    return this.http.get(rootUrl + this.url);
  }
}
