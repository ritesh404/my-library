import Modal from "./Modal";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BOOK } from "@/lib/gql/book";
import { Book } from "@/lib/types/book";

interface BookModalProps {
  selectedAuthorID: string;
  onCreateBookSuccess: (book: Book) => void;
  onCreateBookFailure: () => void;
  onCancel: () => void;
}

const BookForm = ({
  selectedAuthorID,
  onCreateBookSuccess,
  onCreateBookFailure,
  onCancel,
}: BookModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createBook] = useMutation(CREATE_BOOK);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await createBook({
        variables: {
          title,
          description,
          published_date: publishedDate,
          author_id: selectedAuthorID,
        },
      });
      onCreateBookSuccess(data.createBook);
    } catch (error) {
      console.error("Error creating book:", error);
      onCreateBookFailure();
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Add a book</h2>

      {/* Book Details */}
      <div className="mb-4">
        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Published Date</label>
        <input
          type="date"
          value={publishedDate}
          onChange={(e) => setPublishedDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {isSubmitting ? (
        <div className="text-center">Please wait...</div>
      ) : (
        <>
          <button
            type="submit"
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded"
          >
            Add
          </button>
          <button
            type="button"
            className="px-4 py-2 mt-4 ml-4 text-white rounded bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
        </>
      )}
    </form>
  );
};

const CreateBookModal = (props: BookModalProps) => {
  return (
    <Modal>
      <div className="mt-2">
        <BookForm
          selectedAuthorID={props.selectedAuthorID}
          onCreateBookSuccess={props.onCreateBookSuccess}
          onCreateBookFailure={props.onCreateBookFailure}
          onCancel={props.onCancel}
        />
      </div>
    </Modal>
  );
};

export default CreateBookModal;
