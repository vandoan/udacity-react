import React, { Component }   from 'react'
import { Link }               from 'react-router-dom'
import BuildShelf             from './BuildShelf'
import PropTypes              from 'prop-types'


class ListAll extends Component {

static propTypes = {
  onUpdateShelf: PropTypes.func.isRequired
}

  render() {
    
    const { typesShelf, books, onUpdateShelf } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BuildShelf 
              books={books} 
              typesShelf={typesShelf}
              typeShelf="currentlyReading"
              titleShelf="Currently Reading"
              onUpdateShelf={onUpdateShelf} 
            />
            <BuildShelf 
              books={books} 
              typesShelf={typesShelf}
              typeShelf="read"
              titleShelf="Read"
              onUpdateShelf={onUpdateShelf} 
            />
            <BuildShelf 
              books={books} 
              typesShelf={typesShelf}
              typeShelf="wantToRead"
              titleShelf="Wish List"
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