interface IAccountPartyDetail {
  level: number;
  name: string;
}

export class UserAccountsResponse {
  accountId: string
  accountName: string;
  monsters: IAccountPartyDetail[]
}