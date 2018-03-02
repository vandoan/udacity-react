import React, { Component }		from 'react'



class  BuildOptionsSearch extends Component {

	render() {
		const { books, bookCurrent, onUpdateShelf } = this.props
		let currentType = "none"

		
		for(let book of books) {
			if(book.id === bookCurrent.id) { // check id against user books id
				currentType = book.type // if match, set the type
			}
		} 

		return (

          	<select defaultValue={currentType} onChange={(e) => onUpdateShelf(bookCurrent, e.target.value)}>
          		<option value="none" disabled>Move to...</option>
				<option value="currentlyReading">Currently Reading</option>
				<option value="read">Read</option>
				<option value="wantToRead">Wish List</option>
				<option value="none">none</option>
			</select>
		)

	}
}

export default BuildOptionsSearch