import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Sidebar from './sidebar'
import './index.css'
import './styles.css'

const Layout = ({ children }) => (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
            site {
            siteMetadata {
                title
            }
            }
        }
        `}
      render={data => (
          <div>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                  { name: 'description', content: 'Todos los viernes una canción' },
                  { name: 'keywords', content: 'música, music' },
              ]}
            >
              <link rel="manifest" href="site.webmanifest" />
              <link rel="apple-touch-icon" href="icon.png" />
              <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
              <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />
            </Helmet>
            <Sidebar siteTitle={data.site.siteMetadata.title} />
            <div className="content container">
              {children}
            </div>
          </div>
      )}/>
)

export default Layout
