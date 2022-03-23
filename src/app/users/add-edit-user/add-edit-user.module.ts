import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule,FormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { UserService } from 'src/app/services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';

import { AddEditUserRoutingModule } from './add-edit-user-routing.module';
import { AddEditUserComponent } from './add-edit-user.component';

@NgModule({
  declarations: [
    AddEditUserComponent
  ],
  imports: [
    CommonModule,
    AddEditUserRoutingModule,
    MatButtonModule,
    MatPseudoCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSidenavModule,
    MatSlideToggleModule, 
    MatChipsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSliderModule,
    FlexLayoutModule,
    MatListModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports: [
    AddEditUserComponent
  ],
  providers:[UserService]
})
export class AddEditUserModule { }
