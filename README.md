# Lets - Talk - Chess

### Introduction
This is a full-stack chat web application that can be up and running with just a few steps. 
Frontend is built with React. 
Backend is built with Express.js and Node.js. Real-time message broadcasting is developed using Socket.IO.
___

### Features
This application provides users with the following features:

- Authentication using JWT Tokens
- A Private Chat functionality where users can chat with other users privately.
- Real-time updates to the user list, conversation list, and conversation messages.
___

### How to use
Follow the steps below to have this application up and running 

1. Clone this repo
2. Once you have the repo, you need to install its dependencies. 
So using a terminal, open two separate directories, one for server directory and one for client directory. 
For each one of them execute ```npm install``` to install the dependencies.
3. This application uses MongoDB as its Database. So make sure you have it installed. 
You can find detailed guides on how to do so [here](https://docs.mongodb.com/manual/administration/install-community/).
4. On the each directory (server & client), remane the ```.env.example``` to ```.env``` and change the following variables:
- On the server directory:
- ```CLIENT_URL=<Your-Client-Localhost-Number>```
- ```CHAT_JWT_KEY=<Your-JWT-Password>```
- On the client directory:
- ```REACT_APP_SERVER_CONTEXT_URL=<Your-Sever-Localhost-Number>```
- ```REACT_APP_SERVER_URL=<Your-Sever-Localhost-Number>```

<br/>Replace - ```<Your-DB-Collection-Name>``` and ```<Your-JWT-Password>``` with your new DB name and password.
5. Finally, all you have to do is type ```node index.js``` on the server terminal and ```npm start``` on the client terminal. 
6. The frontend of the application will be automatically opened in your web browser and you can test it away.
___

### Screenshots
![login_screen](https://user-images.githubusercontent.com/82472117/125211065-57c96200-e2ac-11eb-941e-e86a693e8f95.PNG)
![chatScreenNoChat](https://user-images.githubusercontent.com/82472117/126360463-9b96450d-4f13-4902-94d8-5856e6a9bcfb.PNG)
![chatPage](https://user-images.githubusercontent.com/82472117/126360481-53687879-569e-4067-baab-5695cab4659c.PNG)
