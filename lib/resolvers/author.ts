import { Op, WhereOptions } from "sequelize";
import { Author } from "../models/author";
import { Book } from "../models/book";

export async function authorQueryResolver(
  _parent: unknown,
  {
    limit = 10,
    offset = 0,
    id,
    name,
    born_date,
  }: {
    limit?: number;
    offset?: number;
    id?: string;
    name?: string;
    born_date?: string;
  }
) {
  const where: WhereOptions = {};

  if (name)
    where.name = {
      [Op.iLike]: `%${name}%`,
    };

  if (born_date) where.born_date = born_date;

  if (id) where.id = id;

  return await Author.findAll({
    where,
    limit,
    offset,
    include: [{ model: Book, as: "books" }],
  });
}
