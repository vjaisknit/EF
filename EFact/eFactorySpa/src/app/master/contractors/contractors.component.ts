import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContractorsService } from '../../services/contractors.service';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.scss']
})
export class ContractorsComponent implements OnInit {
  masterForm: FormGroup;
  errors: string[];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'account_number', 'bank_name', 'status'];
  dataList;
  masterList;
  mstID;
  today;
  btnSave = 'Save';

  status = ['Active', 'InActive'];
  constructor( private activatedRoute: ActivatedRoute,
               private fb: FormBuilder,
               public http: HttpClientModule,
               private Service: ContractorsService) { }

  ngOnInit(): void {
    this.masterForm = this.fb.group({
      cont_name: ['', [Validators.required]],
      mobile_no: ['', [Validators.required]],
      email_id: ['', [Validators.required]],
      status: ['0', [Validators.required]]
    });
    this.getData();
  }

  formInvalid() {
    if (this.masterForm.get('email_id').hasError('required')
    || this.masterForm.get('mobile_no').hasError('required')){
      return true;
    }
  }

  getData()
  {
      this.Service.getData().subscribe(data => {
        this.dataList = data;
        this.dataSource = new MatTableDataSource(this.dataList);
    });
  }

  onSubmit()
  {

    if (this.mstID && this.mstID > 0)
    {
        const frmData = {id: this.mstID,
          ContractorName: this.masterForm.controls.cont_name.value,
          MobileNumber: this.masterForm.controls.mobile_no.value,
          Email: this.masterForm.controls.email_id.value,
          status: this.masterForm.controls.status.value
          };

        this.Service.updateData(frmData).subscribe(date => {
          this.getData();
          this.masterForm.reset();
          this.btnSave = 'Save';
          alert('updated...');
          this.mstID = null;
      },
      err => {
        this.errors = err.error.errors;
        console.log(err);
      });

    }
    else
    {
      const frmData = {id: 0,
        ContractorName: this.masterForm.controls.cont_name.value,
        MobileNumber: this.masterForm.controls.mobile_no.value,
        Email: this.masterForm.controls.email_id.value,
        status: this.masterForm.controls.status.value };
      this.Service.saveData(frmData).subscribe(data => {
        alert('added...');
        this.masterForm.reset();
        this.getData();
        },
        err => {
          this.errors = err.error.errors;
          console.log(err);
        });

    }
  }

  edit(id){
    this.Service.getDataByID(id).subscribe(data =>  {
      this.mstID = id;
      this.btnSave = 'Update';
      console.warn(data);
      this.masterForm.patchValue({
        cont_name: data.contractorName,
        mobile_no: data.mobileNumber,
        email_id: data.email,
        status: data.status
      });
    });
   
  }

  delete(id){
    if ( confirm('Want to DELETE this record?')){
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
