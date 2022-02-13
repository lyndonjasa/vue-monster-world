export class SearchMonsterRequest {
  page: number;
  pageSize: number;
  filters?: {
    elements: string[],
    stages: string[]
  }
  sortProperty: "Name" | "Level" | "None" = "None";
  sortDirection: "ASC" | "DESC" = "ASC";
  searchText: string;
}