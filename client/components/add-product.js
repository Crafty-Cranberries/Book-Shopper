import React from 'react'
import {newProduct} from '../store'
import {connect} from 'react-redux'
import axios from 'axios'
import AddProductForm from './add-product-form'

class AddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      //   title: '',
      //   author: '',
      //   price: 0.0,
      //   coverImg: 'https://wfbf.com/wp-content/uploads/2016/08/cover.jpg',
      //   genre: '',
      //   synopsis: '',
    }
    // this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  //   handleChange(event) {
  //     this.setState({
  //       [event.target.name]: event.target.value,
  //     })
  //   }

  handleSubmit(event) {
    event.preventDefault()
    console.log('EVENT ---->:', event.target.value)
    // const info = {
    //   title: event.target.title.value,
    //   author: event.target.author.value,
    //   price: event.target.price.value,
    //   coverImg: event.target.coverImg.value,
    //   genre: event.target.genre.value,
    //   synopsis: event.target.synopsis.value,
    // }
    // newProduct(info)
    // this.setState({
    //   title: '',
    //   author: '',
    //   price: 0.0,
    //   coverImg: 'https://wfbf.com/wp-content/uploads/2016/08/cover.jpg',
    //   genre: '',
    //   synopsis: '',
    // })
  }

  render() {
    // const {title, author, price, coverImg, genre, synopsis} = this.state

    return (
      <div>
        <AddProductForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  newProduct: event => dispatch(newProduct(event))
})

export default connect(null, mapDispatch)(AddProduct)
