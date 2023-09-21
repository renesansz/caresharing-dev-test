import { useContext, useState } from "react";

import UserContext from "@/contexts/UserContext";
import useListFilter from "@/hooks/useListFilter";
import useListPagination from "@/hooks/useListPagination";

import styles from "./UserList.module.css";

export default function UserList() {
  const [searchFilter, setSearchFilter] = useState('');

  const { users } = useContext(UserContext);
  /**
   * We'll break down the logic for filtering and paginating the list.
   * This way, it will be easy for us to separate the concerns for implementing a dynamic list.
   *
   * Let's rely on pure JS filtering since we don't need complicated features from external libraries
   * just to implement search filter + paginated list 🤷🏽.
   */
  const { filteredList } = useListFilter(users, searchFilter);
  const {
    paginatedList: userList,
    currentPage,
    maxPage,
    nextPage,
    prevPage
  } = useListPagination(filteredList);

  const onSearchFieldChanged = (evt) => {
    setSearchFilter(evt.target.value);
  };

  return (
    <div className={styles.userListWrapper}>
      <input value={searchFilter} onChange={onSearchFieldChanged} placeholder="Filter user name..." />
      <ul className={styles.userList}>
        {userList.map((user) => <li key={user.id}>{user.name}</li>)}
      </ul>
      <div className={styles.controlWrapper}>
        <button onClick={prevPage}>&lt;</button>
        <p>Page: {currentPage}/{maxPage}</p>
        <button onClick={nextPage}>&gt;</button>
      </div>
    </div>
  );
}
