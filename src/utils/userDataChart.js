import { faker } from '@faker-js/faker';

import { labels } from "@/constants/DataChart";

/**
 * Factory method for initializing fake dataset based on the user list, this will be specifically used for `DataChart` component.
 *
 * @param {array} users
 * @returns {array}
 */
export default function makeUserDataset(users) {
  const generatedDataset = users.map((user) => ({
    id: user.id,
    label: user.name,
    data: labels.map(() => faker.number.int({ min: 0, max: 1000 }))
  }))

  return (filteredUsers) => generatedDataset.filter(({ id }) => !!filteredUsers?.find((user) => user.id === id));
}
