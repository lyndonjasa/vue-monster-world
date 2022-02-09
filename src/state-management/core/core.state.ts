export interface ICoreState {
  userId: string;
  accountId: string;
}

// base core state value
export const coreState: ICoreState = {
  userId: '',
  accountId: ''
}