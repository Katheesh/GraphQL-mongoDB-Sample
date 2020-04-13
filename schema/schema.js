const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLBoolean} = graphql;

const Book = require('../models/book');
const Author = require('../models/author');

const Blog = require('../models/blog');

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // return _.find(authors, {id: parent.authorId});
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books, { authorId: parent.id});
                return Book.find({authorId: parent.id});
            }
        }
    })
});

const BlogType = new GraphQLObjectType({
    name: 'Blog',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        image: {type: GraphQLString},
        status: {type: GraphQLBoolean },
        content: {type: GraphQLString},
        posted_at: {type: GraphQLString},
        blogs: {
            type: new GraphQLList(BlogType),
            resolve(parent, args) {
                return Blog.find({blogId: parent.id});
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args) {
                //code to get data from db/other source
                // return _.find(books, {id: args.id});
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args) {
                //code to get data from db/other source
                // return _.find(authors, {id: args.id});
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books;
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors;
                return Author.find({});
            }
        },
        blog: {
            type: BlogType,
            args: {id: {type: GraphQLID} },
            resolve(parent, args) {
                return Blog.findById(args.id);
            }
        },
        blogs: {
            type: new GraphQLList(BlogType),
            resolve(parent, args){
                return Blog.find({});
            }
        }
    }
});

const Muatation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBlog: {
            type: BlogType,
            args: {
                title: {type: GraphQLString},
                image: {type: GraphQLString},
                status: {type: GraphQLBoolean },
                content: {type: GraphQLString},
                posted_at: {type: GraphQLString},
            },
            resolve(parent, args) {
                let blog = new Blog({
                    title: args.title,
                    image: args.image,
                    status: args.status,
                    content: args.content,
                    posted_at: args.posted_at
                });
                return blog.save();
            }
        },
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Muatation
});


