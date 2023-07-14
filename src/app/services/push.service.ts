import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor() { }

  initPushLogic() {
    this.addListeners();
    this.registerNotifications();
    this.getDeliveredNotifications();
  }

  async addListeners() {
    await PushNotifications.addListener('registration', token => {
      console.info('PUSH SERVICE Registration token: ', token.value);
    });
  
    await PushNotifications.addListener('registrationError', err => {
      console.error('PUSH SERVICE Registration error: ', err.error);
    });
  
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('PUSH SERVICE Push notification received: ', notification);
    });
  
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('PUSH SERVICE Push notification action performed', notification.actionId, notification.inputValue);
    });
  }
  
  async registerNotifications() {
    let permStatus = await PushNotifications.checkPermissions();
  
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
  
    if (permStatus.receive !== 'granted') {
      throw new Error('PUSH SERVICE User denied permissions!');
    }
  
    await PushNotifications.register();
  }
  
  async getDeliveredNotifications() {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('PUSH SERVICE delivered notifications', notificationList);
  }

}
