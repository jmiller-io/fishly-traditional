# Fish.ly

Throwback app to the good ol' days of the Fisherman's Bait arcade game.
Compete against your friends, and strangers by uploading real life stats and photos of your largest catches to get on the Wall O' Fame and become the King of The Lakes.


# Screen Shot
![Image](./screenshot.png?raw=true)

Technologies Used:
* MongoDB
* ExpressJS
* NodeJS
* JavaScript
* AJAX
* jQuery
* Amazon AWS S3 Storage
* Google OAuth
* Heroku for hosting
* HTML
* CSS
* Handlebars


# Approach
My approach for this app was pretty simple.
Make it look like a retro arcade game that I grew up playing.

# Install Instructions
run 

```
npm install
```

To seed
```
npm run seed
```

# Routes
* Routes for auth
- /auth/login
- /auth/callback
- /profile/me

* Routes for getting
- / - get index
- /lakes - get lakes
- /lake/:id - get specific lake
- /fish - create new fish
- /fish/:id - update/delete fish
- /basket - get basket
- /walloffame - get wall of fame page


Trello Link
https://trello.com/b/La4mo3cG/fishly
