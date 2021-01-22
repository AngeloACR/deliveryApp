#!/bin/bash

keystoreName="/home/angeloacr/Proyectos/Tuk/keystores/clienteTuk.jks"
path="./platforms/android/app/build/outputs/apk/release/"
appName1=app-release-unsigned.apk
appName2=clienteTuk.apk
alias=clientetuk
cd $path
rm $appName2
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $keystoreName $appName1 $alias

zipalign -v 4 $appName1 $appName2