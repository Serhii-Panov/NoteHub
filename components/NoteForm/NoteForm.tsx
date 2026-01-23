import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { createNote } from "../../services/noteService";
import type { CreateNote, Note } from "../../types/note";
import css from "./NoteForm.module.css";
import * as Yup from "yup";

interface NoteFormProps {
  onClose: () => void;
}

const initialValues: CreateNote = {
  title: "",
  content: "",
  tag: "Todo",
};
const NoteSchema = Yup.object().shape({
  title: Yup.string().min(3, "Title is too short").max(50,"Title is too long" ).required("Title is required"),
  content: Yup.string().max(500, "are you writing a book here? make it shorter"),
  tag: Yup.string().oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"]).required("Tag is required"),
});
export default function NoteForm(props: NoteFormProps) {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const {mutate, isPending} = useMutation({
    mutationFn: createNote,
    onSuccess: (data: Note) => {
      console.log("Note created:", data);
    },
    onError: (error) => {
      console.error("Error creating note:", error);
    },
  });
  const handleSubmit = (values: CreateNote) => {
    mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notes'] });
        props.onClose();
      },
    });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-title`}>Title</label>
            <Field
              id={`${fieldId}-title`}
              type="text"
              name="title"
              className={css.input}
            />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>
        <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-content`}>Content</label>
            <Field
              as="textarea"
              id={`${fieldId}-content`}
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
        </div>

        <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-tag`}>Tag</label>
            <Field
              as="select"
              id={`${fieldId}-tag`}
              name="tag"
              className={css.select}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
        </div>

        <div className={css.actions}>
          <button
            onClick={props.onClose}
            type="button"
            className={css.cancelButton}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
