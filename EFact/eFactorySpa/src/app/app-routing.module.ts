import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemSeriesComponent } from './master/item-series/item-series.component';
import { ExpHeadsComponent } from './master/exp-heads/exp-heads.component';
import { ByProductsComponent } from './master/by-products/by-products.component';
import { ItemsComponent } from './master/items/items.component';
import { PartiesComponent } from './master/parties/parties.component';
import { RawMaterialComponent } from './master/raw-material/raw-material.component';
import { ContractorsComponent } from './master/contractors/contractors.component';

const routes: Routes = [
  //                      {path : '', component: HomeComponent},
                          {path : 'item-series', component: ItemSeriesComponent},
                          {path : 'Exp-Heads', component: ExpHeadsComponent},
                          {path : 'Items-Final', component: ItemsComponent},
                          {path : 'By-Products', component: ByProductsComponent},
                          {path : 'Raw-Material', component: RawMaterialComponent},
                          {path : 'Parties', component: PartiesComponent},
                          {path : 'Contractors', component: ContractorsComponent},



                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
