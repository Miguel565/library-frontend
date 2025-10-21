import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BORN } from '../queries'

const Authors = (props) => {

  const [authorName, setAuthorName] = useState('')
  const [newBorn, setNewBorn] = useState(0)

  if (!props.show) {
    return null
  }

  const { loading, error, data } = useQuery(ALL_AUTHORS, { pollInterval: 2000 })

  const [editBorn, result] = useMutation(EDIT_BORN)

  if (loading)  {
    return <div>loading...</div>
  }
  if (error)  {
    return <div><p>Error! {error}</p></div>
  }

  const authors = data.allAuthors

  const handleBorn = async (event) => {
    event.preventDefault()

    editBorn({ variables: { authorName, newBorn } })

    setAuthorName('')
    setNewBorn(0)
  }

  useEffect(() => {
    if (result.data && !result.data.editBorn) {
      console.log('author not found!!')
    }
  }, [result.data]) // eslint-disable-line

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
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
          <label>
            Name:
            <input type="text"
              value={authorName}
              onChange={({ target }) => setAuthorName(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Born:
            <input type="num"
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
