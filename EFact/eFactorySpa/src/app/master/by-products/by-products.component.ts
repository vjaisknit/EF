import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SeriesService } from '../../services/series.service';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-by-products',
  templateUrl: './by-products.component.html',
  styleUrls: ['./by-products.component.scss']
})
export class ByProductsComponent implements OnInit {
  masterForm : FormGroup;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'account_number', 'bank_name', 'status'];
  dataList;
  masterList;
  mstID;today;
  btnSave="Save";

  status = ['Active','InActive'];
  constructor(private activatedRoute: ActivatedRoute,private fb : FormBuilder, public http : HttpClientModule, private seriesService : SeriesService) { }
  

  ngOnInit(): void {
    this.masterForm = this.fb.group({
      series_id:[''],      
      item_desc:[''],
      pcs_per_shot:[''],            
      wt_per_piece:[''],            
      making_rate:[''],            
      op_balance:[''],            
      as_on:[''],            
      current_balance:[''],            
      status:['']
    });
    this.today = new Date();
    //this.getData();
//    this.getMaster();    

  }

  // getMaster(){
  //   this.commonService.getData('banks').subscribe(data => {console.log(data);
  //     this.masterList = data;
  //   });
  // }

  getData()
  {
      this.seriesService.getData().subscribe(data => {console.log(data);
      this.dataList = data;
      this.dataSource = new MatTableDataSource(this.dataList);
      this.masterForm.reset();
    });
  }

  onSubmit()
  {
    console.warn(this.masterForm.value);
    if(this.mstID && this.mstID>0)
    {
      const frmData = {item_id:this.mstID, series_id: this.masterForm.controls.series_id.value,
        item_desc: this.masterForm.controls.item_desc.value,
        pcs_per_shot: this.masterForm.controls.pcs_per_shot.value,
        wt_per_piece: this.masterForm.controls.wt_per_piece.value,
        making_rate: this.masterForm.controls.making_rate.value,
        op_balance: this.masterForm.controls.op_balance.value,
        as_on: this.masterForm.controls.as_on.value,        
        current_balance: this.masterForm.controls.current_balance.value,
        status: this.masterForm.controls.status.value };      
      this.seriesService.updateData(frmData).subscribe(date => {
        //this.getData();
      });
      this.btnSave='Save';
      alert('updated...');    
      this.mstID=null;  
    }
    else
    {
      const frmData = {series_id: this.masterForm.controls.series_id.value,
        item_desc: this.masterForm.controls.item_desc.value,
        pcs_per_shot: this.masterForm.controls.pcs_per_shot.value,
        wt_per_piece: this.masterForm.controls.wt_per_piece.value,
        making_rate: this.masterForm.controls.making_rate.value,
        op_balance: this.masterForm.controls.op_balance.value,
        as_on: this.masterForm.controls.as_on.value,        
        current_balance: this.masterForm.controls.current_balance.value,
        status: this.masterForm.controls.status.value };      

      this.seriesService.saveData(frmData).subscribe(data => {
      //this.getData();
      });
      alert('added...');            
    } 
  }

  edit(mst_id){
    this.seriesService.getDataByID(mst_id).subscribe(data =>  {
      this.mstID = mst_id;
        this.masterForm.patchValue({
          series_id: data.series_id.toString(),
          item_desc: data.item_desc,
          pcs_per_shot: data.pcs_per_unit,
          wt_per_piece: data.wt_per_piece,          
          making_rate: data.making_rate,
          op_balance: data.op_balance,
          as_on: data.as_on,        
          current_balance: data.current_balance,
          status: data.status,
          });
          console.warn(data);
          this.btnSave='Update';
    });
  }
  delete(id){
    if(confirm("Want to DELETE this record?")){
      this.seriesService.deleteData(id).subscribe(data => {
      this.getData();
      });
    }
  }
  onClear(){
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
