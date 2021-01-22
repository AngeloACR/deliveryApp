#!/bin/bash
path="./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk"

rm $path
ionic cordova build android --prod --release
#./sign.sh
