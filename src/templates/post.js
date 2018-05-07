import React from 'react'
import Link from 'gatsby-link'

const PostPage = ({data, pathContext}) => {
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
            <div className="posts">
                <div className="post">
                    <h1 className="post-title"><a href="#">{title}</a></h1>
                    <span className="post-date">{post.fecha_publicacion}</span>
                    {post.spotify_uri && (<p>
                        <iframe src={"https://open.spotify.com/embed?uri="+post.spotify_uri} width="300" height="80" frameBorder="0" allowTransparency="true" allow="encrypted-media"></iframe>
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
  }
}`
