import {API_BASE_URL, ACCESS_TOKEN} from './config';

export default function fetchListing(path = '') {
  const URL = `${API_BASE_URL}/files/list_folder`;
  return fetch(URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      path,
    }),
  })
    .then(res => res.json())
    .then(res => res)
    .catch(error => error);
}
