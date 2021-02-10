import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { StatusState } from '../../states/app.states';
import { Equipment } from '../../models/equipment';
import * as fromActions from '../../actions/equipment.actions';
import * as fromReducer from '../../reducers/equipment.reducer';

@Component({
  selector: 'app-equipment-information',
  templateUrl: 'equipment-information.component.html'
})
export class EquipmentInformationComponent implements OnInit {

  private routeSubscription: Subscription;
  id: string;
  allEquipments$: Observable<Equipment[]>;
  displayedColumns: string[] = ['id', 'name', 'address', 'vendor', 'model', 'status'];

  constructor(
    private route: ActivatedRoute,
    private store: Store<StatusState>
  ) { 
    this.routeSubscription = route.params.subscribe(params=>this.id=params['id']);
  }

  ngOnInit() {
    this.allEquipments$ = this.store.select(fromReducer.selectCurrentEquipment);
    this.store.dispatch(new fromActions.SelectEquipment({ equipmentId: this.id.toString() }));
  }

}
