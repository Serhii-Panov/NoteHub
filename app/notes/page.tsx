import css from "./page.module.css";
import { fetchNotes } from "@/lib/api";
import NoteList  from "@/components/NoteList/NoteList";
const data = await fetchNotes({page: 1, perPage: 10});
console.log("Fetched notes:", data.notes);
export default function Notes() {
  return (
      <div className={css.container}>
        <NoteList notes={data.notes} />
        </div>
        );
}