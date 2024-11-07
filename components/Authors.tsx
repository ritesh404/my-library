import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import AuthorModal from "./AuthorModal";
import BookModal from "./BookModal";
import { AUTHORS_QUERY, DELETE_AUTHOR } from "@/lib/gql/author";
import Modal from "./Modal";

interface Author {
  id: string;
  name: string;
  biography: string;
}

const ITEMS_PER_PAGE = 10;

const ConfirmDeleteModal = ({
  author,
  onConfirm,
  onCancel,
  isBusy = false,
}: {
  author: Author;
  onConfirm: () => void;
  onCancel: () => void;
  isBusy: boolean;
}) => {
  return (
    <Modal>
      <p>
        Are you sure you want to delete details of author <b>{author.name}</b>?
      </p>
      <p>All books by the author will also be deleted</p>
      <div className="mt-4 flex gap-8">
        {isBusy ? (
          "Please wait..."
        ) : (
          <>
            <button
              type="button"
              className=" px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
              onClick={onConfirm}
            >
              Yes, delete
            </button>
            <button
              type="button"
              className=" px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
              onClick={onCancel}
            >
              No, cancel
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

const SomethingWentWrongModal = ({ onConfirm }: { onConfirm: () => void }) => {
  return (
    <Modal>
      <p>Something went wrong</p>
      <div className="mt-4 flex gap-8">
        <button
          type="button"
          className=" px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
          onClick={onConfirm}
        >
          Ok
        </button>
      </div>
    </Modal>
  );
};

const Authors = ({ currentPage }: { currentPage: number }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [showAuthorCreationModal, setShowAuthorCreationModal] = useState(false);
  const [showBookCreationModal, setShowBookCreationModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showSomethingWentWrong, setShowSomethingWentWrong] = useState(false);

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

  const [deleteAuthor, { loading: isDeleting }] = useMutation(DELETE_AUTHOR, {
    variables: {
      id: selectedAuthor?.id,
    },
  });

  async function confirmDeleteAuthor() {
    if (!selectedAuthor) return;
    try {
      await deleteAuthor({
        variables: {
          id: selectedAuthor.id,
        },
      });
      await refetchAuthors();
      setShowDeleteConfirmation(false);
    } catch (e) {
      setShowSomethingWentWrong(true);
    }
  }

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
            onClick={() => {
              setSelectedAuthor(null);
              setShowAuthorCreationModal(true);
            }}
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
                  Authors
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
                    <button
                      className="px-4 py-2 bg-blue-400 text-white rounded"
                      onClick={() => {
                        setSelectedAuthor(author);
                        setShowBookCreationModal(true);
                      }}
                    >
                      Add Book
                    </button>
                    <button
                      onClick={() => {
                        setSelectedAuthor(author);
                        setShowAuthorCreationModal(true);
                      }}
                      className="px-4 py-2 bg-gray-400 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedAuthor(author);
                        setShowDeleteConfirmation(true);
                      }}
                      className="px-4 py-2 bg-gray-400 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showAuthorCreationModal && (
        <AuthorModal
          author={selectedAuthor}
          onAuthorSuccess={() => {
            refetchAuthors();
            setShowAuthorCreationModal(false);
          }}
          onAuthorFailure={() => {
            setShowAuthorCreationModal(false);
          }}
          onCancel={() => {
            setShowAuthorCreationModal(false);
          }}
        />
      )}
      {showBookCreationModal && selectedAuthor && (
        <BookModal
          selectedAuthorID={selectedAuthor.id}
          onCreateBookSuccess={() => {
            setShowBookCreationModal(false);
          }}
          onCreateBookFailure={() => {
            setShowBookCreationModal(false);
          }}
          onCancel={() => setShowBookCreationModal(false)}
        />
      )}
      {showDeleteConfirmation && selectedAuthor && (
        <ConfirmDeleteModal
          author={selectedAuthor}
          onConfirm={confirmDeleteAuthor}
          onCancel={() => setShowDeleteConfirmation(false)}
          isBusy={isDeleting}
        />
      )}
      {showSomethingWentWrong && (
        <SomethingWentWrongModal
          onConfirm={() => setShowSomethingWentWrong(false)}
        />
      )}
    </>
  );
};

export default Authors;