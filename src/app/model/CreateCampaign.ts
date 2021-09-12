import {Criteria} from "./Criteria";

export class CreateCampaign {

  constructor(public link: string,
              public imageUrl: string,
              public startDate: Date,
              public endDate: Date,
              public criteria: Criteria,
              public intervals: Array<String>) {
  }
}
