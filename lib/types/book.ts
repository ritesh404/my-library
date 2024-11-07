export interface Book {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    id: string;
  };
}
