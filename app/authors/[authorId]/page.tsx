"use client";
import { AUTHORS_QUERY } from "@/lib/gql/author";
import { useQuery } from "@apollo/client";
import Link from "next/link";

export default function Page({ params }: { params: { authorId: string } }) {
  const authorId = params.authorId;
  const { data, loading, error } = useQuery(AUTHORS_QUERY, {
    variables: {
      id: authorId,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data?.authors.authors.length <= 0) return <p>Author not found.</p>;

  const { name, bio, books } = data.authors.authors[0];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{name}</h1>
      {bio && <p className="text-gray-700 mb-6">{bio}</p>}

      {books && books.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Books:</h2>
          <ul className="space-y-2">
            {books.map((book: { id: string; title: string }) => (
              <li key={book.id}>
                <Link
                  href={`/books/${book.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {book.title}
                </Link>
              </li>
            ))}
          </ul>
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
