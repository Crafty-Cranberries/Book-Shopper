import React from 'react'
import {Form, Button} from 'react-bootstrap'

export default function AddProductForm(props) {
  const {handleSubmit} = props
  return (
    <div>
      <Form key="submit-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label htmlFor="title"> Title:</Form.Label>
          <Form.Control
            name="title"
            type="text"
            value={props.state.title}
            onChange={props.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="author"> Author: </Form.Label>
          <Form.Control
            name="author"
            type="text"
            value={props.state.author}
            onChange={props.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="price"> Price: $</Form.Label>
          <Form.Control
            name="price"
            type="number"
            value={props.state.price}
            onChange={props.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="coverImg"> Cover Image URL: </Form.Label>
          <Form.Control
            name="coverImg"
            type="text"
            value={props.state.coverImg}
            onChange={props.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="genre"> Genre: </Form.Label>
          <Form.Control
            name="genre"
            type="text"
            value={props.state.genre}
            onChange={props.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="synopsis"> Synopsis: </Form.Label>
          <Form.Control
            name="synopsis"
            type="text"
            value={props.state.synopsis}
            onChange={props.handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}
