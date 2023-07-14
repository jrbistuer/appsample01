import { Component } from '@angular/core';
import { PushService } from 'src/app/services/push.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private pushService: PushService) {
    console.log('test');
    this.pushService.initPushLogic();
  }

}
