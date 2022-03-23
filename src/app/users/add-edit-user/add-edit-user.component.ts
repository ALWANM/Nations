import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router'; 
import { map, Observable } from 'rxjs';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  userForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    groups: new FormControl('', Validators.required)
  });


  public groups$: Observable<Group[]>;
  groupsToSearch: Observable<Group[]>;
  userToAdd: User = new User();
  //groupToAdd: Group;
  userIdToEdit: number;
  btnText: string = 'Add';
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  userToEdit$: User;
  groupFoundInList: Group;
  groupsOfUserToAdd: Group[] = [];
  //groupsOfuserAlreadyHave: Group[];

  constructor(
    public activatedRoute: ActivatedRoute,
    private groupService: GroupService,
    private userService: UserService,
    private router: Router,
    //private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.groups$ = this.groupService.getGroups();
    this.groupsToSearch = this.groupService.getGroups();
    this.activatedRoute.queryParams.subscribe(
      params => {
        console.log('Got the userid as: ', params['userid']);
        this.userIdToEdit = + params['userid'];
        console.log('this.userToAdd ', this.userIdToEdit);
      });
    // we are in  the update case else we are in ad new user case 
    if (this.userToAdd !== null) {
      this.getUserToUpdate(this.userIdToEdit);
      console.log('this.userToAdd je suis la ', this.userIdToEdit);
    }
    else {
      this.groupsOfUserToAdd = [];
      this.btnText = 'Add';
    }
  }

  /**
   * on form submit
   */
  onSubmit() {

    this.userToAdd = new User();
    this.groupFoundInList = new Group();
    this.userToAdd.firstName = this.userForm.value.firstname;
    this.userToAdd.lastName = this.userForm.value.lastname;
    this.userToAdd.email = this.userForm.value.email;
    this.userToAdd.groups = [...this.groupsOfUserToAdd];
    this.userForm.get('groups').value.forEach(groupSelectedName => {
      if (groupSelectedName != "") {
        console.log(' group ', groupSelectedName)
        let group2 = new Group();
        // this.groups$.pipe(
        //   map(item => item.find(x => x.groupName == groupSelectedName)))
        //   .subscribe({
        //     next: (group) => {
        //       //this.userToAdd.groups.push(group);
        //      // this.groupFoundInList = group;
        //       console.log('group found ',  this.groupFoundInList);
        //       group2.groupid = group.groupid;
        //     },
        //     error: (e) => console.error('error occur during searching group in list  '),
        //     complete: () => console.info('searching the group in list complete')
        //   });
        group2.groupName = groupSelectedName;
        group2.users = [this.userToAdd];
        this.userToAdd.groups.push(group2);
      }
    });
    if (this.btnText == 'Add') {
      this.addUser(this.userToAdd);
      this.updateGroups(this.userToAdd.groups, this.userToAdd);
    }
    else {
      this.userToAdd.userid = this.userIdToEdit;
      this.updateUser(this.userToAdd);
    }
  }

  /**
   * get user to   update 
   * @param userId userID number
   */
  getUserToUpdate(userId: number) {
    this.userService.getUsersByUserId(userId).subscribe({
      next: (user) => {
        this.userToEdit$ = user;
        //console.log('user found ', user);
        this.userForm.patchValue({
          firstname: user.firstName,
          lastname: user.lastName,
          email: user.email
        });
        this.groupsOfUserToAdd = user.groups;
        //console.log(this.groupsOfUserToAdd);
        this.btnText = 'Update';
      },
      error: (e) => console.error('error occur during getting user to update  '),
      complete: () => console.info('add user complete')
    });
  }

  /**
   * add user
   * @param user the new user to add
   */
  addUser(user: User) {
    this.userService.addUser(user)
      .subscribe({
        next: (v) => {
          this.showSnackbarDuration('User' + user.firstName + ' ' + user.lastName + ' ' + 'added ', 'Done', '5000')
          console.log('user added ', v)
        },
        error: (e) => console.error('error occur during adding user ', e),
        complete: () => console.info('add user complete')
      });
  }

  /**
   * update user
   * @param user the user to update
   */
  updateUser(user: User) {
    this.userService.updateUser(user)
      .subscribe({
        next: (v) => {
          this.showSnackbarDuration('User' + user.firstName + ' ' + user.lastName + ' ' + 'updated ', 'Done', '5000')
          console.log('this is the data ' + v)
        },
        error: (e) => console.error('error occur during updating user ', e),
        complete: () => console.info('add user complete')
      });
  }

  /**
   * update groups after adding user to show new user in the groups
   * @param groups list of groups to update 
   * @param user  the nez user to add
   */
  updateGroups(groups: Group[], user: User) {
    groups.forEach(group => {
      //console.log('group id ',this.groups$[1].groupid)
      group.users.push(user);
      this.groupService.updateGroup(group).subscribe({
        next: (v) => {
          console.log('updating groups ', v);
        },
        error: (e) => console.error('error occur during update group ', e),
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

  /**
    * 
    * @returns gro to group page
    */
   goUsers(): Promise<boolean> {
    return this.router.navigate(['/users']);
  }

   


}
