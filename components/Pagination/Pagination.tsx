import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
currentPage: number;
totalPages: number;
onPageChange: (selectedItem: { selected: number }) => void;
}

export default function Pagination(props: PaginationProps) {
    return (
        <ReactPaginate
            pageCount={props.totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={props.onPageChange}
            forcePage={props.currentPage - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
            />
    );
}