import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AddFormPage from './components/AddFormPage'
import IndexPage from './components/IndexPage'
import EditFormPage from './components/EditFormPage'

export default (
  <Switch>
    <Route exact path='/' component={IndexPage}/>
    <Route path='/addForm' component={AddFormPage}/>
    <Route path='/editForm' component={EditFormPage}/>
    <Route path='*' render={() => <Redirect to='/'/>}/>
  </Switch>
)