import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PartiesService } from '../../services/parties.service';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.scss']
})
export class PartiesComponent implements OnInit {
  masterForm : FormGroup;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'account_number', 'bank_name', 'status'];
  dataList;
  masterList;
  mstID;today;
  btnSave="Save";

  status = ['Active','InActive'];
  constructor(private activatedRoute: ActivatedRoute,private fb : FormBuilder, public http : HttpClientModule, private Service : PartiesService) { }
  

  ngOnInit(): void {
    this.masterForm = this.fb.group({
      party_name:[''],   
      address:[''],   
      city:[''],
      state:[''],            
      mobile_no:[''],            
      email_id:[''],            
      party_type:[''],            
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
      const frmData = {party_id:this.mstID, 
        party_name: this.masterForm.controls.party_name.value,
        city: this.masterForm.controls.city.value,
        state: this.masterForm.controls.state.value,
        mobile_no: this.masterForm.controls.mobile_no.value,
        email_id: this.masterForm.controls.email_id.value,
        party_type: this.masterForm.controls.party_type.value,        
        status: this.masterForm.controls.status.value };      
      this.Service.updateData(frmData).subscribe(date => {
        //this.getData();
      });
      this.btnSave='Save';
      alert('updated...');    
      this.mstID=null;  
    }
    else
    {
        const frmData = {party_name: this.masterForm.controls.party_name.value,
          city: this.masterForm.controls.city.value,
          state: this.masterForm.controls.state.value,
          mobile_no: this.masterForm.controls.mobile_no.value,
          email_id: this.masterForm.controls.email_id.value,
          party_type: this.masterForm.controls.party_type.value,        
          status: this.masterForm.controls.status.value };      
  
      this.Service.saveData(frmData).subscribe(data => {
      //this.getData();
      });
      alert('added...');            
    } 
  }

  edit(mst_id){
    this.Service.getDataByID(mst_id).subscribe(data =>  {
      this.mstID = mst_id;
      console.warn(data);
      this.btnSave='Update';
      this.masterForm.patchValue(data);
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
