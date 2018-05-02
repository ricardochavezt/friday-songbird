/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it
// We're using it, thank you very much XD

const fetch = require('isomorphic-fetch');
const crypto = require('crypto');
const marked = require('marked');
const path = require('path');

exports.sourceNodes = ({ boundActionCreators }) => {
    const { createNode } = boundActionCreators;
    const apiURL = process.env.GATSBY_API_URL || 'http://friday-songbird-admin.herokuapp.com/canciones';
    return fetch(apiURL)
        .then(res => res.json())
        .then(jsonResp => {
            jsonResp.forEach((post) => createNode(Object.assign(
                post,
                {
                    id: post.id.toString(),
                    internal: {
                        type: 'post',
                        contentDigest: crypto.createHash('md5').update(JSON.stringify(post)).digest('hex')
                    },
                    parent: `__SOURCE__`,
                    children: [],
                    contenidoHTML: marked(post.texto),
                    slug: '/archive/'+post.fecha_publicacion+'-'+post.titulo.toLowerCase().replace(/(\s|\W)+/g, '-')
                }
            )));
        });
};

exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators;
    return new Promise((resolve, reject) => {
        graphql(`{
        allPost (sort: {fields: [fecha_publicacion], order: DESC}){
          edges {
            node {
              id
              slug
            }
            next {
              slug
              titulo
              fecha_publicacion(formatString:"DD/MM/YYYY")
            }
            previous {
              slug
              titulo
              fecha_publicacion(formatString:"DD/MM/YYYY")
            }
          }
        }
      }`).then(result => {
          result.data.allPost.edges.forEach(({ node, next, previous }) => {
              createPage({
                  path: node.slug,
                  component: path.resolve('./src/templates/post.js'),
                  context: {
                      id: node.id,
                      nextPost: next,
                      prevPost: previous
                  }
              });
          });
          resolve();
      });
    });
};
