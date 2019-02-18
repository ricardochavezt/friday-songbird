import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

const PostPage = ({data, pathContext}) => {
  console.log(data);
    var post = data.post;
    var title = post.titulo;
    if (post.artista) {
        title = post.artista + " - " + title;
    }
    var nextLink, prevLink;
    if (pathContext.nextPost) {
        nextLink = (
           <Link className="pagination-item newer" to={pathContext.nextPost.slug}>{pathContext.nextPost.fecha_publicacion} - {pathContext.nextPost.titulo} &rarr;</Link>
        );
    }
    else {
        nextLink = (
            <span className="pagination-item newer">&rarr;</span>
        );
    }
    if (pathContext.prevPost) {
        prevLink = (
           <Link className="pagination-item older" to={pathContext.prevPost.slug}>&larr; {pathContext.prevPost.fecha_publicacion} - {pathContext.prevPost.titulo}</Link>
        );
    }
    else {
        prevLink = (
            <span className="pagination-item older">&larr;</span>
        );
    }
    return (
        <div>
            <Helmet title={title+' - '+data.site.siteMetadata.title} />
            <div className="posts">
                <div className="post">
                    <h1 className="post-title"><a href="#">{title}</a></h1>
                    <span className="post-date">{post.fecha_publicacion}</span>
                    {post.spotify_uri && (<p>
                        <iframe src={"https://open.spotify.com/embed?uri="+post.spotify_uri} width="300" height="80" frameBorder="0" allowTransparency="true" allow="encrypted-media"></iframe>
                    </p>)}
                    {post.youtube_url && (<p className="video-container">
                        <iframe width="560" height="315" src={post.youtube_url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </p>)}
                    {post.album && (<p>
                        Album: {post.album}
                    </p>)}
                    <div id="post_content" dangerouslySetInnerHTML={{__html: post.contenidoHTML}} />
                </div>
            </div>
            <div className="pagination">
                {prevLink}
                {nextLink}
            </div>
        </div>
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
