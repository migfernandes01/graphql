// GQL Root Query to enter the graph
const graphql = require('graphql');
const UserType = require('./user_type');
const { GraphQLObjectType } = graphql;

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    currentUser: { 
      type: UserType,
      resolve(parentValue, args, request) {
        return request.user;
      }
    }
  }
});

module.exports = RootQueryType;
