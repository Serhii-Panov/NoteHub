import css from "./NoteList.module.css";
import type { Note } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import Link from "next/link";
interface NoteListProps {
  notes: Array<Note>;
}

export default function NoteList(props: NoteListProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: (data: Note) => {
      console.log("Note deleted:", data);
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
    },
  });
  const handleDelete = (noteId: string) => {
    mutate(noteId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notes'] });
      },
    });
  };
  return (
    <ul className={css.list}>
      {props.notes.map((note) => {
        return (
          <li
            key={note.id}
            className={css.listItem}
            // onClick={() => props.onSelect(note)}
          >
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
                <Link href={`/notes/${note.id}`}>Note details</Link>
              <button onClick={() => handleDelete(note.id)} className={css.button}>
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
