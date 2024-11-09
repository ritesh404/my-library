import DataLoader from "dataloader";
import { Book } from "../models/book";
import { Book as BookType } from "../types/book";

export const createBookLoader = () => {
  return new DataLoader(async (ids: readonly string[]) => {
    const books = await Book.findAll({
      where: {
        id: ids,
      },
    });

    const bookMap = books.reduce((map, book) => {
      //@ts-expect-error - TS doesn't know about the id property on Book
      map[book.id] = book;
      return map;
    }, {} as Record<string, BookType>);
    return ids.map((id) => bookMap[id] || null);
  });
};
