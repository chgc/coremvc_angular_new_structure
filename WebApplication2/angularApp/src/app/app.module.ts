import {ApplicationRef, Component, ComponentFactoryResolver, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {EmptyComponent} from './empty/empty.component';
import {HomeComponent} from './home/home.component';
import {MenuModule} from './menu.module';
import {MenuComponent} from './menu/menu.component';

const routes: Routes = [
  {path: 'dash', loadChildren: 'app/dash/dash.module#DashModule'},
  {path: '**', component: EmptyComponent}
];

const entryComponents = [AppComponent, MenuComponent];

@NgModule({
  declarations: [AppComponent, HomeComponent, EmptyComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), MenuModule],
  entryComponents: [...entryComponents]
})
export class AppModule {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  ngDoBootstrap(app: ApplicationRef) {
    entryComponents.forEach((component: any) => {
      const factory =
          this.componentFactoryResolver.resolveComponentFactory(component);
      if (document.querySelector(factory.selector)) {
        app.bootstrap(factory.componentType);
      }
    })
  }
}
