import React, { Component }   from 'react'
import { Link }               from 'react-router-dom'
import ListCurrent            from './ListCurrent'
import ListBookshelf          from './ListBookshelf'
import ListNext               from './ListNext'
import PropTypes              from 'prop-types'


class ListAll extends Component {

static propTypes = {
  onUpdateShelf: PropTypes.func.isRequired
}

  render() {
    
    const { books, onUpdateShelf } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <ListCurrent 
              books={books} 
              onUpdateShelf={onUpdateShelf} 
            />
            <ListBookshelf 
              books={books} 
              onUpdateShelf={onUpdateShelf}
            />
            <ListNext 
              books={books}
              onUpdateShelf={onUpdateShelf} 
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
      )
  }
}

export default ListAll