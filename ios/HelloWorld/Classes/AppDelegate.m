/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at
 
 http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

//
//  AppDelegate.m
//  HelloCordova
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//  Copyright ___ORGANIZATIONNAME___ ___YEAR___. All rights reserved.
//

#import "AppDelegate.h"
#import "MainViewController.h"

#import <Cordova/CDVPlugin.h>

#import <sqlite3.h>
#import <UIKit/UIKit.h>


@implementation AppDelegate

@synthesize window, viewController;

Boolean testFlag = NO;


#define DBNAME    @"imo.sqlite"
#define UID       @"uid"
#define KEY       @"key"
#define TABLENAME @"imo"
#define TOKEN     @"token"
#define CID       @"cid"

NSArray *paths;
NSString *documents ;
NSString *database_path;
NSString *uid ;
NSString *token ;
NSString *cid ;


sqlite3 *db;

- (id)init
{
    /** If you need to do any extra app-specific initialization, you can do it here
     *  -jm
     **/
    NSHTTPCookieStorage* cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    
    [cookieStorage setCookieAcceptPolicy:NSHTTPCookieAcceptPolicyAlways];
    // lxh add check version
    [self CheckNewEnterpriseVersionRequest];
    int cacheSizeMemory = 8 * 1024 * 1024; // 8MB
    int cacheSizeDisk = 32 * 1024 * 1024; // 32MB
#if __has_feature(objc_arc)
    NSURLCache* sharedCache = [[NSURLCache alloc] initWithMemoryCapacity:cacheSizeMemory diskCapacity:cacheSizeDisk diskPath:@"nsurlcache"];
#else
    NSURLCache* sharedCache = [[[NSURLCache alloc] initWithMemoryCapacity:cacheSizeMemory diskCapacity:cacheSizeDisk diskPath:@"nsurlcache"] autorelease];
#endif
    [NSURLCache setSharedURLCache:sharedCache];
    self = [super init];
    return self;
}

#pragma mark UIApplicationDelegate implementation

/**
 * This is main kick off after the app inits, the views and Settings are setup here. (preferred - iOS4 and up)
 */
- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    
    CGRect screenBounds = [[UIScreen mainScreen] bounds];
    
#if __has_feature(objc_arc)
    self.window = [[UIWindow alloc] initWithFrame:screenBounds];
#else
    self.window = [[[UIWindow alloc] initWithFrame:screenBounds] autorelease];
#endif
    self.window.autoresizesSubviews = YES;
    
#if __has_feature(objc_arc)
    self.viewController = [[MainViewController alloc] init];
#else
    self.viewController = [[[MainViewController alloc] init] autorelease];
#endif
    
    // Set your app's start page by setting the <content src='foo.html' /> tag in config.xml.
    // If necessary, uncomment the line below to override it.
    // self.viewController.startPage = @"index.html";
    
    // NOTE: To customize the view's frame size (which defaults to full screen), override
    // [self.viewController viewWillAppear:] in your view controller.
    
    self.window.rootViewController = self.viewController;
    [self.window makeKeyAndVisible];
    
    return YES;
}

// this happens while we are running ( in the background, or from within our own app )
// only valid if HelloCordova-Info.plist specifies a protocol to handle
- (BOOL)application:(UIApplication*)application handleOpenURL:(NSURL*)url
{
    if (!url) {
        return NO;
    }
    
    // calls into javascript global function 'handleOpenURL'
    NSString* jsString = [NSString stringWithFormat:@"handleOpenURL(\"%@\");", url];
    [self.viewController.webView stringByEvaluatingJavaScriptFromString:jsString];
    
    // all plugins will get the notification, and their handlers will be called
    [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:CDVPluginHandleOpenURLNotification object:url]];
    
    return YES;
}

// repost the localnotification using the default NSNotificationCenter so multiple plugins may respond
- (void)            application:(UIApplication*)application
    didReceiveLocalNotification:(UILocalNotification*)notification
{
    // re-post ( broadcast )
    [[NSNotificationCenter defaultCenter] postNotificationName:CDVLocalNotification object:notification];
}

- (NSUInteger)application:(UIApplication*)application supportedInterfaceOrientationsForWindow:(UIWindow*)window
{
    // iPhone doesn't support upside down by default, while the iPad does.  Override to allow all orientations always, and let the root view controller decide what's allowed (the supported orientations mask gets intersected).
    NSUInteger supportedInterfaceOrientations = (1 << UIInterfaceOrientationPortrait) | (1 << UIInterfaceOrientationLandscapeLeft) | (1 << UIInterfaceOrientationLandscapeRight) | (1 << UIInterfaceOrientationPortraitUpsideDown);
    
    return supportedInterfaceOrientations;
}

- (void)applicationDidReceiveMemoryWarning:(UIApplication*)application
{
    [[NSURLCache sharedURLCache] removeAllCachedResponses];
}
- (void)applicationWillEnterForeground:(UIApplication *)application
{
    //使用子线程请求服务器数据：调用此方法
    //[self performSelectorInBackground:@selector(CheckNewEnterpriseVersionRequest) withObject:nil];
    
}


