import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, BehaviorSubject, Subscription,  } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { IParams } from '../models/uiHelper';
 
import { initialUser, IUser, newUser } from '../models/user';
import { UserService } from '../services/user.service';
import { UiHelperData } from './uihelper.data';

@Injectable()
export class UserData {
  private _users: BehaviorSubject<IUser[]> = new BehaviorSubject([ initialUser ]);
  users: Observable<IUser[]> = this._users.asObservable();
  private _selectedUser: BehaviorSubject<IUser> = new BehaviorSubject(initialUser);
  readonly selectedUser: Observable<IUser> = this._selectedUser.asObservable();
  selectedId;
  config = { duration: 3000 };

  constructor(
    private userService: UserService,
    public uiHelperData: UiHelperData,
    public snackBar: MatSnackBar
  ) { }

  get users$(): Observable<IUser[]> {
    return this.users;
  }

  get selectedUser$(): Observable<IUser> {
    return this.selectedUser;
  }

  updateMovie(user){
    return this.userService.updateUser(user); 
  }

  deleteUser(id){
    return this.userService.deleteUserByKey(id);
  }


  private filterSelectedUser(): Subscription {
    const selectedUser: Observable<IUser> = this.users$.pipe(
      mergeMap((user: IUser[]) => user),
      filter((user: IUser) => user.userId === this.selectedId)
    );
    return selectedUser.subscribe(user => this._selectedUser.next(user));
  }

  private newUser() {
    this._selectedUser.next({ ...newUser });
  }

  loadUsers(p: IParams){
    this.selectedId = p.selected;
    const isSelected = p.selected !== '';
    return this.userService.getUsers();
  }
}
