export interface ICoreState {
  userId: string;
  username: string;
  accountId: string;
}

// base core state value
export const coreState: ICoreState = {
  userId: '',
  username: '',
  accountId: ''
}