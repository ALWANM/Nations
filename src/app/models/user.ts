import { Group } from "./group";

export class User {
    userid: number ;
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    groups: Array<Group> = [];
}

 
  