import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface ClientRequest{
  firstname: string,
  lastName: string,
  phone: string,
  birthDate: string,
  email: string,
  userId: number,
  addressRequest: AddressRequest
}

export interface AddressRequest {
  street: string,
  country: string;
  city: string;
  postalCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private readonly API_URL = 'http://localhost:8083/api/clients';
  constructor(private http: HttpClient){}


  createClient(clientRequest: ClientRequest): Observable<ClientRequest> {
    return this.http.post<ClientRequest>(`${this.API_URL}/createClient`, clientRequest, {withCredentials: true})
  }

}
