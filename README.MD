# 💡 What is MERN-AUTH?

MERN-AUTH is a repository written with REACT, REDUX, TAILWIND, EXPRESS, MONGOOSE and is an implementation of JWT authentication.
<br>

# 💡 BACKEND

Backend comprises of multiple REST API endpoints :

1. /signup for registering user ( Add user email, username and hashed password to MongoDB atlas )
2. /login for logging in user ( Uses bcrypt to verify user auth and sends back an access token as json and a refresh token in httpOnly cookie)
3. /logout for deleting refresh token from MongoDB
4. /refresh for refreshing access tokens on expiry
5. /quotes for returing some quotes saved in mongoDB to login users
   <br>

# 💡 FRONTEND

Frontend connect users to backend endpoints using UI

1. Signup page
2. Login page
3. Quotes Page ( Home Page )
4. Handles expiry of access and refresh tokens behind the scenes
5. Persists user login without saving JWT tokens in localstorage for max security
   <br>
