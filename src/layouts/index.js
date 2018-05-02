import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Sidebar from '../components/sidebar'
import './index.css'
import './styles.css'

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Todos los viernes una canción' },
        { name: 'keywords', content: 'música, music' },
      ]}
    />
    <Sidebar siteTitle={data.site.siteMetadata.title} />
    <div className="content container">
      {children()}
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
