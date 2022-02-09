export interface ICoreState {
  userId: string;
  accountId: string;
}

// base core state value
export const coreState: ICoreState = {
  userId: '61e448bc0b56cb7c585e4883', // TODO: revert back to empty string after testing
  accountId: ''
}