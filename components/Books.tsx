"use client";
import { BOOKS_QUERY } from "@/lib/gql/book";
import { Book } from "@/lib/types/book";
import { useQuery } from "@apollo/client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 10;

const Books = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");

  const { data, loading, refetch } = useQuery(BOOKS_QUERY, {
    variables: {
      limit: ITEMS_PER_PAGE,
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
    },
    // skip: currentTab !== "books",
  });
  const totalPages = data ? Math.ceil(data.books.count / ITEMS_PER_PAGE) : 0;

  function handleRefetchBooks() {
    refetch({
      limit: ITEMS_PER_PAGE,
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
      title: titleFilter,
      author_name: authorFilter,
    });
  }

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
        <div className="flex items-end">
          <button
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              handleRefetchBooks();
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className="margin-t-12">
        {loading ? (
          <div className="py-4">Please wait...</div>
        ) : (
          data?.books.books.map((book: Book) => (
            <div key={book.id} className="flex flex-col gap-4">
              <div>{book.title}</div>
              {/* <div className="text-sm text-gray-500">By {book.author.name}</div> */}
            </div>
          ))
        )}
      </div>
      {!loading && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(pageNo) => {
            router.push(`/authors?page=${pageNo}`);
          }}
        />
      )}
    </>
  );
};

export default Books;
