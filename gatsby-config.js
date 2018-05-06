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
