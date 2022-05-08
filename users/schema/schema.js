// GraphQL data shema file

const graphql = require('graphql');
const axios = require('axios');

// destructure GraphQL properties
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

// simple data type with users
const users = [
    { id: '23', firstName: 'Bill', age: 20 },
    { id: '47', firstName: 'Sam', age: 21 }
];

// create a type for a User object with GraphQLObjectType
const UserType = new GraphQLObjectType({
    name: 'User',   // object type name
    fields: {       // object type fields
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
    }
});

// create the Root Query (entrypoint to graph DS)
// gives back a user after getting an id
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            async resolve(parentValue, args) {    // function to find and return data (receives an id and returns a UserType)
                // return result from call to json-server (/users/:userId)
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(res => res.data); // return response.data
            }
        }
    }
});

//export GraphQLSchema(with an entry point of RootQuery)
module.exports = new GraphQLSchema({
    query: RootQuery
});