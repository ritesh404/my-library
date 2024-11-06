export interface Author {
  id: string;
  name: string;
  biography?: string;
  born_date?: string;
}

export interface AuthorsQueryResult {
  authors: Author[];
}
