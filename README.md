# liri-node-app

This app interfaces with the command line using node.js. The first two arguments entered must be 'node' and the entry point, which in this case is 'liri.js' file. The third argument will be one of four possible user inputs: 
1. movie-this
2. my-tweets
3. spotify-this-song
4. do-what-it-says

e.g. node liri.js movie-this The Fast and the Furious

If movie-this is chosen, an optional fourth argument can be input by the user which will be the title of the movie he/she wishes to query. If the user leaves out the optional fourth argument, the default choice of 'Mr. Nobody' will be used instead of user input.

If my-tweets is chosen, the optional fourth argument can be the screen name of the twitter user whose tweets this user wishes to display. If this argument is left blank, the default user is my 'dummy' account.

If spotify-this-song is chosen, the optional fourth argument should be the song the user wishes to query or link to. If this input is left undefined, the default search is set to 'The Sign' by Ace of Base. 

If do-what-it-says is chosen as the third argument, the default file contents of spotify-this-song "I Want it That Way" are input into the app, which generates spotify information about the song, album, and band, as well as a link to the song.

An entire list of searches and commands is stored in a file called log.txt. For security reasons, the private credentials are omitted from these files. For users who would like to demo the app or modify it, simply aquire your credentials and create a file to store them. You will need to run npm install to attach the necessary dependencies for this application.

The .env file you create should look like the following:

 Spotify API keys

SPOTIFY_ID=yourID
SPOTIFY_SECRET=yourSecret

 Twitter API keys

TWITTER_CONSUMER_KEY=yourKey
TWITTER_CONSUMER_SECRET=yourSecret
TWITTER_ACCESS_TOKEN_KEY=yourToken
TWITTER_ACCESS_TOKEN_SECRET=yourTokenSecret

https://www.useloom.com/share/3fee8b80ab0f4c1b9293005d29d35e49
