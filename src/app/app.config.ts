import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withHashLocation,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations';
const firebaseConfig = {
  apiKey: 'AIzaSyChwFK8Jo8sqlBZduKu4vWXz_a7f6ktZx4',
  authDomain: 'crud-ed298.firebaseapp.com',
  projectId: 'crud-ed298',
  storageBucket: 'crud-ed298.firebasestorage.app',
  messagingSenderId: '107558259069',
  appId: '1:107558259069:web:7703b59876cfcdafbd2414',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withViewTransitions()
    ),
    provideHttpClient(withFetch()),
    // provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
};
