
export function bggNameSearch(queryString = '') {
  let queryTerm = queryString
  let typeQuery = '&type=boardgame'
  let exactQuery = ''

  if(queryString.indexOf('+') >= 0) {
    queryTerm = queryTerm.replaceAll('+', '')
    typeQuery = ``
  }

  if(queryString.startsWith('"') && queryString.endsWith('"')) {
    queryTerm = queryTerm.slice(1, -1)
    exactQuery = `&exact=true`
  }

  const controller = new AbortController();
  const { signal } = controller;

  const fetchPromise: any = fetch(`https://api.geekdo.com/xmlapi2/search?query=${queryTerm}${typeQuery}${exactQuery}`, {signal})
    .then(resp => resp.text())
    .then(stringData => {
      const xmlData = new DOMParser().parseFromString(stringData, "application/xml")

      const data = Array.prototype.slice.call(xmlData.documentElement.children).map(item => {
        const nameEle = [...item.children].find(attr => attr.tagName === 'name')
        const yearEle = [...item.children].find(attr => attr.tagName === 'yearpublished')
        return {
          name: nameEle && nameEle.getAttribute('value') || '',
          bggId: Number(item.getAttribute('id')),
          yearPublished: yearEle && Number(yearEle.getAttribute('value')) || 0,
        }
      })
      return data
    })
    .catch(err => {
      console.log('Error looking up game names', err)
    })

  fetchPromise.cancel = () => controller.abort()

  return fetchPromise
}

export default bggNameSearch