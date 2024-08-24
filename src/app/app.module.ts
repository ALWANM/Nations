import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { UserService } from './services/user.service';
import { GroupService } from './services/group.service';
import { RouterModule } from '@angular/router';

const dbConfig: DBConfig = {
  name: 'internations',
  version: 3,
  objectStoresMeta: [{
    // Users  table
    store: 'users',
    storeConfig: { keyPath: 'userid',keypath: 'userid', autoIncrement: true },
    storeSchema: [
      { name: 'email', keypath: 'email', options: { unique: true } },
      { name: 'groups', keypath: 'groups', options: { unique: true } },
      { name: 'firstname', keypath: 'firstName', options: { unique: false } },
      { name: 'lastname', keypath: 'lastName', options: { unique: false } }
    ]
  }, {
    // group table
    store: 'groups',
    storeConfig: { keyPath: 'groupid',keypath: 'groupid', autoIncrement: true },
    storeSchema: [
      { name: 'groupname', keypath: 'groupName', options: { unique: true } },
      { name: 'users', keypath: 'users', options: { unique: true } }
    ]
  }],
};



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    RouterModule.forRoot([])
  ],
  providers: [UserService,GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
//to add trace 
//RouterModule.forRoot([], { enableTracing: true })

