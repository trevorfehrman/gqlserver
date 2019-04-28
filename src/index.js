const { GraphQLServer } = require('graphql-yoga');

// 1
let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  },
  {
    id: 'link-1',
    url: 'boop',
    description: 'hider'
  }
];

let idCount = links.length;


const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      result = links.filter(link => link.id == args.id)[0];
      return result;
    }
  },

  Mutation: {
    // 2
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    
    updateLink: (parent, args) => {
      let found;
      newLinks = links.map(link => {
        if (link.id == args.id) {
          found = {
            ...link,
            id: args.id,
            url: args.url || link.url,
            description: args.description || link.description
          };

          return found;
        } else {
          return link;
        }
      });
      links = newLinks;

      return found;
    },

    deleteLink: (parent, args) => {
      let found;
      newLinks = links.filter(link => {
        if (link.id != args.id) {
          return link;
        }

        if (link.id == args.id) {
          found = link;
        }
      });
      links = newLinks;
      return found;
    }
  }
};
// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
