import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipmentComponent } from './components/equipment/equipment.component';
import { EquipmentInformationComponent } from './components/equipment-information/equipment-information.component';

const routes: Routes = [
    {path: '', component: EquipmentComponent},
    {path: 'information/:id', component: EquipmentInformationComponent},
   //{path: '**', redirectTo: ''}
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {
      useHash: true,
  
    })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }