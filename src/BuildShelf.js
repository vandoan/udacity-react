import React, { Component }   from 'react'


class BuildShelf extends Component {

  render() {
    const {
      books, 
      typeShelf,
      typesShelf,
      titleShelf,
      onUpdateShelf,
    } = this.props 

        
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{titleShelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { books.filter((book) => {
              return book.shelf == typeShelf
            })
            .map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+ book.imageLinks.thumbnail + ')' }}></div>
                    <div className="book-shelf-changer">
                      <select
                        onChange={(event) => onUpdateShelf(book, event.target.value)}>
                        value={book.shelf}
                      >
                        <option value="none" disabled>Move to...</option>
                        <option value="{typeShelf}">  {titleShelf} </option>

                        { typesShelf.filter((shelf) => {
                            return shelf.type !== typeShelf
                          }).map((shelf) => (
                            <option value={shelf.type}>{shelf.title}</option>
                          ))
                        }
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))
          }

          </ol>
        </div>
      </div>
    )
  }
}


export default BuildShelf