import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAaTscrz_i_tpSF1-fuCy_ULw_fC1p4_n8',
  authDomain: 'vocahype.firebaseapp.com',
  projectId: 'vocahype',
  storageBucket: 'vocahype.appspot.com',
  messagingSenderId: '776251846186',
  appId: '1:776251846186:web:9a3bebf339579885aa9d53',
  measurementId: 'G-KNPE31DZDQ',
};

const app = initializeApp(firebaseConfig);
export const apiKey = firebaseConfig.apiKey;
export const auth = getAuth(app);