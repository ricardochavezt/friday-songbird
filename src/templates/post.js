import React from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'

const PostPage = ({data, pageContext}) => {
  console.log(data);
    var post = data.post;
    var title = post.titulo;
    if (post.artista) {
        title = post.artista + " - " + title;
    }
    var nextLink, prevLink;
    if (pageContext.nextPost) {
        nextLink = (
           <Link className="pagination-item newer" to={pageContext.nextPost.slug}>{pageContext.nextPost.fecha_publicacion} - {pageContext.nextPost.titulo} &rarr;</Link>
        );
    }
    else {
        nextLink = (
            <span className="pagination-item newer">&rarr;</span>
        );
    }
    if (pageContext.prevPost) {
        prevLink = (
           <Link className="pagination-item older" to={pageContext.prevPost.slug}>&larr; {pageContext.prevPost.fecha_publicacion} - {pageContext.prevPost.titulo}</Link>
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
            <Helmet title={title+' - '+data.site.siteMetadata.title} />
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

export default PostPage;

export const query = graphql`
query postQuery($id: String!) {
  post(id: {eq: $id}) {
    album
    artista
    titulo
    contenidoHTML
    fecha_publicacion(formatString:"DD MMMM YYYY")
    spotify_uri
    youtube_url
  }
  site {
    siteMetadata {
      title
    }
  }
}`
