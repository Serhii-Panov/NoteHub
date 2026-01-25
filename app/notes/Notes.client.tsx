"use client";
import NoteList from "@/components/NoteList/NoteList";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

import css from "./Notes.client.module.css";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import type { FetchNotesParams } from "@/lib/api";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";

const NotesClient = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentQuery, setCurrentQuery] = useState<FetchNotesParams>({
    search: searchQuery,
    page: currentPage,
    perPage: 10,
  });
  const updateSearchQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
      setCurrentQuery((prev) => ({ ...prev, search: e.target.value, page: 1 }));
    },
    300,
  );
  const { data } = useQuery({
    queryKey: ["notes", currentQuery],
    queryFn: () => fetchNotes(currentQuery),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={updateSearchQuery} searchQuery={searchQuery} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onPageChange={({ selected }) => {
              setCurrentPage(selected + 1);
              setCurrentQuery((prev) => ({ ...prev, page: selected + 1 }));
            }}
          />
        )}
        {
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        }
      </header>
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {data?.notes && data.notes.length === 0 && (
        <p>No notes found. Try creating one!</p>
      )}
      {modalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};
export default NotesClient;
