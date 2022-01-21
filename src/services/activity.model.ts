//------------------------------------------
//         GENERAL DEFINITIONS
//------------------------------------------
export interface ActivityInstance {
  activityType: SupportedActivity;
  activityTitle: string;
  activityAuthor: string;
  beginsOn: Date;
  endsOn: Date;
  _id: string;
  description?: string;
  imageSrc?: string;
  tags?: string[];
  intendedUsers?: IntendedUser[];
}

export const intendedUsers = [
  'Children',
  'Families',
  'Adults',
  'Teenagers',
  'Deaf People'
];

export type IntendedUser = typeof intendedUsers[number];

export const supportedActivities = [
  'Treasure Hunt',
  'GAM Game'
] as const;

export type SupportedActivity = typeof supportedActivities[number];