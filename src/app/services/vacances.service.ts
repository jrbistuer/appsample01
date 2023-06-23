import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IVacanca } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class VacancesService {

  constructor(private firestore: Firestore) { }

  getVacances(): Observable<IVacanca[]> {
    const vacancesRef = collection(this.firestore, 'vacances');
    return collectionData(vacancesRef, { idField: 'id'}) as Observable<IVacanca[]>;
  }

  getVacancaById(id: string): Observable<IVacanca> {
    const VacancaDocRef = doc(this.firestore, `vacances/${id}`);
    return docData(VacancaDocRef, { idField: 'id' }) as Observable<IVacanca>;
  }

  addVacanca(vacanca: IVacanca) {
    const vacancesRef = collection(this.firestore, 'vacances');
    return addDoc(vacancesRef, vacanca);
  }

  deleteVacanca(vacanca: IVacanca) {
    const vacancaDocRef = doc(this.firestore, `vacances/${vacanca.id}`);
    return deleteDoc(vacancaDocRef);
  }

  updateVacanca(vacanca: IVacanca) {
    const vacancaDocRef = doc(this.firestore, `vacances/${vacanca.id}`);
    return updateDoc(vacancaDocRef, {
      nom: vacanca.nom,
      preu: vacanca.preu,
      pais: vacanca.pais,
      descripcio: vacanca.descripcio,
      user: vacanca.user
    });
  }
}
