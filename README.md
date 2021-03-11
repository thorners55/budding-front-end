# Budding App 🌱

**To use the live app on mobile, download the Expo app and run https://exp.host/@thorners55/budding-app**

**To use the live app on a browser, go to https://exp.host/@thorners55/budding-app and select 'Open project in browser'**

**The Northcoder's Graduation Showcase Presentation for Budding can be found here: https://www.youtube.com/watch?v=llKXad2gF8c&t=2s**

The Budding app was made by Stephanie Thornley, Zach Pinfold, Joao Mak and Richard Bacon for the final group project during the Northcoders Software Developer Bootcamp course.

Budding can measure a plant’s height and track its growth using a mobile phone and the measurement of the real life pot height. The app was inspired by wanting an efficient and easy way to keep track of our plants’ progress.

While there are currently many apps that can identify a plant, or remind you to water it, we had not yet come across one that could measure it and track its progress, which inspired us to create Budding!

This is the repository for the front-end of our app, which was built using React Native, Expo, React Navigation, and s3. Requests are made to our back-end API using Axios.

The API can be found here https://budding-back-end.herokuapp.com/api \
The Budding back-end repository can be found here https://github.com/thorners55/budding-back-end

## Prerequisites

To run the app, you will need either:

- Android Studio Emulator or Xcode
- An iOS or Android phone

If running the app on a mobile phone, you will need to download the Expo app from Google Play or the App Store.
You do not need an Expo account to run the app.

Instructions for how to use emulators with Expo can be found in Expo's documentation:

https://docs.expo.io/workflow/android-studio-emulator/ \
https://docs.expo.io/workflow/ios-simulator/

You will also need your own AWS S3 bucket to upload your photos to. 
Save your S3 configuration as an object in a file called s3-config.js in the root file as follows:

```javascript
const options = {
  keyPrefix: "example",
  bucket: "example",
  region: "example",
  accessKey: "example",
  secretKey: "example",
  successActionStatus: 201,
};

module.exports = { options };
````

## Installation

To get started with this app, install dependencies with:

`npm install`

To install the global Expo CLI:

`npm install -g expo-cli`

## Getting started

To run the app with Expo, run:

`npm start`
OR
`expo start`

Expo will then build the app and load a browser window.
The browser will provide you with a QR code to scan, which will run the app your mobile phone.
If you are using an emulator, choose the option to run on an Android simulator or iOS simulator. Alternatively, after running expo start, run `a` for Android or `i` for iOS in the command line.

## Deployment

To publish your app, you can run:

`expo publish`

which will prompt you to setup an account with Expo to publish your project to the Expo host.

To export static files of the app for hosting on a web server, you can run:

`expo export --public-url, -p <SERVER-URL>`
