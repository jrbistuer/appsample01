import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVacanca } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class VacancesHttpService {

  constructor() { }

  getVacances(): Observable<IVacanca[]> {
  }

  getVacancaById(id: string): Observable<IVacanca> {
  }

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
