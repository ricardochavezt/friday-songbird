import React from 'react'
import { Link } from 'gatsby'

import songbirdPic from './logo_songbird.jpg'
import rssIcon from './rss_icon.svg'
// Icono: RSS by Javi Ayala (https://thenounproject.com/javi_al) from The Noun Project (https://thenounproject.com/)

const Sidebar = ({ siteTitle }) => (
  <div className="sidebar">
      <div className="container sidebar-sticky">
          <div className="sidebar-about">
              <div style={{
                  marginLeft: "auto",
                  marginRight: "auto"
              }}>
                  <img alt="songbird" src={songbirdPic} style={{
                      borderRadius:"64px"
                  }} />
              </div>
              <h1><Link to="/">{siteTitle}</Link></h1>
              <p>Todos los viernes, una canción.<br/><Link to="/about">Más...</Link></p>
              <p>
                  Un proyecto de <a href="https://twitter.com/ricardochavezt">@ricardochavezt</a>.
              </p>
              <p><Link to="/archive">Archivo de canciones</Link></p>
              <p>
                  <Link to="/rss.xml"><img alt="RSS" src={rssIcon} style={{width: 24}} /> Feed RSS</Link>
              </p>
          </div>
      </div>
  </div>
)

export default Sidebar;
