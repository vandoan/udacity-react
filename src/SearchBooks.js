import { Link } 				from 'react-router-dom'
import escapeRegExp 			from 'escape-string-regexp'
import React, { Component }		from 'react'
import * as BooksAPI          	from './BooksAPI'
import BuildOptionsSearch		from './BuildOptionsSearch'



class SearchBooks extends Component {
	state = {
		query: '',
		booksSearch: [],
		errorSearch: false,
	}	

	searchBooks = (e) => {
		const query = e.target.value
		this.setState({ query: query })

		if(query.length === 0) {
			this.clearStateBooks()
		} else {
			BooksAPI.search(query)
			.then((booksReturned) => {
				console.log(booksReturned)
				if(booksReturned.error){
					this.setState({ errorSearch: true })
					this.setState({ booksSearch: [] })
					console.log("Book search error")
				} else {
					this.setState({ errorSearch: false })
					this.setState({ booksSearch: booksReturned })
				}
			})
		}
	}

	updateQuery = (query) => {
		this.setState({ query: query })
	}

	render() {
		const { query, booksSearch }	= this.state
		const { books, typesShelf, onUpdateShelf } 	= this.props

		let bookView
		if (query > 0) {
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
				    	onChange={(event) => this.searchBooks(event)}
				    />
				  </div>

				</div>
				<div className="search-books-results">
				  <ol className="books-grid">
		            { booksSearch.map((book) => (
		            	 
		              <li key={book.id}>
		                <div className="book">
		                  <div className="book-top">
		                  { book.imageLinks && 
		                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
		                    }
		                    <div className="book-shelf-changer">
		                    	<BuildOptionsSearch books={books} bookCurrent={book} onUpdateShelf={onUpdateShelf} />
		                      
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