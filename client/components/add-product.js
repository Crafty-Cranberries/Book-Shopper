import React from 'react'
import {newProduct} from '../store'
import {connect} from 'react-redux'
import AddProductForm from './add-product-form'

class AddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      author: '',
      price: 0.0,
      coverImg: '',
      genre: '',
      synopsis: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    const info = {
      productInfo: {
        title: event.target.title.value,
        author: event.target.author.value,
        price: event.target.price.value,
        genre: event.target.genre.value,
        synopsis: event.target.synopsis.value
      },
      coverImg: event.target.coverImg.value
    }
    this.props.newProduct(info)
    this.setState({
      title: '',
      author: '',
      price: 0.0,
      coverImg: '',
      genre: '',
      synopsis: ''
    })
  }
  render() {
    return (
      <div>
        <AddProductForm
          handleSubmit={this.handleSubmit}
          state={this.state}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  newProduct: event => dispatch(newProduct(event))
})

export default connect(null, mapDispatch)(AddProduct)
