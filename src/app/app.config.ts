import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { appRouterProviders } from './app';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), ...appRouterProviders],
};
