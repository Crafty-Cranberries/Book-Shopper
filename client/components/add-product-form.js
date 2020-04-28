import React from 'react'

export default function AddProductForm(props) {
  console.log(props)
  const {handleSubmit} = props
  return (
    <div>
      <form key="submit-form" onSubmit={handleSubmit}>
        <label htmlFor="title"> Title: </label>
        <input
          name="title"
          type="text"
          value={props.title}
          // onChange={props.handleChange}
        />
        <label htmlFor="author"> Author: </label>
        <input
          name="author"
          type="text"
          value={props.author}
          // onChange={props.handleChange}
        />
        <label htmlFor="price"> Price: $</label>
        <input
          name="price"
          type="number"
          value={props.price}
          // onChange={props.handleChange}
        />
        <label htmlFor="coverImg"> Cover Image URL: </label>
        <input
          name="coverImg"
          type="text"
          value={props.coverImg}
          // onChange={props.handleChange}
        />
        <label htmlFor="genre"> Genre: </label>
        <input
          name="genre"
          type="text"
          value={props.genre}
          // onChange={props.handleChange}
        />
        <label htmlFor="synopsis"> Synopsis: </label>
        <input
          name="synopsis"
          type="text"
          value={props.synopsis}
          // onChange={props.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
