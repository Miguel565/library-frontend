import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
import { ALL_AUTHORS, EDIT_BORN } from '../queries'

const Authors = (props) => {

  const [newBorn, setNewBorn] = useState(0)
  const [authorName, setAuthorName] = useState('')

  const { loading, error, data } = useQuery(ALL_AUTHORS, { pollInterval: 20000 })

  const [editBorn, result] = useMutation(EDIT_BORN)

  if (!props.show) {
    return null
  }

  if (loading)  {
    return <div>loading...</div>
  }
  if (error)  {
    return <div><p>Error! {error.message}</p></div>
  }

  const authors = data.allAuthors

  const handleBorn = async (event) => {
    event.preventDefault()

    setAuthorName(event.target.authorSelected.value)

    editBorn({ variables: { authorName, newBorn } })

    setAuthorName('')
    setNewBorn(0)
  }


  /*
  useEffect(() => {
    if (result.data && !result.data.editBorn) {
      console.log('author not found!!')
    }
  }, [result.data]) // eslint-disable-line

 */

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Born</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <form onSubmit={handleBorn}>
        <div>
          <label>Selecciona autor: </label>
          <select name="authorSelected">
            <option value="">--- Seleccionar ---</option>
            {authors.map(a => (
              <option key={a.id} value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>
            Born:
            <input type="number"
              value={newBorn}
              onChange={({ target }) => setNewBorn(target.value)}
            />
          </label>
        </div>
        <button>update author</button>
      </form>
    </div>
  )
}

export default Authors
