# YG_Staff

https://bygstaff.herokuapp.com/

![Home Page](https://user-images.githubusercontent.com/8729300/46427511-9d29cf80-c70f-11e8-9842-165428a1a2f8.png)

For a church's Youth Group staff members, certain tasks require a handful of thorough searching to find results. Directories are stored in spreadsheets and a list of birthdays must be curated every month by sifting through each student one by one. This website will gain more functionality in the future, but currently makes each of the above tasks much easier.

### GETTING STARTED

#### BUILT-WITH

```
  Languages and Database :
  
  JAVASCRIPT
  JQUERY
  HANDLEBARS
  HTML / CSS / MATERIALIZE CSS
  MONGODB
  
  Node Packages :
  
  body-parser : parse incoming request bodies in a middleware before your handlers, available under the req.body property
  dotenv : a zero-dependency module that loads environment variables from a .env file into process.env
  express : fast, unopinionated, minimalist web framework for node
  express-handlebars : a Handlebars view engine for Express
  mongoose : a MongoDB object modeling tool designed to work in an asynchronous environment
  path : an exact copy of the NodeJS ’path’ module
```

##### SAMPLE DATA

All information of students is recorded with the following and each field contains a Regular Expression to follow :

```json
studentObject {
  name : NAME,
  grade : GRADE,
  birthday : BIRTHDAY,
  location : LOCATION
}
```

### WEBSITE / IMAGES

#### HOME PAGE

On the home page, the staff administrators are able to CRUD (Create, Remove, Update, and Delete) a list of students, sort them by grade, and easily view information.

![Home Page](https://user-images.githubusercontent.com/8729300/46427511-9d29cf80-c70f-11e8-9842-165428a1a2f8.png)

#### BIRTHDAYS PAGE

On the birthdays page, rather than having to search through the directory lists manually to find out who has a birthday in what month, the birthday tab will cater to find a list of students whose birthday falls in the selected month.

![Birthday Page](https://user-images.githubusercontent.com/8729300/46427895-8a63ca80-c710-11e8-8987-4571988c8614.png)

### TODO / BUGS

* Code Cleanup
* Edit Button Functionality
