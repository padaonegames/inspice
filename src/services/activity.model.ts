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

export interface InProgressActivityInstance {
  activityType: SupportedActivity;
  activityTitle: string | undefined;
  activityAuthor: string | undefined;
  beginsOn: Date | undefined;
  endsOn: Date | undefined;
  description?: string | undefined;
  imageSrc?: string | undefined;
  tags?: string[] | undefined;
  intendedUsers?: IntendedUser[] | undefined;
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
  'GAM Game',
  'Multistage Form',
  'Escape Room'
] as const;

export type SupportedActivity = typeof supportedActivities[number];