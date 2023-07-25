import { Injectable } from '@angular/core';
import { IUser } from '../models/interfaces';
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, limit, query, updateDoc, where } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore, private authService: AuthService) { }

  async getUser(): Promise<IUser> {
    console.log(this.authService.getUserId());
    const q = query(collection(this.firestore, "users"), where("id", "==", this.authService.getUserId()));
    const querySnapshot = await getDocs(q);
    let myUser: IUser[] = querySnapshot.docs.map(doc => doc.data() as IUser);
    return myUser[0];
  }

  addUser(user: IUser) {
    const usersRef = collection(this.firestore, 'users');
    return addDoc(usersRef, user);
  }

  deleteUser(user: IUser) {
    const UserDocRef = doc(this.firestore, `users/${user.id}`);
    return deleteDoc(UserDocRef);
  }

  async updateUser(user: IUser) {
    // const UserDocRef = doc(this.firestore, `users/${user.id}`);
    const q = query(collection(this.firestore, "users"), where("id", "==", this.authService.getUserId()), limit(1));
    const querySnapshot = await getDocs(q);
    const userDocRef = querySnapshot.docs.map(doc => doc);
    return updateDoc(userDocRef[0].ref, {
      nom: user.nom,
      cognom: user.cognom,
      email: user.email,
      avatar: user.avatar,
      tokenPush: user.tokenPush
    });
  }

}
