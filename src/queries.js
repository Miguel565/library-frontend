import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
    allAuthors {
        name
        born
        bookCount
        id
    }
}
`

export const ALL_BOOKS = gql`
query {
    allBooks {
        title
        author { name, born }
        published
        id
    }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
    ) {
        title
        author
        published
        id
    }
}
`

export const EDIT_BORN = gql`
mutation editBorn($name: String!, $newBorn: Int!) {
    editBorn(name: $name, born: $newBorn) {
        name
        born
        bookCount
        id
    }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
        value
    }
}
`

export const GET_USER = gql`
query {
    me {
        username
        favoriteGenre
    }
}
`

export const GET_BOOKS_BY_GENRE = gql`
query allBooks($genre: String!) {
    allBooks(genre: $genre) {
        id
        title
        author { name, born }
    }
}
`

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
    id
    title
    author { name, born}
    published
    genres
}
`

export const BOOK_ADDED = gql`
subscription {
    bookAdded {
        ...BookDetails
    }
}
${BOOK_DETAILS}
`