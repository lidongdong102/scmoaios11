#!/bin/bash
if [ $# -lt 1 ]; then
echo "=============================================="
  echo "usage:     $0 <dev|dis>"
  echo "  dev:   Development."
  echo "  dis:   Distribution."
  echo "example:"
  echo "  > $0 dev"
  echo "  > $0 beta"
  echo "  > $0 pro"
  echo "  > $0 dis"
  echo "  > $0 ts"
echo "=============================================="
  exit -1
fi


#=======================Development config===========
dev_bundle=com.ruaho.cochat.test
dev_provisioning_profile=
dev_team=
dev_displayname=众信_dev
dev_htmldir=../../www/
dev_app_host=
dev_report_key=13DAAF56F09D9864F05A2FB78EC637FD


#=======================Beta config===========
beta_bundle=com.ruaho.cochat.beta
beta_provisioning_profile=F7D149F8-7551-4B61-BD73-9AFC6A1D150D
beta_team=62JWP34ADC
beta_displayname=众信_beta
beta_htmldir=../../dist/
beta_app_host=ruaho.cn
beta_report_key=07BA32DAF3DDD39C33E538BFA72E9B16

#=======================pro config===========
pro_bundle=com.ruaho.cochat.demo
pro_provisioning_profile=88A5A18D-FF2C-42B7-A9E7-15B86D0A7D06
pro_team=62JWP34ADC
pro_displayname=众信
pro_htmldir=../../dist/
pro_app_host=cochat.cn
pro_report_key=60D0D8B50677B0DB17705853B7417E00


#=======================ts config===========
ts_bundle=com.ruaho.cochat.demo
ts_provisioning_profile=88A5A18D-FF2C-42B7-A9E7-15B86D0A7D06
ts_team=62JWP34ADC
ts_displayname=众信_ts
ts_htmldir=../../dist/
ts_app_host=ruaho.cn
ts_report_key=60D0D8B50677B0DB17705853B7417E00


#=======================Distribution config===========
dis_bundle=com.ruaho.cochat
dis_provisioning_profile=C00071D5-D8B3-4D9A-B1E3-3B7E24F349B6
dis_team=
dis_displayname=众信
dis_htmldir=../../dist/
dis_app_host=
dis_report_key=60D0D8B50677B0DB17705853B7417E00



#=======================shell config===========
PLISTBUDDY=/usr/libexec/PlistBuddy 
COCHAT_PLIST=cochat/cochat-Info.plist
JPUSH_PLIST=cochat/Classes/PushConfig.plist
SETTINGS_PLIST=cochat/Resources/Settings.bundle/Root.plist


ACTION="$1" 


BUNDLE_IDENTIFIER=""
DISPLAY_NAME=""
JPUSH_KEY=""
WWW_DIR_SCRIPT='SRC_DIR='
PROVISIONING_PROFILE=""
DEVELOPMENT_TEAM=""

if [ "$ACTION" == "dev" ]; then
  BUNDLE_IDENTIFIER=$dev_bundle
  PROVISIONING_PROFILE="$dev_provisioning_profile"
  DEVELOPMENT_TEAM="$dev_team"
  DISPLAY_NAME=$dev_displayname
  WWW_DIR_SCRIPT="$WWW_DIR_SCRIPT$dev_htmldir"
  APP_HOST=$dev_app_host
  APP_REPORT=$dev_report_key
  echo "set up Development env "

  elif [ "$ACTION" == "beta" ]; then
  #grunt html&js&css etc
  rm -rf $WWW_DIR_SCRIPT
  grunt --base  ../../

  BUNDLE_IDENTIFIER=$beta_bundle
  PROVISIONING_PROFILE="$beta_provisioning_profile"
  DEVELOPMENT_TEAM="$beta_team"
  DISPLAY_NAME=$beta_displayname
  WWW_DIR_SCRIPT="$WWW_DIR_SCRIPT$beta_htmldir"
  APP_HOST=$beta_app_host
  APP_REPORT=$beta_report_key
  echo "set up Beta env "

  elif [ "$ACTION" == "pro" ]; then
  #grunt html&js&css etc
  rm -rf $WWW_DIR_SCRIPT
  grunt --base  ../../

  BUNDLE_IDENTIFIER=$pro_bundle
  PROVISIONING_PROFILE="$pro_provisioning_profile"
  DEVELOPMENT_TEAM="$pro_team"
  DISPLAY_NAME=$pro_displayname
  WWW_DIR_SCRIPT="$WWW_DIR_SCRIPT$beta_htmldir"
  APP_HOST=$pro_app_host
  APP_REPORT=$pro_report_key
  echo "set up Pro env "


  elif [ "$ACTION" == "dis" ]; then 
  rm -rf $WWW_DIR_SCRIPT
  #grunt html&js&css etc
  grunt --base  ../../

  BUNDLE_IDENTIFIER=$dis_bundle
  PROVISIONING_PROFILE="$dis_provisioning_profile"
  DEVELOPMENT_TEAM="$dis_team"
  DISPLAY_NAME=$dis_displayname
  WWW_DIR_SCRIPT="$WWW_DIR_SCRIPT$dis_htmldir"
  APP_HOST=$dis_app_host
  APP_REPORT=$dis_report_key
  echo "set up Distribution env "

  else
   echo "unknow parameter: $ACTION";
   exit -1
fi


# resolve links - $0 may be a softlink
PRG="$0"

while [ -h "$PRG" ]; do
  ls=`ls -ld "$PRG"`
  link=`expr "$ls" : '.*-> \(.*\)$'`
  if expr "$link" : '/.*' > /dev/null; then
    PRG="$link"
  else
    PRG=`dirname "$PRG"`/"$link"
  fi  
done

# Get standard environment variables
PRGDIR=`dirname "$PRG"`

# Only set SOFT_HOME if not already set
[ -z "$SOFT_HOME" ] && SOFT_HOME=`cd "$PRGDIR" ; pwd`


#update bundle id
`$PLISTBUDDY -c "Set :CFBundleIdentifier $BUNDLE_IDENTIFIER" "$COCHAT_PLIST"`

#update team
if [ "$DEVELOPMENT_TEAM" == "" ]; then
  sed -i ""   "s/DevelopmentTeam.*;//g"  cochat.xcodeproj/project.pbxproj
else
  sed -i ""   "s/DevelopmentTeam.*;//g"  cochat.xcodeproj/project.pbxproj
  sed -i ""  -e    "s/SystemCapabilities/DevelopmentTeam = $DEVELOPMENT_TEAM; SystemCapabilities/g"  cochat.xcodeproj/project.pbxproj
fi

#update display name
`$PLISTBUDDY -c "Set :CFBundleDisplayName $DISPLAY_NAME" "$COCHAT_PLIST"`


#update app host
`$PLISTBUDDY -c "Set :PreferenceSpecifiers:1:DefaultValue $APP_HOST" "$SETTINGS_PLIST"`

#update report key
`$PLISTBUDDY -c "Set :PreferenceSpecifiers:2:DefaultValue $APP_REPORT" "$SETTINGS_PLIST"`

#replace shell script
sed -i ""   '3s%.*%'"${WWW_DIR_SCRIPT}"'%' cordova/lib/copy-html-build-step.sh  

#replace provisioning Profile
sed -i ""   "s/PROVISIONING_PROFILE.*/PROVISIONING_PROFILE = \"$PROVISIONING_PROFILE\";/g"  cochat.xcodeproj/project.pbxproj


echo "[$ACTION] Done!"   



