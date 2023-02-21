import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from './../layout/layout.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "src/environments/environment";
import { HomeComponent } from "./pages/home/home.component";
import { traderRoutes } from "./trader.routes";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NewAccountComponent } from './dialogs/new-account/new-account.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import { BuyDialogComponent } from './dialogs/buy-dialog/buy-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
  HomeComponent,
  NewAccountComponent,
  BuyDialogComponent
],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    LayoutModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(traderRoutes),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
})
export class TraderModule { }
