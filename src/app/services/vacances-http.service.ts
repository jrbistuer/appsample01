import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IVacanca } from '../models/interfaces';
import { HttpClient } from '@angular/common/http';
import { VacancaCollection } from '../models/vacanca';

@Injectable({
  providedIn: 'root'
})
export class VacancesHttpService {

  constructor(private httpClient: HttpClient) { }

  getVacances(): Observable<IVacanca[]> {
    return this.httpClient.get<IVacanca[]>('http://demo6402609.mockable.io/vacances').pipe(map((vacances: IVacanca[]) => {
      return new VacancaCollection(vacances);
    }));
  }

  // getVacancaById(id: string): Observable<IVacanca> {
  // }

  addVacanca(vacanca: IVacanca) {
  }

  deleteVacanca(vacanca: IVacanca) {
  }

  updateVacanca(vacanca: IVacanca) {
   //   nom: vacanca.nom,
     // preu: vacanca.preu,
  //    pais: vacanca.pais,
    //  descripcio: vacanca.descripcio,
      //user: vacanca.user
  }

}
