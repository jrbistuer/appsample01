import { Injectable, inject } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { IUser, IUserPhoto } from '../models/interfaces';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: IUserPhoto[] = [];
  private PHOTO_STORAGE: string = 'photos';
  private platform: Platform;
  
  private storage: Storage = inject(Storage);
  user!: IUser;

  constructor(platform: Platform, private userService: UserService) {
    this.platform = platform;
    this.userService.getUser().then((user: IUser) => {
      this.user = user;
    });
  }

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    
    return this.savePicture(capturedPhoto);
  }
  
  // Save picture to file on device
  private async savePicture(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    // Write the file to the data directory
    const fileName = Date.now() + '.jpeg';

    return this.uploadImageToStorage(fileName, photo);
  }
  
  private async uploadImageToStorage(fileName: string, photo: Photo) {
    const storageRef = ref(this.storage, fileName);
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    const res = await uploadBytesResumable(storageRef, blob); 
    console.log(res);
    const storageUri = await getDownloadURL(storageRef);
    this.user.avatar = {
      storagePath: storageUri,
      storageBase64: ''
    }
    return this.setBase64Avatar(photo);
  }

  private async setBase64Avatar(photo: Photo) {
    const base64Avatar = await this.readAsBase64(photo);
    this.user.avatar.storageBase64 = base64Avatar;
    return this.setUserAvatars();
  }

  private async setUserAvatars() {
    return this.userService.updateUser(this.user);
  }

  private async readAsBase64(photo: Photo) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path!
      });
  
      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
  
      return await this.convertBlobToBase64(blob) as string;
    }
  }
  
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

}
