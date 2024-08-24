import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Group } from '../models/group';
import { User } from '../models/user';
import { GroupService } from '../services/group.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  public groups$: Observable<Group[]>;
  removable = true;

  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.groups$ = this.groupService.getGroups();
    console.log('this.groups$', this.groups$)
  }

  /**
  * 
  * @param user 
  */
  deleteGroup(group: Group) {
    console.log('deletion user ' + group.groupid);

    this.groupService.deleteGroupByKey(group.groupid).subscribe({
      next: (v) => {
        this.updateUsers(group.users, group);
        this.groups$ = this.groupService.getGroups();
        this.showSnackbarDuration('Group ' + group.groupName + ' deleted ', 'Done', '5000')
        console.log('this is the data ' , v)
      },
      error: (e) => console.error('error occur during deletion user ' + e),
      complete: () => console.info('delete user complete')
    });
  }

  /**
     * 
     * @param groupId 
     * @returns 
     */
  goEditGroup(groupId: number): Promise<boolean> {
    return this.router.navigate(['/groupAddEdit'], { queryParams: { groupid: groupId } });
  }

  /**
   * 
   * @param userId ,
   * @returns 
   */
  goAddGroup(): Promise<boolean> {
    return this.router.navigate(['/groupAddEdit'], { queryParams: { new: '' } });
  }

  /**
  * update groups after adding user to show new users iin the group or after delete group
  * @param groups list of groups to update 
  * @param user  the nez user to add
  */
  updateUsers(users: User[], group: Group) {

    users.forEach(user => {
      var indexToDelete = user.groups.findIndex(x => x.groupName == group.groupName);
      if (indexToDelete !== -1) {
        user.groups.splice(indexToDelete, 1);
      }
      this.userService.updateUser(user).subscribe({
        next: (v) => {
          console.log('updating user ');
        },
        error: (e) => console.error('error occur during update group ' + e),
        complete: () => console.info('update user complete')
      });
    });
  
  }

  /**
   * remove groupe from the mat-chip and update the groups also
   * @param keyword 
   */
  removeUserFromGroup(user: User, group: Group): void {
    console.log(user, group);
    var indexToDelete = group.users.findIndex(x => x.userid == user.userid);
    if (indexToDelete !== -1) {
      group.users.splice(indexToDelete, 1);
    }
    this.groupService.updateGroup(group).subscribe({
      next: (v) => {
        this.updateUsers([user], group);
        this.groups$ = this.groupService.getGroups();
        //this.showSnackbarDuration('User ' + user.firstName + ' ' + user.lastName+  ' removed from  ' + group.groupName , 'Done', '5000');
      },
      error: (e) => console.error('error occur during update group ' + e),
      complete: () => console.info('update group complete')
    });
    console.log('group.users.length', group.users.length);
    if (group.users.length == 0) {
      group.users.push(user)
      this.deleteGroup(group);
    }
  }

 /**
   * 
   * @param user 
   */
  deleteUser(user: User) {
    this.userService.deleteUserByKey(user.userid).subscribe({
      next: (v) => {
        console.log('delete user because he hasn\'t any more groups');
        //this.updateGroups(user.groups, user);
        //this.group$ = this.userService.getUsers();
       // this.showSnackbarDuration('User ' + user.firstName + ' ' + user.lastName + ' deleted ', 'Done', '5000');
      },
      error: (e) => console.error('error occur during deletion user ' + e),
      complete: () => console.info('delete user complete')
    });
  }


  /**
  * show snack bar after insert user 
  * @param content 
  * @param action 
  * @param duration 
  */
  showSnackbarDuration(content, action, duration) {
    this.snackBar.open(content, action, duration);
  }
}
