import axios from 'axios'

export async function search(qry: string) {
  return axios.get('https://hoogle.haskell.org', {
    params: {
      hoogle: qry,
      scope: '',
      mode: 'json',
    },
  })
}
