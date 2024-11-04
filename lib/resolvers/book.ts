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
