export class SearchMonsterCriteria {
  searchText: string;
  elements: string[];
  stages: string[];
  sortProperty: "None" | "Name" | "Level";
  sortDirection: "ASC" | "DESC";
}