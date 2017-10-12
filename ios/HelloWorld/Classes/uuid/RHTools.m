//
//  RHTools.m
//  HelloWorld
//
//  Created by apple on 2017/9/27.
//

#import "RHTools.h"
#import "SSKeychain.h"

@implementation RHTools
/**
 *  当前设备唯一标识
 */
+ (NSString *)uniqueId {
    NSString *bundleId = [[NSBundle mainBundle] bundleIdentifier];
    NSString *account = [NSString stringWithFormat:@"%@_DEVICE_ID", bundleId];
    NSError * queryError = nil;
    NSString *deviceId = [SSKeychain passwordForService:bundleId account:account error:&queryError];
    if (!deviceId) {
        deviceId = [[UIDevice currentDevice].identifierForVendor UUIDString];
        NSError * error = nil;
        [SSKeychain setPassword:deviceId
                     forService:bundleId
                        account:account error:&error];
    }
    NSLog(@"deviceId: %@", deviceId);
    return deviceId;
}

@end
