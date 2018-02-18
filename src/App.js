import React, { Component }   from 'react'
import ListAll                from './ListAll'
import SearchBooks            from './SearchBooks'
import * as BooksAPI          from './BooksAPI'
import { Switch, BrowserRouter, Route }     from 'react-router-dom'
import './App.css'



class BooksApp extends Component {
  componentDidMount() {
    BooksAPI
      .getAll()
      .then((books) => {
        this.setState({booksApi: books})
      })
  }
 
  updateShelf = (book, shelf) => {
    BooksAPI
      .update(book, shelf)
      .then(updated => (BooksAPI.getAll().then((books) => {
        this.setState({booksApi: books})
        // this.updateSearchedResult(this.state.filteredBooks)
      })))
  }

  state = {
    booksApi: [],
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => (

              <ListAll
                pie={this.pie}
                books={this.state.booksApi}
                onUpdateShelf={this.updateShelf} 
              /> 
            )} />
            <Route path="/search" render={() => (
              <SearchBooks 
                books={this.state.booksApi} 
                onUpdateShelf={this.updateShelf} 
              />
            )} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

/**
 * TODO: Instead of using this state variable to keep track of which page
 * we're on, use the URL in the browser's address bar. This will ensure that
 * users can use the browser's back and forward buttons to navigate between
 * pages, as well as provide a good URL they can bookmark and share.
 */
 
export default BooksApp
