# CSYork
A simple web application 

##Install
After downloading, using `npm install` to install the node modules the server relies on, 

and then going to the directory 'angular-app', and then using `npm install` and `bower install` to install the bower and node modules.

To start the server, using `npm start`, and then checking out the gallery through the URL `http:\\localhost:3000` by default 

##Tech stack
Client-side: AngularJS + Bootstrap

Server-side: NodeJS with the framework Express

Database: mongoDB

##REST APIs
`GET /courses`

`GET /courses/:id/threads`

`POST /courses/:id/threads`

`GET /courses/:id/threads/:id/comments`

`POST /courses/:id/threads/:id/comments`

`DELETE /courses/:id/threads/:id/comments/:id`

`GET /favorites`

`POST /favorites`

 `DELETE /favorites/:id`

##Screenshot
![gallery](https://www.dropbox.com/s/h6ungt0o7oe6yvy/hackfest.png?raw=1)
