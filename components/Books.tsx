import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";

interface Book {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    id: string;
  };
}

const BOOKS_QUERY = gql`
  query Books($limit: Int, $offset: Int) {
    books(limit: $limit, offset: $offset) {
      id
      title
      description
    }
  }
`;

const ITEMS_PER_PAGE = 10;

const Books = ({ currentPage }: { currentPage: number }) => {
  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");

  const { data, loading } = useQuery(BOOKS_QUERY, {
    variables: {
      limit: ITEMS_PER_PAGE,
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
    },
    // skip: currentTab !== "books",
  });

  return (
    <>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm">Search by title</span>
          <input
            type="text"
            placeholder="Search books by title"
            className="w-full rounded-md border border-gray-300 p-2 text-sm"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value || "")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm">Search by author</span>
          <input
            type="text"
            placeholder="Search books by author"
            className="w-full rounded-md border border-gray-300 p-2 text-sm"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value || "")}
          />
        </div>
      </div>
      <div className="margin-t-12">
        {loading ? (
          <div className="py-4">Please wait...</div>
        ) : (
          data?.books.map((book: Book) => (
            <div key={book.id} className="flex flex-col gap-4">
              <div>{book.title}</div>
              {/* <div className="text-sm text-gray-500">By {book.author.name}</div> */}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Books;
