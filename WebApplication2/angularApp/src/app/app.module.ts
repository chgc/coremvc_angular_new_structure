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
  ngDoBootstrap(app: ApplicationRef) {
    const options = {
      'app-root': AppComponent,
      'app-menu': MenuComponent,
    };

    const components = ['app-root', 'app-menu'];
    components.forEach(comp => {
      const ele = document.querySelector(comp);
      if (ele) {
        app.bootstrap(options[comp]);
      }
    });
  }
}
