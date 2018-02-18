import React, { Component } 	from 'react'
import { Link } 				from 'react-router-dom'


class ListBookshelf extends Component {
	render() {
    	const { books, onUpdateShelf } = this.props
		return (
			<div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">

	                { books.filter((book) => {
	              		return book.shelf == "read"
	              	})
	              	.map((book) => (
		              	<li key={book.id}>
		              		<div className="book">
		                      <div className="book-top">
		                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url('+ book.imageLinks.thumbnail + ')' }}></div>
		                        <div className="book-shelf-changer">
		                          <select onChange={(e) => onUpdateShelf(book, e.target.value)}>
		                            <option value="none" disabled>Move to...</option>
		                            <option value="read">Read</option>
		                            <option value="currentlyReading">Currently Reading</option>
		                            <option value="wantToRead">Want to Read</option>
		                            <option value="none">None</option>
		                          </select>
		                        </div>
		                      </div>
		                      <div className="book-title">{book.title}</div>
		                      <div className="book-authors">{book.author}</div>
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


export default ListBookshelf