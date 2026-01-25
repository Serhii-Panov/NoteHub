import { fetchNoteById } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NoteDetailsClient from "./page.client";

type Props = {
  params: Promise<{ id: string }>;
};
const queryClient = new QueryClient();

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });
  return (
    <div>
      <h1>Note Details for ID: {id}</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient/>
      </HydrationBoundary>
    </div>
  );
};

export default NoteDetails;
