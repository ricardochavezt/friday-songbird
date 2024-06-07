module.exports = {
    siteMetadata: {
        title: 'Friday Songbird',
        description: 'Todos los viernes una canción',
        siteUrl: 'http://www.ricardochavezt.com/friday-songbird'
    },
    pathPrefix: '/friday-songbird',
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-plugin-feed',
            options: {
                query: `
                    {
                        site {
                            siteMetadata {
                                title
                                description
                                siteUrl
                                site_url: siteUrl
                            }
                        }
                    }
                `,
                feeds: [
                    {
                        serialize: ({query: {site, allPost}}) => {
                            return allPost.edges.map(({node}) => {
                                let titulo = node.titulo;
                                if (node.artista) {
                                    titulo = node.artista + ' - ' + titulo;
                                }
                                let contenidoHTML = node.contenidoHTML;
                                if (node.spotify_uri) {
                                    contenidoHTML = `<p><iframe src="https://open.spotify.com/embed?uri=${node.spotify_uri}" width="300" height="80" frameBorder="0" allowTransparency="true" allow="encrypted-media"></iframe></p>` + contenidoHTML;
                                }
                                if (node.youtube_url) {
                                    contenidoHTML = `<p><iframe width="560" height="315" src=${node.youtube_url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>` + contenidoHTML;
                                }
                                if (node.album) {
                                    contenidoHTML = `<p>Album: ${node.album}</p>` + contenidoHTML;
                                }
                                return {
                                    title: titulo,
                                    date: node.fecha_publicacion,
                                    description: contenidoHTML,
                                    url: site.siteMetadata.siteUrl + node.slug,
                                    guid: site.siteMetadata.siteUrl + node.slug,
                                    custom_elements: [{"content:encoded": contenidoHTML}]
                                };
                            });
                        },
                        query: `{
                            allPost(sort: {fields: [fecha_publicacion], order: DESC}) {
                                edges {
                                    node {
                                        titulo
                                        artista
                                        album
                                        contenidoHTML
                                        fecha_publicacion
                                        spotify_uri
                                        youtube_url
                                        slug
                                    }
                                }
                            }
                        }`,
                        output: '/rss.xml'
                    }
                ]
            }
        }
    ]
};
