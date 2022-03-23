import { User } from "./user";

export class Group {
    groupid: number;
    groupName: string = "";
    users: Array<User> = [];
}
