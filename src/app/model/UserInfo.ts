export class UserInfo {
  constructor(public id: number,
              public username: string,
              public firstName: string,
              public lastName: string,
              public email: string,
              public phone: string,
              public gender: string,
              public dateOfBirth: Date,
              public website: string,
              public biography: string,
              public agent: boolean,
              public imagePath: string,
              public publicProfile: boolean,
              public followers: Array<UserInfo>,
              public following: Array<UserInfo>,
              public sentFollowRequests: Array<UserInfo>,
              public receivedFollowRequests: Array<UserInfo>) {
  }
}
