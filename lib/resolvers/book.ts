import { Op, WhereOptions } from "sequelize";
import { Book } from "../models/book";
import { Author } from "../models/author";

export async function bookQueryResolver(
  _parent: unknown,
  {
    limit = 10,
    offset = 0,
    id,
    title,
    author_id,
    published_date,
  }: {
    limit: number;
    offset: number;
    id?: string;
    title?: string;
    author_id?: string;
    published_date?: string;
  }
) {
  const where: WhereOptions = {}; // Using WhereOptions directly

  // Filtering options
  if (title) where.title = { [Op.iLike]: `%${title}%` };
  if (published_date) where.published_date = published_date;
  if (author_id) where.author_id = author_id;
  if (id) where.id = id;

  return await Book.findAll({
    where,
    limit,
    offset,
    include: [{ model: Author, as: "author" }],
  });
}

export async function createBookMutationResolver(
  _parent: unknown,
  {
    title,
    description,
    published_date,
    author_id,
  }: {
    title: string;
    description: string;
    published_date: string;
    author_id: string;
  }
) {
  try {
    const newBook = await Book.create({
      title,
      description,
      published_date,
      author_id,
    });
    return newBook;
  } catch (error) {
    console.error("Error creating book:", error);
    throw new Error("Failed to create book");
  }
}

export async function updateBookMutationResolver(
  _parent: unknown,
  {
    id,
    title,
    description,
    published_date,
    author_id,
  }: {
    id: string;
    title: string;
    description: string;
    published_date: string;
    author_id: string;
  }
) {
  try {
    await Book.update(
      {
        title,
        description,
        published_date,
        author_id,
      },
      {
        where: {
          id,
        },
      }
    );
    const book = await Book.findByPk(id);
    return book;
  } catch (error) {
    console.error("Error updating book:", error);
    throw new Error("Failed to update book");
  }
}

export async function deleteBookMutationResolver(
  _parent: unknown,
  {
    id,
  }: {
    id: string;
  }
) {
  try {
    const book = await Book.findByPk(id);
    await Book.destroy({
      where: {
        id,
      },
    });
    return book;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw new Error("Failed to delete book");
  }
}
