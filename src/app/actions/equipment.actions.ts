import { Action } from '@ngrx/store';
import { Equipment, EquipmentStatus } from '../models/equipment';

export enum EquipmentActionTypes {
  ADD_EQUIPMENT = '[EQUIPMENT] ADD EQUIPMENT',
  ADD_EQUIPMENTS = '[EQUIPMENT] ADD EQUIPMENTS',
  ADD_EQUIPMENT_SUCCESS = '[EQUIPMENT] ADD EQUIPMENT SUCCESS',
  ADD_EQUIPMENT_STATUS = '[EQUIPMENT] ADD EQUIPMENT STATUS',
  ADD_EQUIPMENT_STATUS_SUCCESS = '[EQUIPMENT] ADD EQUIPMENT STATUS SUCCESS',
  REMOVE_EQUIPMENT = '[EQUIPMENT] REMOVE EQUIPMENT',
  REMOVE_EQUIPMENTS = '[EQUIPMENT] REMOVE EQUIPMENTS',
  REMOVE_EQUIPMENT_SUCCESS = '[EQUIPMENT] REMOVE EQUIPMENT SUCCESS',
  REMOVE_EQUIPMENTS_SUCCESS = '[EQUIPMENT] REMOVE EQUIPMENTS SUCCESS',
  LOAD_ALL_EQUIPMENTS = '[EQUIPMENT] LOAD EQUIPMENTS',
  LOAD_ALL_EQUIPMENTS_SUCCESS = '[EQUIPMENT] LOAD EQUIPMENTS SUCCESS',
  SELECT_EQUIPMENT = '[EQUIPMENT] GET EQUIPMENT BY ID',
  SELECT_EQUIPMENTS_SUCCESS = '[EQUIPMENT] GET EQUIPMENT BY ID SUCCESS'
}

export class AddEquipment implements Action { 
  readonly type = EquipmentActionTypes.ADD_EQUIPMENT;
  constructor(public payload: { equipment: Equipment }) {}
}
export class AddEquipments implements Action {
  readonly type = EquipmentActionTypes.ADD_EQUIPMENTS;
  constructor(public payload: { equipments: Equipment[] }) {}
}
export class AddEquipmentSuccess implements Action {
  readonly type = EquipmentActionTypes.ADD_EQUIPMENT_SUCCESS;
  constructor(public payload: { equipment: Equipment }) {}
}
export class AddEquipmentStatus implements Action { 
  readonly type = EquipmentActionTypes.ADD_EQUIPMENT_STATUS;
  constructor(public payload: { equipment_status: EquipmentStatus }) {}
}

export class AddEquipmentStatusSuccess implements Action {
  readonly type = EquipmentActionTypes.ADD_EQUIPMENT_STATUS_SUCCESS;
  constructor(public payload: { equipment_status: EquipmentStatus }) {}
}

export class RemoveEquipment implements Action {
  readonly type = EquipmentActionTypes.REMOVE_EQUIPMENT;
  constructor(public payload: { id: string }) {}
}

export class RemoveEquipmentSuccess implements Action {
  readonly type = EquipmentActionTypes.REMOVE_EQUIPMENT_SUCCESS;
  constructor(public payload: { id: string }) {}
}
export class RemoveEquipments implements Action {
  readonly type = EquipmentActionTypes.REMOVE_EQUIPMENTS;
  constructor(public payload: { ids: string[] }) {}
}
export class RemoveEquipmentsSuccess implements Action {
  readonly type = EquipmentActionTypes.REMOVE_EQUIPMENTS_SUCCESS;
  constructor(public payload: { ids: string[] }) {}
}

export class LoadEquipments implements Action {
  readonly type = EquipmentActionTypes.LOAD_ALL_EQUIPMENTS;
}
export class LoadEquipmentsSuccess implements Action {
  readonly type = EquipmentActionTypes.LOAD_ALL_EQUIPMENTS_SUCCESS;
  constructor(public payload: { equipments: Equipment[] }) {}
}
export class SelectEquipment implements Action {
  readonly type = EquipmentActionTypes.SELECT_EQUIPMENT;
  constructor(public payload: { equipmentId: string }) {}
}
export class SelectEquipmentSuccess implements Action {
  readonly type = EquipmentActionTypes.SELECT_EQUIPMENTS_SUCCESS;
  constructor(public payload: { equipments: Equipment[] }) {}
}
export type EQUIPMENT_ACTIONS = AddEquipment | AddEquipments 
                            | AddEquipmentStatus| RemoveEquipment
                            | RemoveEquipmentSuccess | RemoveEquipmentsSuccess
                            | RemoveEquipments | LoadEquipmentsSuccess
                            | SelectEquipment | SelectEquipmentSuccess 
                            | AddEquipmentStatusSuccess | AddEquipmentSuccess;