export class StarterPackResponse {
  group: number;
  monsters: IPackMonster[]
}

interface IPackMonster {
  name: string;
  element: number;
}