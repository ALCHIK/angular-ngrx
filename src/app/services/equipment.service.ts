import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Equipment } from '../models/equipment';

@Injectable()
export class EquipmentService {
    url = "http://localhost:3000/equipments";
    url_status = "http://localhost:3000/statuses";
        
    constructor(private http: HttpClient) { }

    getAllEquipments(): Observable<any> {
        let equipments =  this.http.get<Equipment[]>(this.url);
        let statuses =  this.http.get<Equipment[]>(this.url_status);
        return forkJoin([equipments, statuses]);
    }
    
    getEquipmentById(id: string): Observable<any> {
        let statusid = this.http.get<Equipment[]>(this.url_status + '?id=' + id)
        let art_id =  this.http.get<Equipment[]>(this.url + '?id=' + id)
        return forkJoin([art_id, statusid])
    }

    postEquipmentStatus(id: string, status: string): Observable<any>{
        return this.http.post(this.url_status, { "id": id, "status": status })
    }

    postEquipment(id: string, name: string, address: string, model: string, vendor: string): Observable<any>{
        return this.http.post(this.url, { "id": id, "name": name, "address": address, "model": model, "vendor": vendor })
    }

    delEquipment(id: string) {
        let equipment = this.http.delete(this.url+'/' + id);
        let status = this.http.delete(this.url_status+'/' + id);
        return forkJoin([equipment, status ]);
    }
}
