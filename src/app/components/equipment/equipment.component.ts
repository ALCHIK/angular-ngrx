import { Component, OnInit } from '@angular/core';    
import { 
	FormGroup, 
	FormBuilder, 
	FormArray, 
	FormControl } from '@angular/forms'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromReducer from '../../reducers/equipment.reducer';
import * as fromActions from '../../actions/equipment.actions';
import { EquipmentState } from '../../states/app.states';
import { Equipment, EquipmentStatus } from '../../models/equipment';

@Component({
	selector: 'app-equipment',
	templateUrl: 'equipment.component.html',
	styleUrls: ['equipment.component.css']
})
export class EquipmentComponent implements OnInit {
	allEquipments$: Observable<Equipment[]>;
	count$: Observable<number>;
	allIds$: Observable<string[] | number[]>;
	page= '';
	equipmentId: string;
	equipmentForm: FormGroup;
	deleteElem = [];
	statuses: string[] = ['normal', 'warning', 'error'];
	count: string | number;
	displayedColumns: string[] = ['id', 'name', 'status', 'actions'];

	constructor(
		   private formBuilder:FormBuilder,
		   private store: Store<EquipmentState>
		   ) {
	}
	ngOnInit() {
		this.page = 'all';
		this.count$ = this.store.select(fromReducer.equipmentsCount);
		this.allEquipments$ = this.store.select(fromReducer.selectAllEquipments);
		this.allIds$ = this.store.select(fromReducer.selectEquipmentIds);
		this.store.dispatch(new fromActions.LoadEquipments());
	}

	get equipmentsFormArray(): FormArray{
		return this.equipmentForm.get('equipmentsArray') as FormArray;
	}
	
	showForm() { 
		this.page = 'add';
		this.equipmentForm = this.formBuilder.group({
			equipmentsArray: this.formBuilder.array([]) 
		});

		this.allIds$.subscribe(res => {
			console.log(res)
			if (res.length) {
				this.count = Math.max.apply(null, res) + 1;
			}else {
				this.count = 1;
			}
			
		})
		let ag = this.formBuilder.group({
			id: new FormControl({ value: this.count, disabled: true }),
			name: '',
			address: '',
			vendor: '',
			model: '',
			status: ''
		});
		this.equipmentsFormArray.push(ag);
	}

	deleteEquipment() { 
		if (this.deleteElem.length == 1) {
            this.remove(this.deleteElem[0]);
		} else if (this.deleteElem.length > 1 ) {
			for(let ind of this.deleteElem) {
				this.remove(ind);
			}
		}
		this.deleteElem = [];
	}

	addEquipment() {
        if (this.equipmentsFormArray.length === 1) {
			let status = this.statuses[Math.floor(Math.random() * this.statuses.length)];
			this.equipmentsFormArray.at(0).value['status'] = status;
			this.equipmentsFormArray.at(0).value['id'] = this.count;
		   this.add(
			   this.equipmentsFormArray.at(0).value, 
			   {
				   id: this.equipmentsFormArray.at(0).value['id'], 
				   status: status
				});
		}

		this.page = 'all';
	}

	add(data: Equipment, status: EquipmentStatus) {
		this.store.dispatch(new fromActions.AddEquipment({ equipment: data }));
		this.store.dispatch(new fromActions.AddEquipmentStatus({ equipment_status: status}))
	}
		
	remove(equipmentId: string) {
		this.store.dispatch(new fromActions.RemoveEquipment({ id: equipmentId }));
	}
				
	showEquipments() {
		this.page = 'all';
		this.store.dispatch(new fromActions.LoadEquipments());
	}

	onSelectForDel($evn , id) {
		let transform = [];
		this.deleteElem.push(id);
		for(let el of  this.deleteElem) {
			(id == el ) ? ($evn.target.checked ? transform.push(el) : '') : transform.push(el);
		}

		this.deleteElem = transform;
	}

}	