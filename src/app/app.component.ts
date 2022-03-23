import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { Group } from './models/group';
import { User } from './models/user';
import { GroupService } from './services/group.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular';
  title = 'InternationsFrontend'; 

  constructor(private userService: UserService, private groupService: GroupService, private dbService: NgxIndexedDBService) { 
    
  }

  ngOnInit() {
 
    // this.dbService.clear('groups').subscribe((successDeleted) => {
    //   console.log('success clear groups ', successDeleted);
    // });
    // this.dbService.clear('users').subscribe((successDeleted) => {
    //   console.log('success clear groups ', successDeleted);
    // });

    let group = new Group();
    let user = new User();
    let group1 = new Group();
    let user1 = new User();
    let group2 = new Group();
    let user2 = new User();

    group.groupName = "Food";
    group1.groupName = "Strasbourg";
    group2.groupName = "Sport";
    user.firstName = "Marwan";
    user.lastName = "Alwan";
    user.email = "malwan@exemple.com";
    user.groups = [group,group1,group2];

    user1.firstName = "Yann";
    user1.lastName = "Dollinger";
    user1.email = "Yann@exemple.com";
    user1.groups = [group1,group2];

    user2.firstName = "Vira";
    user2.lastName = "Ihnatieva";
    user2.email = "vira@exemple.com";
    user2.groups = [group2];
    
    group.users = [user];
    group1.users = [user, user1];
    group2.users = [user, user1, user2];
   
     this.groupService.addGroup(group)
      .subscribe({
        next: (v) => {
          console.log('this is the data' + v)
        },
        error: (e) => console.error('this is the error '),
        complete: () => console.info('complete')
      });
      this.groupService.addGroup(group1)
      .subscribe({
        next: (v) => {
          console.log('this is the data' + v)
        },
        error: (e) => console.error('this is the error '),
        complete: () => console.info('complete')
      });
     
      this.groupService.addGroup(group2)
      .subscribe({
        next: (v) => {
          console.log('this is the data' + v)
        },
        error: (e) => console.error('this is the error '),
        complete: () => console.info('complete')
      });

    this.userService.addUser(user)
      .subscribe({
        next: (v) => {
          console.log('this is the data' + v)
        },
        error: (e) => console.error('this is the error '),
        complete: () => console.info('complete')
      });

      this.userService.addUser(user1)
      .subscribe({
        next: (v) => {
          console.log('this is the data' + v)
        },
        error: (e) => console.error('this is the error '),
        complete: () => console.info('complete')
      });

      this.userService.addUser(user2)
      .subscribe({
        next: (v) => {
          console.log('this is the data' + v)
        },
        error: (e) => console.error('this is the error '),
        complete: () => console.info('complete')
      });
    console.log('hello');

  }

}
