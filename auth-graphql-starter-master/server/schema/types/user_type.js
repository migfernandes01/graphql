// GQL User Type Object
const graphql = require('graphql');
const { 
    GraphQLObjectType,
    GraphQLString
} = graphql;

// new UserType GQL Object Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        email: { type: GraphQLString }
    }
});

// export UserType
module.exports = UserType;