import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

import { useState } from "react";

interface PaginateProps {
  totalPages: number;
  onChangePage: (page: number) => void;
}

export function Paginate(props: PaginateProps) {
  const { totalPages, onChangePage } = props;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const previousPage = (): void => {
    if (currentPage === 1) return;

    onChangePage(currentPage - 1);

    setCurrentPage(currentPage - 1);
  }

  const nextPage = (): void => {
    if (currentPage >= totalPages) return;

    onChangePage(currentPage + 1);

    setCurrentPage(currentPage + 1);
  }

  const getPaginationItems = () => {
    const items = [];

    // Always show the first page
    items.push(1);

    // Show leading ellipsis if currentPage is beyond the third page
    if (currentPage > 4) {
      items.push("...");
    }

    // Define the range around the current page
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    // Add the range of pages around the current page
    for (let i = startPage; i <= endPage; i++) {
      items.push(i);
    }

    // Show trailing ellipsis if currentPage is not near the end
    if (currentPage < totalPages - 3) {
      items.push("...");
    }

    // Always show the last page
    if (totalPages > 1) {
      items.push(totalPages);
    }

    return items;
  };


  const changePage = (page: number): void => {
    console.log({ page });

    onChangePage(page);
    setCurrentPage(page);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className="cursor-pointer" onClick={() => previousPage()} />
        </PaginationItem>

        {getPaginationItems().map((page, index) => (
          <PaginationItem key={index} className="cursor-pointer">
            <PaginationLink
              onClick={() => typeof page === 'number' && changePage(page)}
              isActive={currentPage === page}
              className={currentPage === page ? "text-black" : ""}
            >
              {typeof page === 'number' ? page : page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext className="cursor-pointer" onClick={() => nextPage()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}