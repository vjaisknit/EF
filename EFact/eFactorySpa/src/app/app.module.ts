import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './common/header/header.component';
import { ItemSeriesComponent } from './master/item-series/item-series.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ItemsComponent } from './master/items/items.component';
import { ExpHeadsComponent } from './master/exp-heads/exp-heads.component';
import { ByProductsComponent } from './master/by-products/by-products.component';
import { ContractorsComponent } from './master/contractors/contractors.component';
import { PartiesComponent } from './master/parties/parties.component';
import { RawMaterialComponent } from './master/raw-material/raw-material.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemSeriesComponent,
    ItemsComponent,
    ExpHeadsComponent,
    ByProductsComponent,
    ContractorsComponent,
    PartiesComponent,
    RawMaterialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
