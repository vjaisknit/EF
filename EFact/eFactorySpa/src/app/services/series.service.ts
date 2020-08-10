import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  masterList;

  baseUrl = 'https://localhost:44302/api/ItemSeriesMst/';

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get(this.baseUrl  + 'GetAllItemSeries');
  }

  saveData(itemSeries){
    console.warn(itemSeries);
    return this.http.post(this.baseUrl  + 'SaveItemSeries', itemSeries);
  }

  updateData(mstData){
    console.warn(mstData);
    return this.http.put(this.baseUrl  + 'UpdateItemSeries', mstData);
  }

  deleteData(id){
    return this.http.delete(this.baseUrl  + 'DeleteItemSeriesById/' + id );
  }

  getDataByID(id): any{
    return this.http.get(this.baseUrl  + 'GetItemSeriesById/' + id );
  }
}
