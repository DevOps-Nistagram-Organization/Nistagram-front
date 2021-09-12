import {Criteria} from "./Criteria";

export class Campaign {
  constructor(public id: number,
              public postId: number,
              public agentUsername: string,
              public link: string,
              public imageUrl: string,
              public datePosted: Date,
              public startDate: Date,
              public endDate: Date,
              public criteria: Criteria,
              public intervals: Set<string>) {
  }
}
