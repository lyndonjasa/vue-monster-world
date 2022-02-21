export interface ITalent {
  _id: string;
  name: string;
  description: string;
  category: number;
  type: number;
  points: number;
  prerequisite?: string;
}