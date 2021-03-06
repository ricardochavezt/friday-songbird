import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

const IndexPage = ({data}) => {
    var post = data.allPost.edges[0].node;
    var title = post.titulo;
    if (post.artista) {
        title = post.artista + " - " + title;
    }
    var nextLink, prevLink;
    if (data.allPost.edges[0].next) {
        nextLink = (
           <Link className="pagination-item newer" to={data.allPost.edges[0].next.slug}>{data.allPost.edges[0].next.fecha_publicacion} - {data.allPost.edges[0].next.titulo} &rarr;</Link>
        );
    }
    else {
        nextLink = (
            <span className="pagination-item newer">&rarr;</span>
        );
    }
    if (data.allPost.edges[0].previous) {
        prevLink = (
           <Link className="pagination-item older" to={data.allPost.edges[0].previous.slug}>&larr; {data.allPost.edges[0].previous.fecha_publicacion} - {data.allPost.edges[0].previous.titulo}</Link>
        );
    }
    else {
        prevLink = (
            <span className="pagination-item older">&larr;</span>
        );
    }
    return (
        <Layout>
          <div>
            <div className="posts">
              <div className="post">
                <h1 className="post-title"><a href="#">{title}</a></h1>
                <span className="post-date">{post.fecha_publicacion}</span>
                {post.spotify_uri && (
                <p>
                    <iframe title="Spotify player" src={"https://open.spotify.com/embed?uri="+post.spotify_uri} width="300" height="80" frameBorder="0" allowTransparency="true" allow="encrypted-media"></iframe>
                </p>
                )}
                {post.youtube_url && (
                <p className="video-container">
                    <iframe title="YouTube player" width="560" height="315" src={post.youtube_url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </p>
                )}
                {post.album && (
                <p>Album: {post.album}</p>
                )}
                <div id="post_content" dangerouslySetInnerHTML={{__html: post.contenidoHTML}} />
              </div>
            </div>
            <div className="pagination">
              {prevLink}
              {nextLink}
            </div>
          </div>
        </Layout>
    );
}

export default IndexPage;

export const query = graphql`
query frontPostQuery {
  allPost(sort: {fields: [fecha_publicacion], order: DESC}, limit:2) {
    edges {
      node {
        album
        artista
        titulo
        contenidoHTML
        fecha_publicacion(formatString:"DD MMMM YYYY")
        spotify_uri
        youtube_url
      }
      next {
        slug
        titulo
        fecha_publicacion(formatString:"DD/MM/YY")
      }
      previous {
        slug
        titulo
        fecha_publicacion(formatString:"DD/MM/YY")
      }
    }
  }
}`
