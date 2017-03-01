# Boilerplate

# Usage

# Database

`db/config.js` configures the app to work with Mongoose

To create seed data, write your code in `db/seed.js`
Then run the script with:

```
$ npm run seed
```

# Style

Standard is a JS module for creating a consistent style.

Run it with 

```
$ npm run test
```

When possible standard will fix some styles automatically.
Other errors will be listed in the terminal.

# Environmental Variables

Create a `.env` for storing environmental variables. 
They'll be automatically loaded at the top of `server.js`

# Sessions

Data can be set and get with `req.session`
