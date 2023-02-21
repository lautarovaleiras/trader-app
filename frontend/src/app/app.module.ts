import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TraderComponent } from './trader/trader.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ToolbarMaterialComponent } from './layout/components/toolbar-material/toolbar-material.component';
import { LayoutModule } from './layout/layout.module';
import { MatLineModule } from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    TraderComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatLineModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    AuthModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
