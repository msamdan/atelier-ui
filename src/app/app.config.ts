import { provideHttpClient, withInterceptors } from "@angular/common/http";
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from "@angular/core";
import { provideFileRouter, requestContextInterceptor } from "@analogjs/router";
import { provideTaiga, tuiAssetsPathProvider } from "@taiga-ui/core";
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideFileRouter(),
    provideHttpClient(withInterceptors([requestContextInterceptor])),
    provideTaiga({ scrollbars: "native" }),
    tuiAssetsPathProvider("/icons/"),
  ],
};
