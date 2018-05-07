module.exports = {
    siteMetadata: {
        title: 'Friday Songbird',
        description: 'Todos los viernes una canción',
        siteUrl: 'http://www.ctrl-c.club/~ricardo/friday-songbird'
    },
    pathPrefix: '/~ricardo/friday-songbird',
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
                                if (node.album) {
                                    contenidoHTML = `<p>Album: ${node.album}</p>` + contenidoHTML;
                                }
                                return {
                                    title: node.titulo,
                                    date: node.fecha_publicacion,
                                    description: node.contenidoHTML,
                                    url: site.siteMetadata.siteUrl + node.slug,
                                    guid: site.siteMetadata.siteUrl + node.slug,
                                    custom_elements: [{"content:encoded": node.contenidoHTML}]
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
