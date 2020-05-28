# Ionic Corodova Implementation

## Overview

Here you can find instructions on how to integrate and use FriendlyScore Connect for Ionic.

To get started quickly with FriendlyScore Connect for Ionic, clone the [GitHub repository](https://github.com/FriendlyScore/FriendlyScoreConnect-Ionic-Cordova-Example) and run the example. You need to [sign-up](https://friendlyscore.com/getting-started) for the free API keys through our Developer Console.

## Requirements
- [FriendlyScore API keys](https://friendlyscore.com/company/keys)
### Ionic
- Ionic CLI(demo uses version 6.7.0)            
- Ionic Framework(demo uses @ionic/angular 5.1.0)
- Cordova
### Android
- Install or update Android Studio version 3.2 or greater
- Android 5.0 and greater
### iOS
- XCode 10
- iOS 12.0


## Quickstart Demo App

Clone and run the demo project from our [GitHub repository](https://github.com/FriendlyScore/FriendlyScoreConnect-Ionic-Cordova-Example). 

## Implementation 

First we will create the `Plugin` as a separate `android` library which we will then add to the App to enable interaction between the UI component and Native Android/iOS code.

In order to create the `Plugin` for Corodova we will use `plugman`,

```bash

    mkdir my_app_plugins

    cd my_app_plugins
```

Clone the repository [FriendlyScoreConnectPlugin](https://github.com/FriendlyScore/FriendlyScoreConnectPlugin) inside `my_app_plugins` directory

```bash
    git clone https://github.com/FriendlyScore/FriendlyScoreConnectPlugin

    cd FriendlyScoreConnectPlugin
```
Inside the `FriendlyScoreConnectPlugin` folder, the important files/dirs are

`my_app_plugins/FriendlyScoreConnectPlugin/package.json`

`my_app_plugins/FriendlyScoreConnectPlugin/plugin.xml`

The `Plugin Id` is listed in the `package.json` file. It will be used later.

In the `plugin.xml` file the check the file paths if they are correct(They are relative, should be correct). For Android, ook for the line

```xml
<source-file 
src="src/android/app/src/main/java/com/friendlyscore/connect/cordova/plugin/FriendlyScoreConnectPlugin.java" 
target-dir="src/android/app/src/main/java/com/friendlyscore/connect/cordova/plugin/FriendlyScoreConnectPlugin" />
```

iOS:
```xml
<header-file src="src/ios/FriendlyScoreConnectPlugin.h" />
<source-file src="src/ios/FriendlyScoreConnectPlugin.m" />
<source-file src="src/ios/FriendlyScoreSDK.framework" framework="true" />
```

The file `src/www/FriendlyScoreConnectPlugin.js` exports the `Plugin` for use in the app.

Change the `client_id` variable to your `client_id` obtained from FriendlyScore earlier. For Android: [FriendlyScoreConnectPlugin.java](https://github.com/FriendlyScore/FriendlyScoreConnectPlugin/src/android/app/src/main/java/com/friendlyscore/connect/cordova/plugin/FriendlyScoreConnectPlugin.java), iOS:[FriendlyScoreConnectPlugin.m](https://github.com/FriendlyScore/FriendlyScoreConnect-Ionic-Cordova-Example/blob/master/platforms/ios/fs_connect_cordova/Plugins/com.friendlyscore.connect.cordova.plugin/FriendlyScoreConnectPlugin.m)

Your `Plugin` should be ready.

### Ionic Wrapper for the Plugin

In order to use the `Plugin` easily we must integrate the plugin with the Ionic Framework. In order to do this we will use `gulp`

    1. git clone https://github.com/ionic-team/ionic-native
    2. cd ionic-native 
    3. npm install -g gulp 
    4. npm install 
    5. gulp plugin:create -n FriendlyScoreConnectPlugin

The above steps will create a plugin in `ionic-native/src/@ionic-native/plugins/friendly-score-connect-plugin/index.ts`

The contents of `index.ts` must look like the code block below. Pay special attention to the Plugin annotation. 

It use the same id as the plugin from the `my_app_plugins/FriendlyScoreConnectPlugin/package.json`. 

The declaration & definition of the function to be called matches the function in the `FriendlyScoreConnectPlugin.java` (Android), `FriendlyScoreConnectPlugin.m` (iOS)

```javascript

/**
 * This is a template for new plugin wrappers
 *
 * TODO:
 * - Add/Change information below
 * - Document usage (importing, executing main functionality)
 * - Remove any imports that you are not using
 * - Remove all the comments included in this template, EXCEPT the @Plugin wrapper docs and any other docs you added
 * - Remove this note
 *
 */
import { Injectable } from '@angular/core';
import { Plugin, Cordova, CordovaProperty, CordovaInstance, InstanceProperty, IonicNativePlugin } from '@ionic-native/core';
import { Observable } from 'rxjs';

/**
 * @name Friendly Score Connect Plugin
 * @description
 * This plugin does something
 *
 * @usage
 * ```typescript
 * import { FriendlyScoreConnectPlugin } from '@ionic-native/friendly-score-connect-plugin';
 *
 *
 * constructor(private friendlyScoreConnectPlugin: FriendlyScoreConnectPlugin) { }
 *
 * ...
 *
 *
 * this.friendlyScoreConnectPlugin.functionName('Hello', 123)
 *   .then((res: any) => console.log(res))
 *   .catch((error: any) => console.error(error));
 *
 * ```
 */
@Plugin({
  pluginName: 'FriendlyScoreConnectPlugin',
  plugin: 'com.friendlyscore.connect.cordova.plugin', // npm package name, example: cordova-plugin-camera
  pluginRef: 'cordova.plugins.FriendlyScoreConnectPlugin', // the variable reference to call the plugin, example: navigator.geolocation
  platforms: ['Android', 'iOS'] // Array of platforms supported, example: ['Android', 'iOS']
})
@Injectable()
export class FriendlyScoreConnectPlugin extends IonicNativePlugin {

  
  /**
   * This function does something
   * @param userReference {string} Some param to configure something
   * @return {Promise<any>} Returns a promise that resolves when something happens
   */
  @Cordova()
  startFriendlyScoreConnect(userReference: string): Promise<any> {
    return; // We add return; here to avoid any IDE / Compiler errors
  }

}

```

Once the `index.ts` is correct based on the above code block. You must generate the ionic-native plugin.

```bash
    cd ionic-native

    npm run build

```

This should generate `ionic-native/dist/@ionic-native/plugins/friendly-score-connect-plugin`

Now the plugin is ready to be integrated in your Ionic-Cordova App.


### Ionic-Cordova Android Platform

If you do not have the `android` platform in your Ionic-Cordova app, you can create it.

```bash
ionic cordova platform add android
```

Please follow the instructions below to install FriendlyScore Connect Android Native library, provide the necessary configuration and understand the flow.


#### Add to the project-level build.gradle file

In your project-level Gradle file (you can find an example in the demo [build.gradle](https://github.com/FriendlyScore/FriendlyScoreConnect-Ionic-Cordova-Example/blob/master/platforms/android/build.gradle)), add rules to include the Android Gradle plugin. The version should be equal to or greater than `3.2.1`.

```groovy
buildscript {
    dependencies {
        classpath 'com.android.tools.build:gradle:3.2.1'
    }
}  
```

```groovy
allprojects {
  repositories {
    maven { url 'https://jitpack.io' } // Include to import FriendlyScore Connect dependencies
  }
}
```
#### Add configuration to your app
   
Go to the [Redirects](https://friendlyscore.com/company/redirects) section of the FriendlyScore developer console and provide your `App Package Id` and `App Redirect Scheme`.
   
In the project-level properties file (you can find an example in the demo [gradle.properties](https://github.com/FriendlyScore/FriendlyScoreConnect-Ionic-Cordova-Example/blob/master/platforms/android/gradle.properties)), please add the following configuration values:

```bash
# App Redirect Scheme value is in the Redirects section of the developer console.
# You must specify the value the SDK will use for android:scheme to redirect back to your app. https://developer.android.com/training/app-links/deep-linking

APP_REDIRECT_SCHEME=app_redirect_scheme
```

#### Add to the App Level build.gradle file(In the demo, [app/build.gradle](https://github.com/FriendlyScore/FriendlyScoreConnect-Ionic-Cordova-Example/blob/master/platforms/android/app/build.gradle))
  
Now we must read the configuration to create the string resources that will be used by the FriendlyScore Connect Android library. Also we will include the FriendlyScore Connect Library.

```groovy
android {
  compileOptions {
  sourceCompatibility 1.8
  targetCompatibility 1.8
  }

  defaultConfig {
    resValue "string", "fs_app_redirect_scheme", (project.findProperty("APP_REDIRECT_SCHEME") ?: "NO_APP_REDIRECT_SCHEME_PROVIDED")
  }
}

dependencies {
   api 'com.github.friendlyscore.fs-android-sdk:friendlyscore-connect:latest.release'
}
```

You can select the environment you want to use:

| Environment  |   Description   |
| :----       | :--             |
| Environments.SANDBOX     | Use this environment to test your integration with Unlimited API Calls |
| Environments.DEVELOPMENT | Use this your environment to test your integration with live but limited Production API Calls |
| Environments.PRODUCTION  | Production API environment |



## Use the Plugin

### Add a Button 

This includes the ui elements such as button that a user will click to trigger the FriendlyScore Connect Flow.
In your app component html file (in the demo [app.component.html](https://github.com/FriendlyScore/FriendlyScoreConnect-Ionic-Cordova-Example/blob/master/src/app/app.component.html)) add a button that triggers the FriendlyScore Connect flow.
```html
    <ion-content>
        <div style="display: flex; justify-content: center; " text-center align-items-center>
            <ion-button (click)="startfs()" color="primary">Start FriendlyScore Connect</ion-button>
        </div>
    </ion-content>

```

### Plugin Integration

- Please ensure the above libary is included in the gradle after you run

```bash
    ionic cordova build android 
```
and/or

```bash
    ionic cordova build ios 
```
- In your project directory execute the following command to create a plugin.

```bash
    ionic cordova plugin add  my_app_plugins/FriendlyScoreConnectPlugin

```

- Next copy the ionic-native plugin created to your project.

```bash
cp -r ionic-native/dist/@ionic-native/plugins/friendly-score-connect-plugin node_modules/@ionic-native/
```
The plugin is now available for your project to use.


- Import the Plugin in your module(In the demo [app.module.ts](https://github.com/FriendlyScore/FriendlyScoreConnect-Ionic-Cordova-Example/blob/master/src/app/app.module.ts)).

```typescript
import {FriendlyScoreConnectPlugin} from '@ionic-native/friendly-score-connect-plugin/ngx';

```
- Add to the Provider

```typescript
providers: [
    FriendlyScoreConnectPlugin,
  ],
```

In your component file (in the demo [app.component.ts](https://github.com/FriendlyScore/FriendlyScoreConnect-Ionic-Cordova-Example/blob/master/src/app/app.component.ts)) import the file
```typescript
import {FriendlyScoreConnectPlugin} from '@ionic-native/friendly-score-connect-plugin/ngx';

//Define the constructor so that the Plugin is injected.
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private friendlyScoreConnectPlugin: FriendlyScoreConnectPlugin
  ) {
    ....
  } 

//Define the function startfs()
startfs(){
        //Call the Plugin function with the userReference
        this.friendlyScoreConnectPlugin.startFriendlyScoreConnect( "your_user_reference" )
        .then((fsevents) => {
            console.log(fsevents);//Only userClosedView
        })
        .catch((fserror) =>{
            console.log(fserror);
        });
  }

}
```

### Ionic-Cordova iOS Platform

If you do not have the `iOS` platform in your Ionic-Cordova app, you can create it.

```bash
ionic cordova platform add ios
```

Navigate to `platforms/ios` directory and open xcode project (in example: `fs_connect_cordova.xcodeproj`).
Make sure `FriendlyScoreConnectPlugin.m` and `FriendlyScoreConnectPlugin.h` files are aviable in `plugins` folder.
Please also check framework `FriendlyScoreSDK.framework` is added to project and is listed in `Frameworks, Libraries and Embedded Content` section:
![alt text](https://raw.githubusercontent.com/FriendlyScore/FriendlyScoreConnect-Ionic-Cordova-Example/master/framework.png "Framework")


Open `AppDelegate.m` file, import framework
```Objective-C
@import FriendlyScoreSDK;
```
and add framework configurations accordingly:

```Objective-C
- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    [FS configureConnect];
    self.viewController = [[MainViewController alloc] init];
    return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    [FS handleURLWithUrl:url];
    return true;
}
```
Finaly, fill your client Id in `FriendlyScoreConnectPlugin.m`:
```Objective-C
NSString *clientId = @"<YOUR_CLIENT_ID>";
```

Check if everything works well:
```bash
ionic cordova platform run ios
```

**NOTE**

If you make changes to the native plugin file, you must do the following steps to reflect the changes

```bash
#remove the old plugin
1. ionic cordova plugin rm com.friendlyscore.connect.cordova.plugin
#Add the plugin again
2. ionic cordova plugin add ../custom_plugins/FriendlyScoreConnectPlugin
#Copy the generated Plugin Ionic Native Framework to your project
3. cp -r /ionic-native/dist/@ionic-native/plugins/friendly-score-connect-plugin node_modules/@ionic-native/
4. ionic cordova build [platform]
```
## Error Definition
| Error                     | Definitions  | 
| -------------             | -------------|
| userReferenceAuthError   | Present if there was an authentication error for the supplied `userReference`. 
| serviceDenied             | Present if service was denied. Please check the description for more information.
| incompleteConfiguration   | Present if the configuration on the server is incomplete. Please check the description for more information.
| serverError               | Present if there was a critical error on the server.      

## Response State Definition
| State                    | Definitions  | 
| -------------             | -------------|
| userClosedView            | Present if the user closed the FriendlyScore flow.      

## Next Steps

### Access to Production Environment

You can continue to integrate FriendlyScore Connect in your app in our sandbox and development environments. Once you have completed testing, you can request access to the production environment in the developer console or speak directly to your account manager.

### Support 

Find commonly asked questions and answers in our [F.A.Q](https://friendlyscore.com/developers/faq). You can also contact us via email at [developers@friendlyscore.com](mailto:developers@friendlyscore.com) or speak directly with us on LiveChat.

You can find all the code for FriendlyScore Connect for Web component, iOS and Android on our [GitHub](https://github.com/FriendlyScore).
