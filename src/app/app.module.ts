import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button'; 
import { MatInputModule } from '@angular/material/input';

import { AppComponent }  from './app.component';
import { EquipmentComponent }  from './components/equipment/equipment.component';
import { reducers, metaReducers } from './reducers';
import { EquipmentEffects } from './effects/equipment.effects';
import { EquipmentService } from './services/equipment.service';
import { EquipmentInformationComponent } from './components/equipment-information/equipment-information.component';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  imports: [     
      BrowserModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      FormsModule,
      MatTableModule,
      MatInputModule,
      MatButtonModule,
      HttpClientModule,
      StoreModule.forRoot(reducers, {metaReducers}),
      EffectsModule.forRoot([EquipmentEffects]),
      RouterModule,
      AppRoutingModule,
      MatToolbarModule
  ],
  exports: [AppRoutingModule],
  declarations: [
      AppComponent,
	  EquipmentComponent,
	  EquipmentInformationComponent,
  ],
  providers: [
      EquipmentService
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
