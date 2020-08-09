import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemSeriesComponent } from './master/item-series/item-series.component';



const routes: Routes = [
  //                      {path : '', component: HomeComponent},
                          {path : 'item-series', component: ItemSeriesComponent},

                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
