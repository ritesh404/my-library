"use client";
import { BOOKS_QUERY } from "@/lib/gql/book";
import { useQuery } from "@apollo/client";
import Link from "next/link";

export default function Page({ params }: { params: { bookId: string } }) {
  const bookId = params.bookId;
  const { data, loading, error } = useQuery(BOOKS_QUERY, {
    variables: {
      id: bookId,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data?.books.books.length <= 0) return <p>Book not found.</p>;

  const { title, description, published_date, author } = data.books.books[0];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-lg mb-2">Published Date: {published_date}</p>
      <p className="text-gray-700 mb-4">{description}</p>

      {author && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Author:</h2>
          <Link
            href={`/authors/${author.id}`}
            className="text-blue-500 hover:underline"
          >
            {author.name}
          </Link>
        </div>
      )}

      <Link
        href="/"
        className="mt-6 inline-block bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        Back to Library
      </Link>
    </div>
  );
}
