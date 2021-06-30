
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { LoginComponent } from './account/login/login.component';
import { AccountComponent } from './account/account/account.component';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import { OrderComponent } from './order/order.component';
import {MatNativeDateModule} from '@angular/material/core';
import {httpInterceptorProviders} from "./auth/auth-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    LoginComponent,
    AccountComponent,
    CategoryComponent,
    ItemComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
