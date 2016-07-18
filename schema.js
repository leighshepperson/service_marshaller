import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} from 'graphql';

import fetch from 'node-fetch';

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: {type: GraphQLInt},
        postId: {type: GraphQLInt},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        body: {type: GraphQLString}
    })
})

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: {type: GraphQLInt},
    userId: {type: GraphQLInt},
    title: {type: GraphQLString},
    body: {type: GraphQLString},
    comments: {
        type: new GraphQLList(CommentType),
        resolve: post => getJSON(`/comments?postId=${post.id}`)
    }})
})

const QueryType = new GraphQLObjectType({
    name: 'PostQuery',
    fields: () => ({
      post: {
        type: PostType,
        args: {
           id: {type: GraphQLInt}
        },
      resolve: (parent, args) => getJSON(`/posts/${args.id}/`)
    }})
})

let getJSON = rel => fetch(`http://jsonplaceholder.typicode.com${rel}`).then(res => res.json())

export default new GraphQLSchema({
    query: QueryType
})