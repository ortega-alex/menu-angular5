
export class EntityFind {

  constructor(
      public nameEntity: String,
      public entity: any,
      public searchAction: boolean,
      private typeReport: string
  ) {
  }
}