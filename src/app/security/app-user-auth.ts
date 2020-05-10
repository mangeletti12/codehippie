import { AppUserClaim } from "./app-user-claim";

export class AppUserAuth {
  userName: string = "";
  access_token: string = "";
  refresh_token: string = "";
  claims: AppUserClaim[] = [];
}
