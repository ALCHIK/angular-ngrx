import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Equipment } from '../models/equipment';

export function sortById(equipment1: Equipment, equipment2: Equipment): number {
   return (Number(equipment1.id) < Number(equipment2.id)) ?  0 : 1
}
  
export const adapter: EntityAdapter<Equipment> = createEntityAdapter<any>({
   sortComparer: sortById
});
  
export const {
   selectIds: selectEquipmentIds,
   selectEntities: selectEquipmentEntities,
   selectAll: selectAllEquipments,
   selectTotal: equipmentsCount
} = adapter.getSelectors();