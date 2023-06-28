import {CapacitorConfig} from '@capacitor/cli';
import {KeyboardResize, KeyboardStyle} from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'com.krvang.lindved',
  appName: 'ScoreTracker',
  webDir: 'www',
  android: {

  },
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Keyboard: {
      resize: KeyboardResize.Body,
      style: KeyboardStyle.Dark,
      resizeOnFullScreen: true
    }
  }
};

export default config;
