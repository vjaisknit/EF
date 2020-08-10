import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ByproductsService {
  masterList;

  apiURL = 'https://localhost:44302/series/';
  constructor(private http : HttpClient) { }
  getData(){
    return this.http.get(this.apiURL);
  }

  saveData(mstData){
    console.warn(mstData);
    return this.http.post(this.apiURL,mstData);
  }

  updateData(mstData){
    return this.http.put(this.apiURL, mstData);
  }

  deleteData(id){
    return this.http.delete(this.apiURL+id);    
  }

  getDataByID(id): any{
    return this.http.get(this.apiURL+ id);
  }
}
