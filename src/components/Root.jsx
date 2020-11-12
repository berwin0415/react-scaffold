import React from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'

export default function Root({ route }) {
  return <>{renderRoutes(route.routes)}</>
}
Root.propTypes = {
  route: PropTypes.object,
}
