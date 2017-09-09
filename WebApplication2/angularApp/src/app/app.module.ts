import {ApplicationRef, Component, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {EmptyComponent} from './empty/empty.component';
import {HomeComponent} from './home/home.component';
import {MenuModule} from './menu.module';
import {MenuComponent} from './menu/menu.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dash', loadChildren: 'app/dash/dash.module#DashModule'},
  {path: '**', component: EmptyComponent}
];

@NgModule({
  declarations: [AppComponent, HomeComponent, EmptyComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), MenuModule],
  providers: [],
  entryComponents: [AppComponent, MenuComponent]
})
export class AppModule {
  bootComponents = {'app-root': AppComponent, 'app-menu': MenuComponent};

  ngDoBootstrap(app: ApplicationRef) {
    Object.entries(this.bootComponents)
        .map(([key, value]) => key)
        .forEach(comp => {
          if (document.querySelector(comp)) {
            app.bootstrap(this.bootComponents[comp]);
          }
        });
  }
}
