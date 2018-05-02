import React from 'react'
import Link from 'gatsby-link'

const ArchivePage = ({data}) => {
    var posts = data.allPost.edges.map(edge => edge.node);
    return (
        <div>
            <div className="page">
                <h1 className="page-title">Archivo de canciones</h1>
                <span className="post-date">Todas las canciones publicadas a la fecha (las más recientes primero)</span>
                {posts.map(post => {
                     var titulo = post.artista ? `${post.artista} - ${post.titulo}` : post.titulo;
                     return (
                         <p>
                             <h3 className="post-title"><Link to={post.slug}>{post.fecha_publicacion}: {titulo}</Link></h3>
                         </p>
                     );
                 })}
            </div>
        </div>
    );
};

export default ArchivePage;

export const query = graphql`
query allPostsQuery {
  allPost(sort: {fields: [fecha_publicacion], order: DESC}) {
    edges {
      node {
        titulo
        artista
        fecha_publicacion(formatString:"DD/MM/YYYY")
        slug
      }
    }
  }
}`
