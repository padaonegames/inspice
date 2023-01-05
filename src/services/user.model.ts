/** Credentials object containing user's username and password. */
export interface UserCredentials {
  /** Unique user name */
  username: string;
  /** Password to be used by the user when authenticating. */
  password: string;
}

export enum Role {
  curator = "CURATOR",
  visitor = "VISITOR",
}

/** Basic user information required to create a new user in the system */
export interface NewUser extends UserCredentials {
  /** Role that the user will have in the system. */
  role: Role;
}

/** User information without password or api tokens */
export interface UserData {
  /** Unique user name */
  username: string;
  /** Role that the user will have in the system. */
  role: Role;
}

/** Posible responses when attempting a login */
export type SigninResponse =
  | {
      /** object contanining the data of the user who just logged in */
      userData: UserData;
      /** JWT Token to be used by user in further requests to the API. */
      accessToken: string;
    }
  | {
      accessToken: null;
      message?: string;
    };
