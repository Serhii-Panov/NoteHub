import css from "./SearchBox.module.css"

interface SearchBoxProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery?: string;
}

export default function SearchBox(props: SearchBoxProps) {
  return (
          <input
            className={css.input}
            type="text"
            name="query"
            placeholder="Search notes"
            onChange={props.onSearch}
            defaultValue={props.searchQuery}
            />
  );
}
