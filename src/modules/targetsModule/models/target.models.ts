export interface Target {
  id?: string;
  eventDate: string;
  sportName: string;
  fixtureName1?: string;
  fixtureName2?: string;
  /**
   * Set if fixture is an event, rather than name-name pair.
   */
  fixtureDefault?: string;
  /**
   * Number (1, 2) pointing to the selection of the fixture.
   */
  selectionName?: TargetSelectionName;
  /**
   * Set if selection is other than on any of the 2 fixtures.
   */
  selectionDefault?: string;
  /**
   * Additional data regarding the target.
   */
  note?: string;

  /**
   * Set this target to be a priority
   */
  isPriority?: boolean;
}

export type GroupedTarget = {
  [key: string]: Array<Target>;
};

export enum TargetSelectionName {
  FIRST_PLAYER = 1,
  SECOND_PLAYER = 2,
}
