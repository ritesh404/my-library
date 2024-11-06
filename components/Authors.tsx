import { useQuery } from "@apollo/client";
import { useState } from "react";
import CreateAuthorModal from "./CreateAuthorModal";
import { AUTHORS_QUERY } from "@/lib/gql/author";

interface Author {
  id: string;
  name: string;
  biography: string;
}

const ITEMS_PER_PAGE = 10;

const Authors = ({ currentPage }: { currentPage: number }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  const {
    data,
    loading,
    refetch: refetchAuthors,
  } = useQuery<{ authors: Author[] }>(AUTHORS_QUERY, {
    variables: {
      limit: ITEMS_PER_PAGE,
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
    },
  });

  return (
    <>
      <div className="flex justify-between sm:flex-row flex-col">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm">Search by name</span>
            <input
              type="text"
              placeholder="Author name"
              className="w-full rounded-md border border-gray-300 p-2 text-sm"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value || "")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm">Search by birth year</span>
            <input
              type="number"
              min="1600"
              max="2024"
              step="1"
              className="w-full rounded-md border border-gray-300 p-2 text-sm"
              placeholder="Birth year"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value || "")}
            />
          </div>
        </div>
        <div className="flex items-end sm:ml-12 w-full sm:w-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowModal(true)}
          >
            Add Author
          </button>
        </div>
      </div>
      <div className="mt-4 w-full  bg-slate-50 rounded-xl ">
        {loading ? (
          <div className="py-4">Please wait...</div>
        ) : (
          <table className="border-collapse w-full">
            <thead>
              <tr>
                <th className="border-b font-medium p-4  pb-3 text-slate-400 text-left">
                  Name
                </th>
              </tr>
            </thead>
            <tbody className="bg-white ">
              {data?.authors.map((author: Author) => (
                <tr key={author.id}>
                  <td className="border-y pl-8 border-l border-slate-100 p-4 text-slate-500">
                    {author.name}
                  </td>
                  <td className="border-y flex gap-4 justify-end border-slate-100 p-4 text-slate-500">
                    <button className="px-4 py-2 bg-blue-400 text-white rounded">
                      Add Book
                    </button>
                    <button className="px-4 py-2 bg-gray-400 text-white rounded">
                      Edit
                    </button>
                    <button className="px-4 py-2 bg-gray-400 text-white rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showModal && (
        <CreateAuthorModal
          onCreateAuthorSuccess={(author) => {
            refetchAuthors();
            setShowModal(false);
          }}
          onCreateAuthorFailure={() => {
            setShowModal(false);
          }}
          onCancel={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
};

export default Authors;
