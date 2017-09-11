import 'zone.js/dist/zone-node';
import './polyfills.server';

import { AppModule } from './app/app.module.server';
import { enableProdMode } from '@angular/core';
import { INITIAL_CONFIG } from '@angular/platform-server';
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';

// ***** The ASPNETCore Angular Engine *****
import {
  ngAspnetCoreEngine,
  createTransferScript,
  IEngineOptions
} from '@nguniversal/aspnetcore-engine';

enableProdMode(); // for faster server rendered builds

export default createServerRenderer(params => {
  /*
     * How can we access data we passed from .NET ?
     * you'd access it directly from `params.data` under the name you passed it
     * ie: params.data.WHATEVER_YOU_PASSED
     * -------
     * We'll show in the next section WHERE you pass this Data in on the .NET side
     */

  // Platform-server provider configuration
  const setupOptions: IEngineOptions = {
    appSelector: '<app-root></app-root>',
    ngModule: AppModule,
    request: params,
    providers: [
      {
        provide: 'serverUrl',
        useValue: params.data.serverUrl
      }
    ]
  };

  // ***** Pass in those Providers & your Server NgModule, and that's it!
  return ngAspnetCoreEngine(setupOptions).then(response => {
    // Want to transfer data from Server -> Client?

    // Add transferData to the response.globals Object, and call createTransferScript({}) passing in the Object key/values of data
    // createTransferScript() will JSON Stringify it and return it as a <script> window.TRANSFER_CACHE={}</script>
    // That your browser can pluck and grab the data from
    response.globals.transferData = createTransferScript({
      someData:
        'Transfer this to the client on the window.TRANSFER_CACHE {} object',
      fromDotnet: params.data.thisCameFromDotNET // example of data coming from dotnet, in HomeController
    });

    return {
      html: response.html,
      globals: response.globals
    };
  });
});
