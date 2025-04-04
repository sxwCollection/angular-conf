import { InjectionToken } from '@angular/core';
import {AppConfig} from "./app-config.interface";

export const APP_CONFIG_TOKEN = new InjectionToken<AppConfig>('APP_CONFIG_TOKEN');
