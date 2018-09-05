import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/lib/Table'
import './bootstrap.css'
import './IndexPage.css'

const propTypes = {
  initialName: PropTypes.string,
}

const defaultProps = {
  initialName: 'Аноним',
}

class IndexPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      auto: [],
    }

    this.deleteAuto = this.deleteAuto.bind(this)
  }

  componentDidMount () {
    this.getAuto()
  }

  getAuto () {
    fetch('http://localhost:8080/auto').
      then(response => response.json()).
      then(response => this.setState({auto: response})).
      catch(error => console.log(error))
  }

  deleteAuto (e, id) {
    e.preventDefault()
    fetch('http://localhost:8080/auto/' + id).then(res => {
      this.setState(prevState => ({
        auto: prevState.auto.filter(item => item.id !== id),
      }))
    })
  }

  render () {
    return (
      <div className='App'>
        <Link to='/addForm'>Добавить</Link>
        <Table striped bordered condensed hover>
          <thead>
          <tr>
            <th>Марка</th>
            <th>Модель</th>
            <th>Год</th>
            <th>Пробег, км</th>
            <th>Цена, ₽</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {this.state.auto.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{item.marque}</td>
                <td>{item.model}</td>
                <td>{item.year}</td>
                <td>{item.haul}</td>
                <td>{item.price}</td>
                <td>
                  <Link to={{
                    pathname: '/editForm',
                    state: {item: item},
                  }}>Редактировать</Link><br/>
                  <a href="#"
                     onClick={(e) => this.deleteAuto(e, item.id)}>Удалить</a>
                </td>
              </tr>
            )
          })}
          </tbody>
        </Table>
      </div>
    )
  }
}

IndexPage.propTypes = propTypes
IndexPage.defaultProps = defaultProps

export default IndexPage