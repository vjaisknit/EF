import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SeriesService } from '../../services/series.service';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-item-series',
  templateUrl: './item-series.component.html',
  styleUrls: ['./item-series.component.scss']
})
export class ItemSeriesComponent implements OnInit {
  masterForm: FormGroup;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'account_number', 'bank_name', 'status'];
  dataList;
  masterList;
  errors: string[];
  mstID;
  btnSave = 'Save';

  status = ['Active', 'InActive'];
  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder, public http: HttpClientModule,
              private seriesService: SeriesService) { }


  ngOnInit(): void {
    this.masterForm = this.fb.group({
      series: ['', [Validators.required]],
      status: ['0', [Validators.required]]
    });
    this.getData();

  }

  getData()
  {
      this.seriesService.getData().subscribe(data => {
        this.dataList = data;
        this.dataSource = new MatTableDataSource(this.dataList);
    });
  }

  onSubmit()
  {
    if (this.mstID && this.mstID > 0) {
      const frmData = { id: this.mstID,
                        Description: this.masterForm.controls.series.value,
                        status: this.masterForm.controls.status.value };
      this.seriesService.updateData(frmData).subscribe(date => {
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
      const frmData = {id: 0 , Description: this.masterForm.controls.series.value,
                      status: this.masterForm.controls.status.value };
      this.seriesService.saveData(frmData).subscribe(data => {
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

  edit(mstid){
    this.seriesService.getDataByID(mstid).subscribe(data =>  {
      this.mstID = data.id;
      this.btnSave = 'Update';
      this.masterForm.patchValue({
        series: data.description,
        status: data.status
      });

    });
  }
  delete(id){
    if ( confirm('Want to DELETE this record?') ){
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
