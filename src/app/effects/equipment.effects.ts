import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, mergeMap } from 'rxjs/operators';

import * as fromActions from '../actions/equipment.actions';
import { EquipmentService } from '../services/equipment.service';

@Injectable()
export class EquipmentEffects {

  constructor(
    private actions$: Actions,
    private equipmentService: EquipmentService
  ) {}      

  @Effect() 
  loadAllEquipments$ = this.actions$.pipe(
    ofType(fromActions.EquipmentActionTypes.LOAD_ALL_EQUIPMENTS),
    switchMap(() => 
      this.equipmentService.getAllEquipments()
      .pipe(
        map(data => {
          let res_equip = data[0];
          let res_status = data[1];
          res_equip.map(equipment => {
            let status = res_status.find(ind => ind.id == equipment.id);
            equipment['status'] = status ? status.status : 'not available';
          })
          return new fromActions.LoadEquipmentsSuccess({ equipments: res_equip });
        }) 
      )
    )
  )

  @Effect() 
  searchEquipmentById$ = this.actions$.pipe(
    ofType<fromActions.SelectEquipment>(fromActions.EquipmentActionTypes.SELECT_EQUIPMENT),
    switchMap(equipment => 
      this.equipmentService.getEquipmentById(equipment.payload.equipmentId).pipe(
        map(data => {
          let res_equip = data[0];
          let res_status = data[1];
          res_equip[0]['status'] = res_status[0] ? res_status[0].status : 'not available';
          return new fromActions.SelectEquipmentSuccess({ equipments: res_equip  })
        })
      ) 
   )
  )  
  
  @Effect()
  postEquipmentStatus = this.actions$.pipe(
    ofType<fromActions.AddEquipmentStatus>(fromActions.EquipmentActionTypes.ADD_EQUIPMENT_STATUS),
    switchMap(equipment => 
      this.equipmentService.postEquipmentStatus(
        equipment.payload.equipment_status.id , 
        equipment.payload.equipment_status.status)
        .pipe(
          map(data =>{
            return new fromActions.AddEquipmentStatusSuccess({ equipment_status: data  })
          })
        )
      )
    )

  @Effect()
  postEquipment = this.actions$.pipe(
    ofType<fromActions.AddEquipment>(fromActions.EquipmentActionTypes.ADD_EQUIPMENT),
    switchMap(equipment => 
      this.equipmentService.postEquipment(
        equipment.payload.equipment.id , 
        equipment.payload.equipment.name, 
        equipment.payload.equipment.address, 
        equipment.payload.equipment.model, 
        equipment.payload.equipment.vendor)
        .pipe(
          map(data =>{
            return new fromActions.AddEquipmentSuccess({ equipment: data  })
          })
        )
      )
    )

  @Effect()
  delEquipment = this.actions$.pipe(
    ofType<fromActions.RemoveEquipment>(fromActions.EquipmentActionTypes.REMOVE_EQUIPMENT),
    mergeMap(equipment => 
      this.equipmentService.delEquipment(equipment.payload.id).pipe(
        map(data =>{
          return new fromActions.RemoveEquipmentSuccess({ id: equipment.payload.id})
        })
      )
    )
  )
}