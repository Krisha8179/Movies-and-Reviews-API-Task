## Movies-and-Reviews-API-Task

A node.js app for create movie reviews.

## Server features

1. Sets up middleware for user authentication (used JWT authenticatioin).
2. Connects to the postgresql using sequelize for CRUD operations.
3. Used Express server to serve API endpoints.
4. Integrated AWS to manage files.
5. Intergrated sendInBlue to send mail.

## API endpoints


1. **/user/signup**  - To register new users.
2. **/user/login**  - For login users.
3. **/user/changePasswword**  - To change password.
4. **/movie/createMovie**  - To create movie for review.
5. **/movie/getMovies**  - To get all movies.
6. **/movie/searchMovie**  - To search movie.
7. **/movie/getMovie/:id**  - To get movie by it's id.
8. **/movie/updateMovie/:id**  - TO update movie by it's id.
9. **/movie/deleteMovie/:id**  - To delete movie by it's id.
10. **/review/createMovieReview/:id**  - To create movie review by movie id.
11. **/review/getMovieReviews/:id**  - To get movie reviews by movie id.
12. **/review/updateMovieReview/:id**  - To update movie review by movie id.
13. **/review/deleteMovieReview/:id**  - To delete movie review by movie id.

**Note** : API endpoints '**/user/changePasswword**', '**/movie/createMovie**', '**/movie/getMovies**', '**/movie/searchMovie**', '**/movie/getMovie/:id**', '**/movie/updateMovie/:id**', '**/movie/deleteMovie/:id**', '**/review/createMovieReview/:id**', '**/review/getMovieReviews/:id**', '**/review/updateMovieReview/:id**', '**/review/deleteMovieReview/:id**' needs to be authenticated by JWT token to work. The client needs to send the JSON web token through the Authorization header.

## Dependencies

* Cors (Any origin works in our API)
* Express
* sequelize(to connect to mysql)
* postgresql (schemas)
* dotenv (get the .env file working with environment variables)
* bcrypt (Hash our password) 
* JWT (Jason Web Tokens)
* body parser(to parse the incoming body requests)


 
