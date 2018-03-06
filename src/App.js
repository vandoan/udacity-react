import React, { Component }   from 'react'
import BuildShelves           from './BuildShelves'
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
 
  updateShelf = (bookNew, shelfNew) => {

      BooksAPI.update(bookNew, shelfNew).then(response =>{
      // set shelf for new or updated book
      bookNew.shelf = shelfNew

      // get list of books without updated or new book
      var updatedBooks = this.state.booksApi.filter( book => book.id !== bookNew.id )

      // add book to array and set new state
      updatedBooks.push(bookNew);
      this.setState({ booksApi: updatedBooks })
    })

      console.log(shelfNew)

BooksAPI.get(bookNew.id).then(book => {
  console.log(book.shelf)
})


      console.log(bookNew.id)
  }

  state = {
    booksApi: [],
    shelf:    [
      { 
        'type'  : 'read',
        'title' : 'Read'
      },
      { 
        'type'  : 'wantToRead',
        'title' : 'Wish List' 
      },
      { 
        'type'  : 'currentlyReading',
        'title' : 'Currently Reading'
      },
    ],
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => (

              <BuildShelves
                books={this.state.booksApi}
                typesShelf={this.state.shelf}
                onUpdateShelf={this.updateShelf} 
              /> 
            )} />
            <Route path="/search" render={() => (
              <SearchBooks 
                books={this.state.booksApi} 
                typesShelf={this.state.shelf}
                onUpdateShelf={this.updateShelf} 
              />
            )} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
 
 
export default BooksApp
