import { useEffect, useMemo, useState } from "react";

const ITEM_PER_PAGE = 5;
const MIN_PAGE = 1;

/**
 * A hook method to divide the list via pagination.
 *
 * This returns a new array (`paginatedList`) that contains the paginated items.
 *
 * @param {array<string, object>} list
 * @returns {array}
 */
export default function useListPagination(list = []) {
  const [currentPage, setCurrentPage] = useState(MIN_PAGE);

  const startIdx = useMemo(() => currentPage * ITEM_PER_PAGE - ITEM_PER_PAGE, [currentPage]);
  const maxPage = useMemo(() => Math.ceil(list.length / ITEM_PER_PAGE) || MIN_PAGE, [list]);
  const paginatedList = useMemo(
    () => list.slice(startIdx, startIdx + ITEM_PER_PAGE),
    [list, startIdx]
  );

  /**
   * NOTE: When the list changes we have to reset the current page to 1.
   *       Otherwise, search filter won't show the correct results for page 2 and above.
  */
  useEffect(() => {
    setCurrentPage(1);
  }, [list]);

  const nextPage = () => {
    setCurrentPage((prevValue) => (
      prevValue < maxPage ? prevValue + 1 : prevValue
    ));
  };

  const prevPage = () => {
    setCurrentPage((prevValue) => (
      prevValue > MIN_PAGE ? prevValue - 1 : prevValue
    ));
  };

  return {
    paginatedList,
    currentPage,
    maxPage,
    nextPage,
    prevPage
  };
}
