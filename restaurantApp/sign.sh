#!/bin/bash

keystoreName="/home/angeloacr/Proyectos/Tuk/keystores/restauranteTuk.jks"
path="./platforms/android/app/build/outputs/apk/release/"
appName1=app-release-unsigned.apk
appName2=restauranteTuk.apk
alias=restaurantetuk
cd $path
rm $appName2
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $keystoreName $appName1 $alias

zipalign -v 4 $appName1 $appName2