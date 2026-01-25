import css from "./page.module.css";
import axios from "axios";
import { NoteApiResponse } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] =
  `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;
const Notes = async () => {
  const getNotes = async () => {
    const res = await axios.get<NoteApiResponse>("/notes");
    return res.data;
  };
  const currentQuery = {
    page: 1,
    perPage: 10,
  };
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["notes", currentQuery],
      queryFn: getNotes,
    });
  } catch (error) {
    throw error;
  }

  return (
    <div className={css.container}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient />
      </HydrationBoundary>
    </div>
  );
};
export default Notes;
