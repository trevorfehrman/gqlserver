const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Subscription = require('./resolvers/Subscription');
const Vote = require('./resolvers/Vote');

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
};

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

server.start(() => console.log(`Server is running on http://localhost:4000`));

// const resolvers = {
//   Query: {
//     info: () => `This is the API of a Hackernews Clone`,
//     feed: () => links,
//     link: (parent, args) => {
//       result = links.filter(link => link.id == args.id)[0];
//       return result;
//     }
//   },

//   Mutation: {
//     // 2
//     post: (parent, args) => {
//       const link = {
//         id: `link-${idCount++}`,
//         description: args.description,
//         url: args.url
//       };
//       links.push(link);
//       return link;
//     },

//     updateLink: (parent, args) => {
//       let found;
//       newLinks = links.map(link => {
//         if (link.id == args.id) {
//           found = {
//             ...link,
//             id: args.id,
//             url: args.url || link.url,
//             description: args.description || link.description
//           };

//           return found;
//         } else {
//           return link;
//         }
//       });
//       links = newLinks;

//       return found;
//     },

//     deleteLink: (parent, args) => {
//       let found;
//       newLinks = links.filter(link => {
//         if (link.id != args.id) {
//           return link;
//         }

//         if (link.id == args.id) {
//           found = link;
//         }
//       });
//       links = newLinks;
//       return found;
//     }
//   }
// };
