// GraphQL data shema file

const graphql = require('graphql');
const axios = require('axios');

// destructure GraphQL properties
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql;

// create a type for a Company object with GraphQLObjectType
const CompanyType = new GraphQLObjectType({
    name: 'Company',    // object type name
    fields: () => ({           // object type fields
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {        // field that associates a company with a list of users
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {    // return list of users from
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
                    .then(res => res.data)
            }
        }
    })
});

// create a type for a User object with GraphQLObjectType
const UserType = new GraphQLObjectType({
    name: 'User',   // object type name
    fields: () =>  ({       // object type fields
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {                          // field that associates a user with a company
            type: CompanyType,
            resolve(parentValue, args) {    // return company from receiving an id
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                    .then(res => res.data)
            }
        }
    })
});

// create the Root Query (entrypoint to graph DS)
// gives back a user after getting an id
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {    // function to find and return data (receives an id and returns a UserType)
                // return result from call to json-server (/users/:userId)
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(res => res.data); // return response.data
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {    // function to find and return data (receives an id and returns a CompanyType)
                // return result from call to json-server (/companies/:companyId)
                return axios.get(`http://localhost:3000/companies/${args.id}`)
                    .then(res => res.data); // return response.data
            }
        }
    }
});

// GraphQL mutation object type
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {       // mutation operations
        addUser: {  // mutation to add user
            type: UserType,     // type of return of this operation 
            args: {             // args to receive in order to do this operation
                firstName: { type: new GraphQLNonNull(GraphQLString) }, // required
                age: { type: new GraphQLNonNull(GraphQLInt) },          // required
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, { firstName, age }) {     // perform operation (parentValue, args)
                // return result from POST req to json-server (/users)
                return axios.post(`http://localhost:3000/users`, { firstName, age })
                    .then(res => res.data)
            }
        },
        deleteUser: {       // mutation to delete user
            type: UserType, // type of return of this operation 
            args: {         // args to receive in order to do this operation
                id: { type: new GraphQLNonNull(GraphQLString) } // required
            },
            resolve(parentValue, { id }) {  // perform operation (parentValue, args)
                // return result from POST req to json-server (/users/:id)
                return axios.delete(`http://localhost:3000/users/${id}`)
                    .then(res => res.data)
            }
        },
        editUser: {  // mutation to edit user
            type: UserType,     // type of return of this operation 
            args: {             // args to receive in order to do this operation
                id: { type: new GraphQLNonNull(GraphQLString) },    // required
                firstName: { type: GraphQLString }, 
                age: { type: GraphQLInt },          
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, args) {     // perform operation (parentValue, args)
                // return result from PATCH req to json-server (/users)
                return axios.patch(`http://localhost:3000/users/${args.id}`, args)
                    .then(res => res.data)
            }
        },
    }
});

//export GraphQLSchema(with an entry point of RootQuery and mutation)
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});