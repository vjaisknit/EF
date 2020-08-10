import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExpheadsService } from '../../services/expheads.service';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-exp-heads',
  templateUrl: './exp-heads.component.html',
  styleUrls: ['./exp-heads.component.scss']
})
export class ExpHeadsComponent implements OnInit {
  masterForm : FormGroup;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'account_number', 'bank_name', 'status'];
  dataList;
  masterList;
  mstID;
  btnSave="Save";

  status = ['Active','InActive'];
  constructor(private activatedRoute: ActivatedRoute,private fb : FormBuilder, public http : HttpClientModule, private expheadsService : ExpheadsService) { }
  

  ngOnInit(): void {
    this.masterForm = this.fb.group({
      exp_head:[''],
      status:['']
    });
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
      this.expheadsService.getData().subscribe(data => {console.log(data);
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
      const frmData = {series_id:this.mstID, series: this.masterForm.controls.series.value,status: this.masterForm.controls.status.value };      
      this.expheadsService.updateData(frmData).subscribe(date => {
        //this.getData();
      });
      this.btnSave='Save';
      alert('updated...');    
      this.mstID=null;  
    }
    else
    {
      const frmData = {series: this.masterForm.controls.series.value,status: this.masterForm.controls.status.value };      
      this.expheadsService.saveData(frmData).subscribe(data => {
      //this.getData();
      });
      alert('added...');            
    } 
  }

  edit(mst_id){
    this.expheadsService.getDataByID(mst_id).subscribe(data =>  {
      this.mstID = mst_id;
      console.warn(data);
      this.btnSave='Update';
//      this.masterForm.patchValue(data);
      this.masterForm.patchValue({
        exp_head: data.exp_head,
        id: data.id,
        status: data.status
      });

    });
  }
  delete(id){
    if(confirm("Want to DELETE this record?")){
      this.expheadsService.deleteData(id).subscribe(data => {
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
