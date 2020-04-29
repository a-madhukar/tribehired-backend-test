## Tribehired Backend Test


1. Return a list of top posts ordered by the number of comments. Consume the API endpoints provided 
    - Created Endpoint - `http://localhost:3000/api/posts/top`
	- comments endpoint – https://jsonplaceholder.typicode.com/comments
	-  View Single Post endpoint – https://jsonplaceholder.typicode.com/posts/{post_id}
	-  View All Posts endpoint – https://jsonplaceholder.typicode.com/posts
	- The API response should have the following fields: 
		- post_id 
		- post_title
		- post_body 
		- total_number_of_comments


2. Search API 
Create an endpoint that allows a user to filter the comments based on all the available fields. Your solution needs to be scalable. 
    - Created Endpoint - `http://localhost:3000/api/comments/search?q=`
	- comments endpoint – https://jsonplaceholder.typicode.com/comments


## Starting Service
```
yarn install
yarn start:dev
```