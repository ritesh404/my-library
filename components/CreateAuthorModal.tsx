"use client";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Modal from "./Modal";
import { AUTHORS_QUERY, CREATE_AUTHOR } from "@/lib/gql/author";

interface AuthorModalProps {
  onCreateAuthorSuccess: (author: {
    id: string;
    biography: string;
    born_date: string;
    name: string;
  }) => void;
  onCreateAuthorFailure: () => void;
  onCancel: () => void;
}

const AuthorForm = ({
  onCreateAuthorFailure,
  onCreateAuthorSuccess,
  onCancel,
}: AuthorModalProps) => {
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createAuthor] = useMutation(CREATE_AUTHOR, {
    refetchQueries: [{ query: AUTHORS_QUERY }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await createAuthor({
        variables: {
          name,
          biography,
          born_date: bornDate,
        },
      });
      onCreateAuthorSuccess(data.createAuthor);
      // Clear form after submission
    } catch (error) {
      console.error("Error creating author:", error);
      onCreateAuthorFailure();
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Create New Author</h2>

      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Biography</label>
        <textarea
          required
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Born Date</label>
        <input
          required
          type="date"
          value={bornDate}
          onChange={(e) => setBornDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      {isSubmitting ? (
        <div className="text-center">Please wait...</div>
      ) : (
        <>
          <button
            type="submit"
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded"
            disabled={isSubmitting}
          >
            Create
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

const CreateAuthorModal = (props: AuthorModalProps) => {
  return (
    <Modal>
      <div className="mt-2">
        <AuthorForm
          onCreateAuthorSuccess={props.onCreateAuthorSuccess}
          onCreateAuthorFailure={props.onCreateAuthorFailure}
          onCancel={props.onCancel}
        />
      </div>
    </Modal>
  );
};

export default CreateAuthorModal;
