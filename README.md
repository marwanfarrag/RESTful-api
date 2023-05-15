
# RESTful API

This is a project showcasing a RESTful API built with Node.js and Express.js, along with a user-friendly frontend built with Bootstrap. The project includes a Docker Compose file for easy deployment.

## Getting Started

To get started, follow these steps:

1. Clone the repository to your local machine:-
        
        git clone https://github.com/Savoura/RESTful-api.git

2. Navigate to the cloned repository:-
    
        cd RESTful-api

3. Start the Docker containers:-
        
        docker-compose up

4. Wait a minute or so until the application starts up. Once it's ready, you can access it by visiting the following link in your web browser.

        http://localhost:8000

## Features

This project includes a RESTful API with the following endpoints:

- `GET /persons`: Retrieve a list of all person objects.
- `POST /persons`: Create a new person object.
- `PUT /persons/{id}`:  Update a specific person object by its ID.
- `DELETE /persons/{id}`:  Delete a specific person object by its ID.


The project also includes a user-friendly frontend built with Bootstrap, HTML and Js, which allows you to view all users, add a new user, edit an existing user, and delete a user.

## Technologies Used

- Node.js
- Express.js
- body-parser
- cors
- Docker
- Docker Compose
- Bootstrap

## Usage

The RESTful-api project demonstrates the use of a RESTful API with a user-friendly frontend. The project is designed to be easily extendable and customizable. Here are some ideas for how you can use the project:

- Build your own backend API and integrate it with the user-friendly frontend
- Customize the user-friendly frontend to fit your needs
- Use the project as a starting point for building your own web application
