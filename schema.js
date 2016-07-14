import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} from 'graphql';

import fetch from 'node-fetch';

const BASE_URL = 'http://jsonplaceholder.typicode.com';

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    description: '...',
    fields: () => ({
        postId: {type: GraphQLString},
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        body: {type: GraphQLString}
    })
})

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: '...',
  fields: () => ({
    userId: {type: GraphQLString},
    id: {type: GraphQLString},
    title: {type: GraphQLString},
    body: {type: GraphQLString},
    comments: {
        type: new GraphQLList(CommentType),
        resolve: (post) => getByUrl(`/comments?postId=${post.id}`)
    }})
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
      post: {
        type: PostType,
        args: {
           id: {type: GraphQLString}
        },
      resolve: (root, args) => getByUrl(`/posts/${args.id}/`)
    }})
})

let getByUrl = relativeUrl => fetch(`${BASE_URL}${relativeUrl}`)
      .then(res => res.json())
      .then(json => json);

export default new GraphQLSchema({
    query: QueryType
})