import { Equipment, EquipmentStatus } from '../models/equipment';
import { EntityState } from '@ngrx/entity';
export interface AppState {
	equipmentState: EquipmentState;
	statusState: StatusState

}

export interface EquipmentState extends EntityState<Equipment> {
	selectedEquipmentId: string | number | null,
	equipments: Equipment[]
}

export interface StatusState extends EntityState<EquipmentStatus> {
	selectedEquipmentId: string | number | null,
	equipments: Equipment[]
}