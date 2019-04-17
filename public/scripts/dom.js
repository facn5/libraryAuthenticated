
function toSignup() {
  location.href = "/signup"
}

function toLogin() {
  location.href = "/"
}

if( document.cookie ) {
  // console.log(document.cookie.split("password=")[1]);

  checkCookies(function(res) {
console.log(res+'h');
  },document.cookie.split("password=")[1] )

}

if( document.getElementById('loginBtn')) {

document.getElementById('loginBtn').addEventListener('click', function(e) {
  e.preventDefault();

  logIN(function(data) {

    if( data === "true" ) {
      document.getElementById('Announce').style.color = "green";
      document.getElementById('Announce').innerText = "Logged in successfully"

      setTimeout( function() {
        location.href = "/home"
      },1500)
    }
    else {
      document.getElementById('Announce').style.color = "red";
      document.getElementById('Announce').innerText = "Invalid username/password"    }

  }, document.getElementById('username').value, document.getElementById('password').value )
})
}


function updatedom(data) {
  let container = document.getElementById('books');
  container.innerText="";
  for (var i = 0; i <= data.length - 1; i++) {
    var newElement = document.createElement('DIV');
    var resButton = document.createElement('button');
    var input = document.createElement("input");
    var delBtn = document.createElement('button');
    var newH3 = document.createElement('h3');
    var p0 = document.createElement('p');
    var p1 = document.createElement('p');
    var div = document.createElement('div');

    delBtn.setAttribute('class', "delBtn");
    delBtn.setAttribute("onclick", 'return itemClicked(\'' + data[i].id + '\')');

    newElement.setAttribute('class', "book");

    resButton.setAttribute('class', "resBtn");
    resButton.id = "ko" + i;
    resButton.value = data[i].id;

    div.setAttribute('class', 'div-id');

    newH3.innerText = data[i].name;
    p0.innerText = data[i].shortdesc;
    p1.innerText = data[i].year + " By " + data[i].author;

    resButton.innerText = ((data[i].reserved == 1 ? "Unr" : "R") + "eserve book")

    delBtn.innerText = "Delete book"
    newElement.append(newH3);
    newElement.append(p0);
    newElement.append(p1);
    container.append(newElement);
    newElement.append(resButton);

    p1.setAttribute("id", i);
    document.getElementById("ko" + i).addEventListener("click", (e) => {
      //e.preventDefault()
      //     ReserveFetch(e.target.value, cookieValue);

      e.target.innerText = e.target.innerText.indexOf('Un') !== -1 ? "Reserve book" : "Unreserve book";
      //    widow.location.href =

      //  document.getElementById((e.target.id).charAt(2)).append(input);
    })
    newElement.append(div);
    div.append(resButton);
    div.append(delBtn);
  }
}
