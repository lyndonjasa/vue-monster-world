interface IAccountPartyDetail {
  level: number;
  name: string;
  thumbnailName: string;
  element: number;
}

export class UserAccountsResponse {
  accountId: string
  accountName: string;
  monsters: IAccountPartyDetail[]
}