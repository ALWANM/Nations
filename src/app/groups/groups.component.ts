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

  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.groups$ = this.groupService.getGroups();
    console.log('this.groups$',this.groups$)
  }

  /**
  * 
  * @param user 
  */
  deleteGroup(group: Group) {
    console.log('delettion user ' + group.groupid);
    
    this.groupService.deleteGroupByKey(group.groupid).subscribe({
      next: (v) => {
        this.updateUsers(group.users, group);
        this.groups$ = this.groupService.getGroups();
        this.showSnackbarDuration('User' + group.groupName + ' deleted ', 'Done', '5000')
        console.log('this is the data ' + v)
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
            console.log('updating user ' + v);
          },
          error: (e) => console.error('error occur during update group ' + e),
          complete: () => console.info('update user complete')
        });
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
