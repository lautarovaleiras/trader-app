import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarMaterialComponent } from './components/toolbar-material/toolbar-material.component';
import { NgModule } from "@angular/core";
import { NavbarMaterialComponent } from './components/navbar-material/navbar-material.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LayoutMaterialComponent } from './layout-material.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from './components/footer/footer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
	declarations: [
		ToolbarMaterialComponent,
		NavbarMaterialComponent,
		LayoutMaterialComponent,
		FooterComponent
	],
	imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
	MatSnackBarModule,
    MatButtonModule,
	MatDialogModule,
	MatCardModule
	],
	exports: [
    LayoutMaterialComponent,
    ToolbarMaterialComponent,
		NavbarMaterialComponent,
	]
})
export class LayoutModule{}
