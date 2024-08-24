import { Injectable } from '@angular/core';
import { NgxIndexedDBService, ObjectStoreMeta } from "ngx-indexed-db";
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //$users: Observable<any>;

  constructor(private dbService: NgxIndexedDBService) { }

  /*
  add user
  */
  public addUser(user: User) {
    console.log('this is the user in the service',user);
    return this.dbService.add('users', user);
  }

  /*
  getall users
  */
  public getUsers(): Observable <User[]> {
    //this.$users = this.dbService.getAll('users');
    return this.dbService.getAll('users');
  }

 /* 
  get user by th index mail
   */
  public getUsersByMail(email: string) {
    return this.dbService.getByIndex('users', 'email', email);
  }

  /* 
  get user by th index userid 
   */
  public getUsersByUserId(userId: number): Observable<User> {
    return this.dbService.getByID('users', userId);
  }
  /*
  * getall users
  */
  public updateUser(user: User): Observable<User[]> {
    console.log('the user in update function ', user)
    return this.dbService.update('users', user);
  }
 
  /**
   * 
   */
  public deleteUserByKey(userId: number):Observable<boolean> {
    return this.dbService.deleteByKey('users', userId);
  }

  /**
   * get the last id
   * @returns 
   */
  public getLastId(): Observable <number> {
    return this.dbService.count('users');
  }

}
