// GQL User Type Object
const graphql = require('graphql');
const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = graphql;

// new UserType GQL Object Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLID },
        email: { type: GraphQLString }
    }
});

// export UserType
module.exports = UserType;