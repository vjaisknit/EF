import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RawmatService } from '../../services/rawmat.service';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: ['./raw-material.component.scss']
})
export class RawMaterialComponent implements OnInit {
  masterForm : FormGroup;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'account_number', 'bank_name', 'status'];
  dataList;
  masterList;
  mstID;
  btnSave="Save";

  status = ['Active','InActive'];
  constructor(private activatedRoute: ActivatedRoute,private fb : FormBuilder, public http : HttpClientModule, private Service : RawmatService) { }
  

  ngOnInit(): void {
    this.masterForm = this.fb.group({
      series_id:[''],
      item_desc:[''],
      unit:[''],      
      qty_per_unit:[''],            
      op_balance:[''],      
      as_on:[''],            
      status:['']
    });
     this.getData();
//     this.getMaster();    

  }

  // getMaster(){
  //   this.commonService.getData('banks').subscribe(data => {console.log(data);
  //     this.masterList = data;
  //   });
  // }

  getData()
  {
      this.Service.getData().subscribe(data => {console.log(data);
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
      const frmData = {id:this.mstID,
         series_id: this.masterForm.controls.series_id.value,
         item_desc: this.masterForm.controls.item_desc.value,
         unit: this.masterForm.controls.unit.value,
         qty_per_unit: this.masterForm.controls.qty_per_unit.value,
         op_balance: this.masterForm.controls.opening_balance.value,
         as_on: this.masterForm.controls.as_on.value,
         status: this.masterForm.controls.status.value };
      this.Service.updateData(frmData).subscribe(date => {
        this.getData();
      });
      this.btnSave='Save';
      alert('updated...');    
      this.mstID=null;  
    }
    else
    {
      const frmData = {series_id: this.masterForm.controls.series_id.value,
        item_desc: this.masterForm.controls.item_desc.value,
        unit: this.masterForm.controls.unit.value,
        qty_per_unit: this.masterForm.controls.qty_per_unit.value,
        op_balance: this.masterForm.controls.opening_balance.value,
        as_on: this.masterForm.controls.as_on.value,
        status: this.masterForm.controls.status.value };
      this.Service.saveData(frmData).subscribe(data => {
      this.getData();
      });
      alert('added...');            
    } 
  }

  edit(mst_id){
    this.Service.getDataByID(mst_id).subscribe(data =>  {
      this.mstID = mst_id;
      console.warn(data);
      this.btnSave='Update';
      this.masterForm.patchValue({
        series_id: data.series_id.toString(),
        item_description: data.item_description,
        unit: data.unit,        
        qty_per_unit: data.qty_per_unit,        
        opening_balance: data.opening_balance,       
        status: data.status
      });
    });
  }
  delete(id){
    if(confirm("Want to DELETE this record?")){
      this.Service.deleteData(id).subscribe(data => {
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
