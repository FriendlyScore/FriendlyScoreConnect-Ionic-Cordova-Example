//
//  FriendlyScoreConnect.m
//  MyApp
//
//  Created by Lukasz Czechowicz on 25/05/2020.
//

#import "FriendlyScoreConnectPlugin.h"
#import <Cordova/CDVPlugin.h>
@import FriendlyScoreSDK;

@implementation FriendlyScoreConnectPlugin

NSString *clientId = @"831_ys8gjppjmiowwsksskg0ws4cw0swww44sc400csgss4g4swkc";
NSString *environment = @"production";

- (void)startFriendlyScoreConnect:(CDVInvokedUrlCommand*)command
{
    NSString* userRef = [command.arguments objectAtIndex:0];
    [FS connectWithClientId:clientId userReference:userRef environment:environment];
}
@end
