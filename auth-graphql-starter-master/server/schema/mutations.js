// file with GQL mutations
const graphql = require('graphql');
const UserType = require('./types/user_type');
const {
    GraphQLObjectType,
    GraphQLString
} = graphql;
const AuthService = require('../services/auth');

// create new GQL Object Type for mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {                   // signup mutation
            type: UserType,         // returns UserType
            args: {                 // args to receive
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, request) {   // execute mutation
                // return signup auth service
                return AuthService.signup({ email, password, req: request })
            }
        },
        logout: {                   // logout mutation
            type: UserType,         // returns UserType
            resolve(parentValue, args, request) {   // execute mutation
                // save record of user we want to logout
                const { user } = request;
                // log user out
                request.logout();
                // return user logged out
                return user;
            }
        },
        login: {                   // login mutation
            type: UserType,         // returns UserType
            args: {                 // args to receive
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, request) {   // execute mutation
                // return login auth service
                return AuthService.login({ email, password, req: request })
            }
        },
    }
});

module.exports = mutation;