import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Col from 'react-bootstrap/lib/Col'
import Form from 'react-bootstrap/lib/Form'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Button from 'react-bootstrap/lib/Button'

class EditFormPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.location.state.item.id,
      marque: this.props.location.state.item.marque,
      model: this.props.location.state.item.model,
      year: this.props.location.state.item.year,
      haul: this.props.location.state.item.haul,
      price: this.props.location.state.item.price,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
    const {id, marque, model, year, haul, price} = this.state
    fetch('http://localhost:8080/auto', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        id,
        marque,
        model,
        year,
        haul,
        price,
      }),
    }).then(res => {
      this.setState({
        fireRedirect: true,
      })
    })
  }

  render () {
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        {this.state.fireRedirect && <Redirect to='/' push={true}/>}
        <FormGroup controlId="formHorizontalMarque">
          <Col componentClass={ControlLabel} sm={2}>
            Марка
          </Col>
          <Col sm={10}>
            <FormControl name="marque" type="text" value={this.state.marque}
                         onChange={this.handleChange} required/>
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalModel">
          <Col componentClass={ControlLabel} sm={2}>
            Модель
          </Col>
          <Col sm={10}>
            <FormControl name="model" type="text" value={this.state.model}
                         onChange={this.handleChange} required/>
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalYear">
          <Col componentClass={ControlLabel} sm={2}>
            Год
          </Col>
          <Col sm={10}>
            <FormControl name="year" type="number" value={this.state.year}
                         onChange={this.handleChange} required/>
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalHaul">
          <Col componentClass={ControlLabel} sm={2}>
            Пробег
          </Col>
          <Col sm={10}>
            <FormControl name="haul" type="number" value={this.state.haul}
                         onChange={this.handleChange} required/>
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalPrice">
          <Col componentClass={ControlLabel} sm={2}>
            Цена
          </Col>
          <Col sm={10}>
            <FormControl name="price" type="number" value={this.state.price}
                         onChange={this.handleChange} required/>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button bsStyle="success" type="submit">Сохранить</Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

export default EditFormPage