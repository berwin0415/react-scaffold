import React from 'react'
import { renderRoutes } from 'react-router-config'
import { Router } from 'react-router'
import routes from '../routes'
import history from './history'

export default function App() {
  return <Router history={history}>{renderRoutes(routes)}</Router>
}
