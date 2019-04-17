function getBooks() {
  fetch('/getBooks')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      updatedom(myJson);
    })
  .catch(function(error) {
    return error;
  });
}