- (void)exitApplication {
    [UIView beginAnimations:@"exitApplication" context:nil];
    [UIView setAnimationDuration:0.5];
    [UIView setAnimationDelegate:self];
    [UIView setAnimationTransition:UIViewAnimationCurveEaseOut forView:[UIApplication sharedApplication].keyWindow cache:NO];
    [UIView setAnimationDidStopSelector:@selector(animationFinished:finished:context:)];
    [UIApplication sharedApplication].keyWindow.bounds = CGRectMake(0, 0, 0, 0);
    [UIView commitAnimations];
}
- (void)animationFinished:(NSString *)animationID finished:(NSNumber *)finished context:(void *)context {
    if ([animationID compare:@"exitApplication"] == 0) {
        exit(0);
    }
}
NSString *serverUrl = @"http://moaupdate.capitalwater.cn/";
NSString *testServerUrl = @"http://moaupdate.capitalwater.cn/";
NSString *feedURLString = @"http://moaupdate.capitalwater.cn/iosVersion.xml";
//NSString *feedURLString = @"http://10.10.105.101:8080/iosVersion.xml";
NSString *updateUrl = @"itms-services:///?action=download-manifest&url=https://moaupdate.capitalwater.cn:433/scmoanew.plist";

NSString *testUpdateUrl = @"itms-services:///?action=download-manifest&url=https://moaupdate.capitalwater.cn:433/scmoanew.plist";
static NSString *newVersion = @"0";
NSString *tempString  = nil;
static NSString *forcible = @"false";
static NSString *upgrade = @"";
bool isVersion = NO;
bool isForcible = NO;
bool newwork = YES;



- (void)CheckNewEnterpriseVersionRequest{
    if(testFlag==YES){
        feedURLString = [testServerUrl stringByAppendingString: @"iosVersion.xml"];
    }else{
        feedURLString = [serverUrl stringByAppendingString: @"iosVersion.xml"];
    }
    //读当前版本
    NSDictionary *dictionary = [[NSBundle mainBundle] infoDictionary];
    NSString *currentVersion = [dictionary objectForKey:@"CFBundleVersion"];
    NSLog(@"当前版本:%@" ,currentVersion);
    NSError *parseError = nil;
    [self parseXMLFileAtURL:[NSURL URLWithString:feedURLString] parseError:&parseError];
    NSLog(@"最新版本:%@" ,newVersion);
    NSLog(@"是否强制升级:%@" ,forcible);
    NSLog(@"版本提示信息:%@" ,upgrade);
    NSLog(@"版本lianjie:%@",feedURLString);
    
    if ([newVersion isEqualToString : @"0"]) {
        UIAlertView *alert;
        alert = [[UIAlertView alloc] initWithTitle:@"网络提示"
                                           message:@"目前无法连接网络，请确认网络连接！"
                                          delegate: self
                                 cancelButtonTitle:nil
                                 otherButtonTitles: @"确定", nil];
        alert.tag = 1001;
        alert.delegate = self;
        newwork = NO;
        [alert show];
        
        
    }
    //double doubleCurrentVersion = [currentVersion doubleValue];
    //double doubleNewVersion = [newVersion doubleValue];
    // if (doubleCurrentVersion < doubleNewVersion) {
    else{
        if(![currentVersion isEqualToString:newVersion]){
            UIAlertView *alert;
            if([forcible isEqualToString:@"true"]){
                alert = [[UIAlertView alloc] initWithTitle:@"升级提示"
                                                   message: upgrade
                                                  delegate: self
                                         cancelButtonTitle:nil
                                         otherButtonTitles: @"前往升级", nil];
            }
            else if([forcible isEqualToString:@"false"]){
                alert = [[UIAlertView alloc] initWithTitle:@"升级提示"
                                                   message: upgrade
                                                  delegate: self
                                         cancelButtonTitle:@"取消"
                                         otherButtonTitles: @"前往升级", nil];
            }
            
            alert.tag = 1001;
            alert.delegate = self;
            [alert show];
            
        }
    }
    
    
}
-(void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex{
    if(testFlag==YES){
        updateUrl = testUpdateUrl;
    }
    NSLog(@" button index=%d is clicked.....", buttonIndex);
    if (!newwork && buttonIndex == 0) {
        [self exitApplication];
    }else{
        if([forcible isEqualToString:@"true"]){
            if (buttonIndex ==  0) {
                [[UIApplication sharedApplication] openURL:[NSURL URLWithString:updateUrl]];
            }
        }else{
            if (buttonIndex ==  1) {
                [[UIApplication sharedApplication] openURL:[NSURL URLWithString:updateUrl]];
            }
        }
        
    }
    
}


- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
    NSString *urlStr = [url absoluteString];
    if ([urlStr hasPrefix:@"scmoa://"]) {
        NSLog(@"scmoa request params: %@", urlStr);
        urlStr = [urlStr stringByReplacingOccurrencesOfString:@"scmoa://&" withString:@""];
        NSArray *paramArray = [urlStr componentsSeparatedByString:@"&"];
        NSLog(@"paramArray: %@", paramArray);
        //NSMutableDictionary *paramsDic = [[NSMutableDictionary alloc] initWithCapacity:0];
        for (int i = 0; i < paramArray.count; i++) {
            NSString *str = paramArray[i];
            NSArray *keyArray = [str componentsSeparatedByString:@"="];
            NSString *key = keyArray[0];
            NSString *value = keyArray[1];
            if ([key isEqualToString: UID]) {
                uid = value;
                NSLog(@"key:%@ ==== value:%@", key, value);
            }
            if ([key isEqualToString: KEY]) {
                token = value;
                NSLog(@"key:%@ ==== value:%@", key, value);
            }
            if ([key isEqualToString:CID]) {
                cid = value;
                NSLog(@"key:%@ ==== value:%@", key, value);
            }
            
            //[paramsDic setObject:value forKey:key];
            //NSLog(@"key:%@ ==== value:%@", key, value);
        }
        
        paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
        documents = [paths objectAtIndex:0];
        database_path = [documents stringByAppendingPathComponent:DBNAME];
        
        if (sqlite3_open([database_path UTF8String], &db) != SQLITE_OK) {
            sqlite3_close(db);
            NSLog(@"数据库打开失败");
        }
        NSString *sqlDeleteTable = @"DROP TABLE IMO";
        [self execSql:sqlDeleteTable];
        
        NSString *sqlCreateTable = @"CREATE TABLE IF NOT EXISTS IMO (ID INTEGER PRIMARY KEY AUTOINCREMENT, UID TEXT,TOKEN TEXT,CID TEXT)";
        [self execSql:sqlCreateTable];
        
        NSString *sqlDelTable = @"DELETE FROM IMO";
        [self execSql:sqlDelTable];
        
        
        NSString *sql1 = [NSString stringWithFormat:
                          @"INSERT INTO '%@' ('%@', '%@' , '%@') VALUES ('%@', '%@' , '%@')",
                          TABLENAME, UID, TOKEN,CID,  uid, token,cid];
        
        
        [self execSql:sql1];
        
        NSString *sqlQuery = @"SELECT * FROM IMO";
        sqlite3_stmt * statement;
        
        if (sqlite3_prepare_v2(db, [sqlQuery UTF8String], -1, &statement, nil) == SQLITE_OK) {
            while (sqlite3_step(statement) == SQLITE_ROW) {
                char *uid = (char*)sqlite3_column_text(statement, 1);
                NSString *nsUidStr = [[NSString alloc]initWithUTF8String:uid];
                char *token = (char*)sqlite3_column_text(statement, 1);
                NSString *nsTokenStr = [[NSString alloc]initWithUTF8String:token];
                NSLog(@"uid:%@  token:%@  ",nsUidStr,nsTokenStr);
            }
        }
        sqlite3_close(db);
        
        
    }
    return NO;
}






