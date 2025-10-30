import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Pack {
  id: number;
  name: string;
  description: string;
  monthlyFee: number;
  supportLevel: string;
  maxTransactionsPerMonth: number;
  inassurance: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class PackService {

  constructor(private http: HttpClient){}

  private readonly API_URL = 'http://localhost:8082/api/packs';

  public loadPacks(): Observable<Pack[]> {
    return this.http.get<Pack[]>(`${this.API_URL}/getPacks`);
  }

}
