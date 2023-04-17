import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private readonly serverUrl = 'http://localhost:3000';

  constructor(
    private httpClient: HttpClient,
  ) { }

  getCars(): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/cars`);
  }

  getCarInfo(id: number): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/cars/${id}`);
  }

  addCar(carInfo: any): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/cars`, carInfo);
  }

  updateCar(carInfo: any): Observable<any> {
    return this.httpClient.put(`${this.serverUrl}/cars/${carInfo.id}`, carInfo);
  }

  deleteCar(carId: number): Observable<any> {
    return this.httpClient.delete(`${this.serverUrl}/cars/${carId}`);
  }
}