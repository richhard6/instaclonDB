# InstaClon

API Made with node with express using dbsm mysql.

To use this API you must first create a database in mysql named as you want but make sure to add it in the .env and fill the other enviroment variables. Then run the script `npm install` to install dependencies,
`npm run initDB` to create the entities in the database followed by
`npm run dev` to start the server.

# Features

-   Two possible users until now, registered and non registered (anonymous)

-   Both registered and anonymous users can

    -   Check last posts (pictures) uploaded by users
    -   Check users profile with their the post gallery
    -   Search by photo caption
    -   Login
    -   Register

-   Registered users can
    -   Post a photo with or without caption (this photo must adapt to the established sizes given by the app)
    -   Like or remove the like to a post.
    -   Update their profile (password or username) - It is needed to send in the body the user password for double security check to do this.
    -   Comment a post.

# Entities

-   [users]

    -   id
    -   email
    -   password

-   [posts]

    -   id
    -   userId
    -   picture
    -   caption

-   [likes]

    -   id
    -   postId
    -   userId

-   [comments]

    -   id
    -   comment
    -   postId
    -   userId

# Endpoint users

-   POST [/users/login] - log in app

-   POST [/users/register] - register in app

-   GET - [/users/:userId] - check specific user profile with their picture gallery

-   PUT - [/users/me] - update password or username **TOKEN NEEDED**

# Endpoints posts

-   GET - [/posts] - all users' last posts

-   GET - [/posts?query=x] - search a post by given text.

-   POST - [/posts/newPost] - Create a new post (picture required, caption optional). **TOKEN NEEDED**

-   POST - [/posts/:postId/like] - Like or remove like to a post **TOKEN NEEDED**

-   POST - [/posts/:postId/comment] - Comment a post **TOKEN NEEDED**
