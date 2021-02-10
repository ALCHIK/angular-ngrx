import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from '../actions/equipment.actions';
import { EquipmentState } from '../states/app.states';
import * as fromAdapter from './equipment.adapter';

export const initialState: EquipmentState = fromAdapter.adapter.getInitialState({ 
                               selectedEquipmentId: null,
                               equipments: []
                         });
export function reducer(state = initialState, action: fromActions.EQUIPMENT_ACTIONS): EquipmentState {
  switch(action.type) {
    case fromActions.EquipmentActionTypes.ADD_EQUIPMENT: {
      return fromAdapter.adapter.addOne(action.payload.equipment, state);
    }
    case fromActions.EquipmentActionTypes.REMOVE_EQUIPMENT: {
      return fromAdapter.adapter.removeOne(action.payload.id, state);
    }
    case fromActions.EquipmentActionTypes.LOAD_ALL_EQUIPMENTS_SUCCESS: {
      return fromAdapter.adapter.addAll(action.payload.equipments, state);
    }
    case fromActions.EquipmentActionTypes.SELECT_EQUIPMENTS_SUCCESS: {
      return fromAdapter.adapter.addAll(action.payload.equipments, state);
    }  
    case fromActions.EquipmentActionTypes.SELECT_EQUIPMENT: {
      return {
        ...state,
        selectedEquipmentId: action.payload.equipmentId
      };
    }   
    default: {
      return state;
    }
  }	
}

export const getSelectedEquipmentId = (state: EquipmentState) => state.selectedEquipmentId;

export const getEquipmentState = createFeatureSelector<EquipmentState>('equipmentState');

export const selectEquipmentIds = createSelector(getEquipmentState, fromAdapter.selectEquipmentIds);
export const selectEquipmentEntities = createSelector(getEquipmentState, fromAdapter.selectEquipmentEntities);
export const selectAllEquipments = createSelector(getEquipmentState, fromAdapter.selectAllEquipments);
export const equipmentsCount = createSelector(getEquipmentState, fromAdapter.equipmentsCount);

export const selectCurrentEquipmentId = createSelector(getEquipmentState, getSelectedEquipmentId);

export const selectCurrentEquipment = createSelector(
  selectEquipmentEntities,
  selectCurrentEquipmentId,
  (equipmentEntities, equipmentId) => [equipmentEntities[equipmentId]]
);