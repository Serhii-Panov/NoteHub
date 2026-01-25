"use client";
import css from "./NoteDetails.module.css";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const NoteDetailsClient = () => {
  const params = useParams();
  const id = params.id;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNoteById(id as string),
    refetchOnMount: false,
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong.</p>}
      {data && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{data?.title}</h2>
            </div>
            <p className={css.content}>{data?.content}</p>
            <p className={css.date}>{data?.createdAt}</p>
          </div>
        </div>
      )}
    </>
  );
};
export default NoteDetailsClient;
