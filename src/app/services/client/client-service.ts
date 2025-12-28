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

  getClientByUserId(reqUserId: number) : Observable<ClientRequest>{
    return this.http.get<ClientRequest>(`${this.API_URL}/getClient?reqUserId=${reqUserId}`, {withCredentials: true})
  }

  getClientByAuthentificatedUser() : Observable<ClientRequest>{
    return this.http.get<ClientRequest>(`${this.API_URL}/getClient`, {withCredentials: true})
  }

  updateClientByUserId(clientRequest: ClientRequest, reqUserId: number): Observable<ClientRequest> {
    return this.http.patch<ClientRequest>(`${this.API_URL}/updateClient?reqUserId=${reqUserId}`, clientRequest, {withCredentials: true})
  }

  updateClientByAuthentificatedUser(clientRequest: ClientRequest): Observable<ClientRequest> {
    return this.http.patch<ClientRequest>(`${this.API_URL}/updateClient`, clientRequest, {withCredentials: true})
  }

  editClientStatusByUserId(clientStatus: string, reqUserId: number): Observable<ClientRequest> {
    const data = {
      clientStatus: clientStatus
    }
    return this.http.patch<ClientRequest>(`${this.API_URL}/editClientStatus?reqUserId=${reqUserId}`, data, {withCredentials: true})
  }




}
