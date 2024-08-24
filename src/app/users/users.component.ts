import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Group } from '../models/group';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})


export class UsersComponent implements OnInit {

  public users$: Observable<User[]>;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  /**
   * 
   * 
   */
  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }

  /**
   * 
   * @param user 
   */
  deleteUser(user: User) {
    this.userService.deleteUserByKey(user.userid).subscribe({
      next: (v) => {
        this.updateGroups(user.groups, user);
        this.users$ = this.userService.getUsers();
        this.showSnackbarDuration('User ' + user.firstName + ' ' + user.lastName + ' deleted ', 'Done', '5000');
      },
      error: (e) => console.error('error occur during deletion user ' + e),
      complete: () => console.info('delete user complete')
    });
  }

  /**
  * update groups after adding user to show new users in the group or after delete user
  * @param groups list of groups to update 
  * @param user  the nez user to add
  */
  updateGroups(groups: Group[], user: User) {

    groups.forEach(group => {
      var indexToDelete = group.users.findIndex(x => x.email == user.email);
      if (indexToDelete !== -1) {
        group.users.splice(indexToDelete, 1);
      }
      this.groupService.updateGroup(group).subscribe({
        next: (v) => {
          console.log('updating group ');
        },
        error: (e) => console.error('error occur during update group ' + e),
        complete: () => console.info('update group complete')
      });
    });
  }

  /**
   * remove groupe from the mat-chip and update the groups also
   * @param keyword 
   */
  removeGroupFromUser(group: Group, user: User): void {
    console.log(group, user);
    var indexGroupToDelete = user.groups.findIndex(x => x.groupid == group.groupid);
    if (indexGroupToDelete !== -1) {
      user.groups.splice(indexGroupToDelete, 1);
    } 
      this.userService.updateUser(user).subscribe({
        next: (v) => {
          this.updateGroups([group], user);
          this.users$ = this.userService.getUsers();
          this.showSnackbarDuration('Group ' + group.groupName + ' removed from  ' + user.firstName + ' ' + user.lastName, 'Done', '5000');
        },
        error: (e) => console.error('error occur during update group ' + e),
        complete: () => console.info('update group complete')
      });   
      console.log('user.groups.length', user.groups.length);
      if (user.groups.length == 0) {
        user.groups.push(group);
        this.deleteUser(user);
      }
  }

  /**
   * 
   * @param userId 
   * @returns 
   */
  goEditUser(userId: number): Promise<boolean> {
    return this.router.navigate(['/addEditUser'], { queryParams: { userid: userId } });
  }

  /**
   * 
   * @param userId ,
   * @returns 
   */
  goAddUser(): Promise<boolean> {
    return this.router.navigate(['/addEditUser'], { queryParams: { selected: 'new' } });
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
