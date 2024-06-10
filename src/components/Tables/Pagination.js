import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationComponent = ({ currentPage, totalPages, paginate }) => {
  return (
    <Pagination aria-label="Page navigation example" size="60">
      <PaginationItem disabled={currentPage <= 1}>
        <PaginationLink
          previous
          onClick={() => paginate(currentPage - 1)}
          style={{ fontSize: "24px" }}
        />
      </PaginationItem>
      <PaginationItem disabled={currentPage >= totalPages}>
        <PaginationLink
          next
          onClick={() => paginate(currentPage + 1)}
          style={{ fontSize: "24px" }}
        />
      </PaginationItem>
      <div style={{ margin: "auto" }}>
        Page {currentPage} of {totalPages}
      </div>
    </Pagination>
  );
};

export default PaginationComponent;