-(void)execSql:(NSString *)sql
{
    char *err;
    if (sqlite3_exec(db, [sql UTF8String], NULL, NULL, &err) != SQLITE_OK) {
        
        sqlite3_close(db);
        NSLog(@"数据库操作数据失败!");
    }
}









- (void)parserDidStartDocument:(NSXMLParser *)parser
{
    // 解析开始时的处理
}

- (void)parseXMLFileAtURL:(NSURL *)URL parseError:(NSError **)error
{
    NSXMLParser *parser = [[NSXMLParser alloc] initWithContentsOfURL:URL];
    [parser setDelegate:self];
    [parser setShouldProcessNamespaces:NO];
    [parser setShouldReportNamespacePrefixes:NO];
    [parser setShouldResolveExternalEntities:NO];
    [parser parse];
    NSError *parseError = [parser parserError];
    if (parseError && error) {
        *error = parseError;
    }
    
}

- (void)parser:(NSXMLParser *)parser didStartElement:(NSString *)elementName namespaceURI:(NSString *)namespaceURI qualifiedName:(NSString *)qName attributes:(NSDictionary *)attributeDict
{
    // 元素开始句柄
    if (qName) {
        elementName = qName;
    }
    
}

- (void)parser:(NSXMLParser *)parser didEndElement:(NSString *)elementName namespaceURI:(NSString *)namespaceURI qualifiedName:(NSString *)qName
{
    // 元素终了句柄
    if (qName) {
        elementName = qName;
    }
    
    if([elementName isEqualToString:@"version"])
    {
        newVersion = tempString;
    }
    
    if([elementName isEqualToString:@"forcible"])
    {
        forcible = tempString;
    }
    if([elementName isEqualToString:@"upgrade"])
    {
        upgrade = tempString;
    }
    
    tempString = nil;
}

- (void)parser:(NSXMLParser *)parser foundCharacters:(NSString *)string
{
    // 取得元素的text
    tempString =string;
    
}
@end
