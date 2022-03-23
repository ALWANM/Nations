import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-group-add-edit',
  templateUrl: './group-add-edit.component.html',
  styleUrls: ['./group-add-edit.component.css']
})
export class GroupAddEditComponent implements OnInit {

  groupForm = new FormGroup({
    groupname: new FormControl('', Validators.required),
    users: new FormControl('', Validators.required)
  });

  public users$: Observable<User[]>;
  //usersOfGroupAlreadyHave: User[];
  groupToAdd: Group = new Group();
  userToAdd: Group;
  groupIdToEdit: number;
  btnText: string = 'Add';
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  groupToEdit$: Group;
  usersOfGroupToAdd: User[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    private groupService: GroupService,
    private userService: UserService,
    private router: Router,
   // private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();

    this.activatedRoute.queryParams.subscribe(
      params => {
        console.log('Got the groupId as: ', params['groupid']);
        this.groupIdToEdit = + params['groupid'];
      });
    // we are in the update case else we are in ad new user case 
    if (this.groupIdToEdit != NaN) {
      console.log('this.userToAdd je suis la ');
      this.getGroupToUpdate(this.groupIdToEdit);
    }
    else {
      this.usersOfGroupToAdd = [];
      this.btnText = 'Add';

    }
  }
  /**
   * on form submit
   */
  onSubmit() {

    this.groupToAdd = new Group();
    this.groupToAdd.groupName = this.groupForm.value.groupname;
    this.groupToAdd.users = [...this.usersOfGroupToAdd];
    this.groupForm.get('users').value.forEach(userSelected => {
      if (userSelected != "") {
        //console.log(' User ', userSelected);
        //this.groupToAdd.users.push(userSelected.groups.users);
        var indexToDelete = this.groupToAdd.users.findIndex(x => x.userid == userSelected.userid);
        if (indexToDelete == -1) {
          this.groupToAdd.users.push(userSelected);
        }
      }
    });

    if (this.btnText == 'Add') {
      this.updateUsers(this.groupToAdd.users, this.groupToAdd);
      this.addGroup(this.groupToAdd);
    }
    else {
      this.groupToAdd.groupid = this.groupIdToEdit;
      this.updateUsers(this.groupToAdd.users, this.groupToAdd);
      this.updateGroup(this.groupToAdd);
    }
  }

  /**
   * get group to   update 
   * @param groupId userID number
   */
  getGroupToUpdate(groupId: number) {
    this.groupService.getGroupByGroupId(groupId).subscribe({
      next: (group) => {
        this.groupToEdit$ = group;
        //console.log('group found ', group);
        this.groupForm.patchValue({
          groupname: group.groupName
        });
        this.usersOfGroupToAdd = group.users;
       // console.log(this.usersOfGroupToAdd);
        this.btnText = 'Update';
      },
      error: (e) => console.error('error occur during getting group '),
      complete: () => console.info('add group complete')
    });
  }

  /**
   * add user
   * @param user the new user to add
   */
  addGroup(group: Group) {
    this.groupService.addGroup(group)
      .subscribe({
        next: (v) => {
          this.showSnackbarDuration('Group ' + group.groupName + ' added ', 'Done', '5000')
          console.log('group added  ' + v)
        },
        error: (e) => console.error('error occur during adding user ', e),
        complete: () => console.info('add user complete')
      });
  }

  /**
   * update user 
   * @param user the user to update
   */
  updateGroup(group: Group) {
    this.groupService.updateGroup(group)
      .subscribe({
        next: (v) => {
          this.showSnackbarDuration('User ' + group.groupName + ' updated ', 'Done', '5000')
          console.log('this is the data ' + v)
        },
        error: (e) => console.error('error occur during updating user ', e),
        complete: () => console.info('add user complete')
      });
  }

  /**
   * update users after adding group to show new group in the users
   * @param groups list of groups to update 
   * @param user  the nez user to add
   */
  updateUsers(users: User[], group: Group) {

    users.forEach(user => {
      //console.log('group id ', user);
      user.groups.push(group);
      this.userService.updateUser(user).subscribe({
        next: (v) => {
          console.log('updating users ' + v);
        },
        error: (e) => console.error('error occur during update group ' + e),
        complete: () => console.info('update user complete')
      });
    });
  }

   /**
    * 
    * @returns gro to group page
    */
     goGroups(): Promise<boolean> {
      return this.router.navigate(['/groups']);
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
