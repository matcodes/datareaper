
# DataReaper

Solution to Volato React Developer Challenge.


## Authors

- [@matcodes](https://github.com/matcodes)

## Setting up the project -

#### IMPORTANT
- Node version must be above 16.x.x.
- Make sure to do pod install for iOS. 
- No specific step needed for Android. 

Clone the project

```bash
  git clone https://github.com/matcodes/datareaper.git
```

Go to the project directory

```bash
  cd datareaper
```

Install dependencies [ Use NPM or YARN to Install Dependencies ]

```bash
  npm install
```
## Running locally in iOS -
Install Pods for iOS

```bash
  cd ios && pod install && cd..
```

Start the iOS app [ Make sure Simulator is installed ]

```bash
  npm run ios
```

#### The app will be running in the iOS simulator

## Running locally in Android -

Start the Android app [ Make sure Emulator is installed ]

```bash
  npm run android
```

#### The app will be running in the Android Emulator

## Future Improvements
- Implement a custom function for evaluating the expressions needed in the app instead of using the insecure `eval()` function.
- Replace the usage of `eval()` for handling dynamic JavaScript expressions with a more secure alternative.
- Implement React Navigation. 
- Create a Custom Number Input Component to handle Integer inputs properly.
---


