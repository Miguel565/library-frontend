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
        author
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