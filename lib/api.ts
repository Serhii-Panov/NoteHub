import axios from "axios";
import type {Note} from "../types/note"

export interface FetchNotesParams {
    search?: string,
    tag?: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo",
    page : number,
    perPage: number,
    sortBy?: "created" | "updated"
}
interface CreateNoteParams {
    title: string,
    content: string,
    tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo"
}
export interface NoteApiResponse {
    notes:Note[],
    totalPages: number
}
const API_URL = "https://notehub-public.goit.study/api/notes"
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export async function fetchNotes(params:FetchNotesParams):Promise<NoteApiResponse> {
  //await delay(500); // Simulate network delay
      try {
    const {data} = await axios.get<NoteApiResponse>(API_URL, {
      params: {
        search: params.search,
        tag: params.tag,
        page: params.page,
        perPage: params.perPage,
        sortBy: params.sortBy
      },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        Accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw new Error("Failed to fetch notes");
  }
}

export async function fetchNoteById(id:string): Promise<Note> {
    const {data} = await axios.get<Note>(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        Accept: "application/json",
      },
    });
    return data;
  }

export async function createNote(newNote:CreateNoteParams): Promise<Note> {
  try {
    const {data} = await axios.post<Note>(API_URL, newNote, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        Accept: "application/json",
      }
    });

    return data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw new Error("Failed to create note");
  }
    // має виконувати запит для створення нової нотатки на сервері. 
    // Приймає вміст нової нотатки та повертає створену нотатку у відповіді;
}
export async function deleteNote(id:string): Promise<Note> {
      try {
    const {data} = await axios.delete<Note>(`${API_URL}/${id}`, {
        headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        Accept: "application/json",
      }
    });

    return data;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw new Error("Failed to delete note");
  }
    // має виконувати запит для видалення нотатки за заданим ідентифікатором. 
    // Приймає ID нотатки та повертає інформацію про видалену нотатку у відповіді.
}