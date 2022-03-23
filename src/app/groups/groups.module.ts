import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { GroupService } from '../services/group.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { UserService } from '../services/user.service';
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
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    GroupsComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
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
    MatListModule
  ],
  exports: [
    GroupsComponent
  ],
  providers:[GroupService]
})
export class GroupsModule { }
