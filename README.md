# Deploy

- git clone https://github.com/dksbhrqz/portafolio-tets.git
- cd portafolio-test
- npm install
- node index.js

The project will start running at port 3000

Access from Internet Navigator to *localhost:3000* to see user profile with the work experience and last five tweets

# Endpoints

### GET /workExperience

Retrieve the user information registered in the database

### PUT /workExperience

*Body*: 

```javascript
{
    "information": "My new information about my work experience"
}
```

*Responses*

Status 200: Information Updated
Status 400: Error in information attribute from request body
Status 500: Internal Error

# Test

- npm run test