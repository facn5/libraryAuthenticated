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

function reserveBook(id, username) {

  fetch('/reserveBook', {
      method: "POST",
      mode: "cors",
      // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "text/plain",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({id:id, username:username}) // body data type must match "Content-Type" header
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log("here");
    //  cb(data);
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}
