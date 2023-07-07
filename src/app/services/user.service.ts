import { Injectable } from '@angular/core';
import { IUser } from '../models/interfaces';
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) { }

  async getUserById(id: string): Promise<IUser> {
    const q = query(collection(this.firestore, "users"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    let myUser: IUser[] = querySnapshot.docs.map(doc => doc.data() as IUser);
    return myUser[0];
  }

  addUser(User: IUser) {
    const usersRef = collection(this.firestore, 'users');
    return addDoc(usersRef, User);
  }

  deleteUser(User: IUser) {
    const UserDocRef = doc(this.firestore, `users/${User.id}`);
    return deleteDoc(UserDocRef);
  }

  updateUser(User: IUser) {
    const UserDocRef = doc(this.firestore, `users/${User.id}`);
    return updateDoc(UserDocRef, {
      nom: User.nom,
      cognom: User.cognom,
      email: User.email,
      avatar: User.avatar,
      tokenPush: User.tokenPush
    });
  }

}
