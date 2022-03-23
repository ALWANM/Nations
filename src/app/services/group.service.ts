import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { Group } from '../models/group';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private dbService: NgxIndexedDBService) { }

  /*
  add group
  */
  public addGroup(group: Group) {
    return this.dbService.add('groups', group);
  }
  /*
 getall groups
 */
  public getGroups(): Observable<Group[]> {
    return this.dbService.getAll('groups');
  }

  /* 
  get group by th index userid 
   */
  public getGroupByGroupId(groupId: number): Observable<Group> {
    return this.dbService.getByID('groups', groupId);
  }

  /**
    * delete group by id
    */
  public deleteGroupByKey(groupId: number): Observable<boolean> {
    return this.dbService.deleteByKey('groups', groupId);
  }
 
  /**
  * update group
  * @param group 
  * @returns 
  */
  public updateGroup(group: Group): Observable<Group[]> {
    console.log('group in service ', group);
    return this.dbService.update('groups', group);
  }

}
