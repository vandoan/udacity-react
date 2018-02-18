import { Link } 					from 'react-router-dom'
import escapeRegExp 				from 'escape-string-regexp'
import React, { Component }			from 'react'


class SearchBooks extends Component {
	state = {
		query: ''
	}
	
	updateQuery = (query) => {
		this.setState({ query: query })
	}

	render() {
		const { query }					= this.state
		const { books, typesShelf, onUpdateShelf } 	= this.props

		let bookView
		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i')
			bookView = books.filter((book) => 
				match.test(book.title) || match.test(book.authors) 
			)
		} else {
			bookView = books
		}

		return (
			<div className="search-books">
				<div className="search-books-bar">
				  <Link className="close-search" to="/">Close</Link>
				  <div className="search-books-input-wrapper">
				    
				    <input
				    	type="text"
				    	value={this.state.query}
				    	placeholder="Search by title or author"
				    	onChange={(event) => this.updateQuery(event.target.value)}
				    />

				  </div>
				</div>
				<div className="search-books-results">
				  <ol className="books-grid">
		            { bookView.map((book) => (
		              <li key={book.id}>
		                <div className="book">
		                  <div className="book-top">
		                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+ book.imageLinks.thumbnail + ')' }}></div>
		                    <div className="book-shelf-changer">
		                      <select onChange={(e) => onUpdateShelf(book, e.target.value)}>
		                        <option value="none" disabled>Move to...</option>
		                        {
		                        	typesShelf.filter((type) => {
		                        		return book.shelf === type.type
		                        	}).map((book) => (
		                        		<option value={book.type}>{book.title}</option>
		                        	))
		                        }
		                        {
		                        	typesShelf.filter((type) => {
		                        		return book.shelf !== type.type
		                        	}).map((book) => (
		                        		<option value={book.type}>{book.title}</option>
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
		            )) }
				  </ol>
				</div>

				{/*
			      NOTES: The search from BooksAPI is limited to a particular set of search terms.
			      You can find these search terms here:
			      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

			      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
			      you don't find a specific author or title. Every search is limited by search terms.
			    */}
			</div>
		)
	}
}


export default SearchBooks