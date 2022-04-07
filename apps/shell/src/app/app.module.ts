import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@mfe/auth';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WebComponentContainerComponent } from './web-component-container.component';
import { ReactContainerComponent } from './react-component-container.component';

@NgModule({
  declarations: [
    AppComponent,
    WebComponentContainerComponent,
    ReactContainerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, AuthModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
