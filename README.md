# Town Message Board

This is a proof-of-concept for a basic community board with account creating and log-in with document permissions.

Things you may want to cover:

## Features

This app is created with a Ruby on Rails API and a React frontend. 
You can get it running by using the CLI command "rails s" and then after you cd into the client directory you can run the CLI command npm start. 
This should start up the backend and subsequently the frontend. 

### Log In

    The log-in is implemented using the bcrypt gem

### Database

    The database is postgreSQL

## User Stories/Functionality

### Routes

    Routes are implemented using React Router and there are three possble Routes
    * Create a Post - a user can create a post or add a topic fo rthe community to use
    * Public Posts - a user can view all posts created by account-holding users
    * User Posts - a user can view their own posts and delete or edit any aspect of the post.
### Create a User Account

    A user can create a user account and then use the username and password combination for thier account to gain access to the platform. 
### Create a Post

    A post entry has full CRUD. 
    A user can create a post, this post will be visible to any user that can log-in to the platform and when a user goes to the user posts Route they will see a list of all of thier posts. All aspects of a Post can be updated in the user posts route. The button that triggers adding of a topic to a Post will dynamically change to "add" or "remove" mode based on whether or not the topic is already associated with the Post. A user can simultaneaously add and remove topics, and update the body and title of a Post in a single update which is triggered with the "save changes" button. 
#### Post-Topics

    A user can add as many of the post topics to a post topic as they want. 
### Create a Topic

    A user can create a topic. This Topic will be usable by all other users with accounts and it will appear in their topic drop-down menu. 

## The Data Base

    * The Data Base uses postgrSQL 
    * The many-to-many relationship is handled with a join table that allows for a Post to have many Topics and for a Single Topic to be associated with many Posts. 
## Validation

    *Validation is included for a post, user feedback is provided if an error is thrown.
    *Validation is included for a topic, user feedback is provided if an error is thrown.



