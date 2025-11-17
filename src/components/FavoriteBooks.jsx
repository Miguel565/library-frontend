import { useQuery } from '@apollo/client/react'
import { GET_USER, GET_BOOKS_BY_GENRE } from '../queries'

// eslint-disable-next-line react/prop-types
const FavoriteBooks = ({ show }) => {
    const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER)

    const favoriteGenre = userData?.me?.favoriteGenre

    const { data: booksData, loading: booksLoading, error: booksError } = useQuery(GET_BOOKS_BY_GENRE, {
        skip: !favoriteGenre,
        variablees: { genre: favoriteGenre }
    })

    if (!show) return null
    if (userLoading || booksLoading) return <div>Loading...</div>
    if (userError) return <div>Error loading user data</div>
    if (booksError) return <div>Error loading books data</div>

    return (
        <div>
            <h2>Libros de tu genero favorito: {favoriteGenre}</h2>
            <ul>
                {booksData?.allBooks?.map(b => (
                    <li key={b.id}>
                        {b.title} - {b.author.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FavoriteBooks