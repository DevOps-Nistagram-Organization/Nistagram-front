export class RegistrationRequest {
  constructor(public username: string,
              public firstName: string,
              public lastName: string,
              public password: string,
              public email: string,
              public gender: string,
              public dateOfBirth: Date,
              public agent: boolean) {
  }
}
