function getBooks(cb) {
  fetch('/getBooks')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      cb(myJson);
    })
  .catch(function(error) {
    return error;
  });
}

function checkCookies(cb, pass) {
  fetch('/checkmycookie', {
        method: "POST",
        mode: "cors",
 // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "text/plain",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(pass) // body data type must match "Content-Type" header
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      cb(data);
    })
  .catch(function(error) {
    return error;
  });
}


function logIN(cb, username,password) {
  fetch('/login', {
        method: "POST",
        mode: "cors",
 // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "text/plain",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({pass:password,user:username}) // body data type must match "Content-Type" header
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      cb(JSON.stringify(data));
    })
  .catch(function(error) {
    return error;
  });
}


function createUsers(cb, name ,username,password) {
  fetch('/createUser', {
        method: "POST",
        mode: "cors",

        headers: {
            "Content-Type": "text/plain",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({pass:password,user:username,name:name}) // body data type must match "Content-Type" header
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      cb(JSON.stringify(data));
    })
  .catch(function(error) {
    return error;
  });
}
