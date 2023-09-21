/**
 * Utility method to fetch user list.
 */
export default async function fetchUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Failed to download data: ${error}`);
  }
}
