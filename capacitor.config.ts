import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'MedCare',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    'LocalNotifications': {'sound': 'alarma_molesta.wav'}
    
  }
};

export default config;
