import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {APP_CONFIG_TOKEN} from "./config/app-config.token";
import * as config from '../assets/app.config.json';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes), provideClientHydration(),
    {provide: APP_CONFIG_TOKEN, useValue: config},
  ]
};
