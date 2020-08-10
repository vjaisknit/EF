import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContractorsService {
  masterList;
  baseUrl = 'https://localhost:44302/api/ContractorMst/';

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get(this.baseUrl  + 'GetAllContractor');
  }

  saveData(itemSeries){
    console.warn(itemSeries);
    return this.http.post(this.baseUrl  + 'SaveContractor', itemSeries);
  }

  updateData(mstData){
    console.warn(mstData);
    return this.http.put(this.baseUrl  + 'UpdateContractor', mstData);
  }

  deleteData(id){
    return this.http.delete(this.baseUrl  + 'DeleteContractorbyId/' + id );
  }

  getDataByID(id): any{
    return this.http.get(this.baseUrl  + 'GetContractorbyId/' + id );
  }
}
