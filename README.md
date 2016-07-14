# service_marshaller
service marshaller using GraphQL

Combines Posts and Comments from http://jsonplaceholder.typicode.com into a single queriable service. 

npm start

navigate to http://localhost:5000/

try some queries:

```
{
  post(id:"1"){
    title,
    comments{
      email
      body
    }
  }
}
```

```
{
  post(id:"2"){
    title,
    userId
    comments{
      email
      postId
    }
  }
}
```
