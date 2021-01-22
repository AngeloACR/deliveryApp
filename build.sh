#!/bin/bash
path="./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk"

cd ./clientApp
rm $path
ionic cordova build android --prod --release
#./sign.sh
cd ../driverApp
rm $path
ionic cordova build android --prod --release
#./sign.sh
cd ../restaurantApp
rm $path
ionic cordova build android --prod --release
#./sign.sh
