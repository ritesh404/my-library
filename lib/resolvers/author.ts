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
    born_year,
  }: {
    limit?: number;
    offset?: number;
    id?: string;
    name?: string;
    born_year?: string;
  }
) {
  const where: WhereOptions = {};

  if (name)
    where.name = {
      [Op.iLike]: `%${name}%`,
    };

  if (born_year)
    where.born_date = {
      [Op.between]: [`${born_year}-01-01`, `${born_year}-12-31`],
    };

  if (id) where.id = id;

  const count = await Author.count({
    where,
  });

  const authors = await Author.findAll({
    where,
    limit,
    offset,
    include: [{ model: Book, as: "books" }],
  });

  return {
    authors,
    count,
  };
}

export async function createAuthorMutationResolver(
  _parent: unknown,
  {
    name,
    biography,
    born_date,
  }: {
    name: string;
    biography: string;
    born_date: string;
  }
) {
  try {
    const newAuthor = await Author.create({
      name,
      biography,
      born_date,
    });
    return newAuthor;
  } catch (error) {
    console.error("Error creating author:", error);
    throw new Error("Failed to create author");
  }
}

export async function updateAuthorMutationResolver(
  _parent: unknown,
  {
    id,
    name,
    biography,
    born_date,
  }: {
    id: string;
    name: string;
    biography: string;
    born_date: string;
  }
) {
  try {
    await Author.update(
      {
        name,
        biography,
        born_date,
      },
      {
        where: {
          id,
        },
      }
    );
    const author = await Author.findByPk(id);
    return author;
  } catch (error) {
    console.error("Error updating author:", error);
    throw new Error("Failed to update author");
  }
}

export async function deleteAuthorMutationResolver(
  _parent: unknown,
  {
    id,
  }: {
    id: string;
  }
) {
  try {
    const author = await Author.findByPk(id);
    await Author.destroy({
      where: {
        id,
      },
    });
    return author;
  } catch (error) {
    console.error("Error deleting author:", error);
    throw new Error("Failed to delete author");
  }
}
