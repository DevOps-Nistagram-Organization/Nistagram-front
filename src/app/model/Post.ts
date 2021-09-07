export class Post {
  constructor(public id: number,
              public authorUsername: string,
              public imagePath: string,
              public datePosted: Date,
              public tags: Set<string>,
              public likedByUsers: Set<string>,
              public dislikedByUsers: Set<string>,
              public favouredByUsers: Set<string>) {
  }
}
