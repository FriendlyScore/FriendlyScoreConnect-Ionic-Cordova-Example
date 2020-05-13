import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {FriendlyScoreConnectPlugin} from '@ionic-native/friendly-score-connect-plugin/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private friendlyScoreConnectPlugin: FriendlyScoreConnectPlugin
  ) {
    this.initializeApp();
  }
  
  startfs(){
    this.friendlyScoreConnectPlugin.startFriendlyScoreConnect( "your_user_reference" ).then((fsevents) => {
      console.log("Finished");
      console.log(fsevents);
    })
    .catch((fserror) =>{
        console.log(fserror);
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
