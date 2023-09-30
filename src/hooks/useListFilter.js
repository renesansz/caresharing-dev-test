import { useMemo } from "react";

function doesItemHaveNameProperty(item) {
  return !!item?.name;
}

/**
 * A hook method to filter out the list by search string.
 *
 * This returns a new array (`filteredList`) that contains the filtered items.
 *
 * @param {array<string, object>} list
 * @param {string} searchFilter
 * @returns {array}
 */
export default function useListFilter(list = [], searchFilter = '') {
  const filteredList = useMemo(
    () => list.filter((item) => {
      if (!searchFilter.length) {
        return true;
      }
      /**
       * NOTE: I think the repetitive usage of `.toLowerCase` can still be improved 🤔
       * I don't think refactoring this can bring noticeable performance improvement, so let's continue with this for now...
       *
       * ANOTHER NOTE: Make search filter case insensitive
      */
      if (doesItemHaveNameProperty(item)) {
        return item.name.toLowerCase().includes(searchFilter.toLowerCase());
      } else if (typeof item === "string") {
        return item.toLowerCase().includes(searchFilter.toLowerCase());
      }
      return false;
    }),
    [list, searchFilter]
  );

  return {
    filteredList,
  };
}
