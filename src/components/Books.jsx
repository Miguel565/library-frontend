/* eslint-disable react/prop-types */
import { useQuery, useSubscription } from '@apollo/client/react'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'
import { useState } from 'react'

// eslint-disable-next-line react/prop-types
const Filter = ({ genres, setFilter }) => {
  return (
    <div>
      {
        // eslint-disable-next-line react/prop-types
        genres.map(g => (
          <button key={g} onClick={() => setFilter(g)}>{g}</button>
        ))
      }
    </div>
  )
}

// eslint-disable-next-line react/prop-types
const Book = ({ books, filter }) => {
  return (
    <div>
      {filter === "" ? null : <p>in genre: <strong>{filter}</strong></p>}
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map(a => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Books = (props) => {

  const { loading, data, error, client } = useQuery(ALL_BOOKS, {
    pollInterval: 30000
  })

  const [filter, setFilter] = useState("")

  useSubscription(BOOK_ADDED, {
    onData: ({ data: subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded
      client.cache.updateQuery({ query: ALL_BOOKS}, (olData) => {
        if (!olData) return { allBooks: [newBook] }
        if ( olData.allBooks.some(b => b.id === newBook.id)) return olData
        return {
          allBooks: [...olData.allBooks, newBook]
        }
      })
      window.alert(`Nuevo libro agregado: "${newBook.title}"`)
    }
  })

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div><p>Error: {error.message}</p></div>
  }

  const books = data.allBooks

  console.log('Books:', books)

  const allGenres = books.flatMap(b => b.genres)

  const uniqueGenres = Array.from(new Set(allGenres))

  const handleFilter = (value) => {
    setFilter(value)
  }

  const filteredBooks = filter === ""
    ? books
    : books.filter(book => 
      book.genres.some(g => g.toLowerCase().includes(filter.toLowerCase()))
    )

  return (
    <div>
      <h2>Books</h2>
      <Book books={filteredBooks} filter={filter} />
      <Filter genres={uniqueGenres} setFilter={handleFilter} />
    </div>
  )
}

export default Books
