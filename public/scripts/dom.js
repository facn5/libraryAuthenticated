function toSignup() {
  location.href = "/signup";
}

function toLogin() {
  location.href = "/";
}

if (document.getElementById("logout")) {
  document.getElementById("logout").addEventListener("click", function(e) {
    e.preventDefault();

    logOut(function() {
      setTimeout(function() {
        location.href = "/";
        
      }, 1500)
    });
  });
}

if (document.cookie) {
  checkCookies(function(res) {
    console.log(res + "h");
  }, document.cookie.split("password=")[1]);
}
const cookie = document.cookie;
if (document.getElementById('signUpBtn')) {

  document.getElementById('signUpBtn').addEventListener('click', function(e) {
    e.preventDefault()
    createUsers(function(data) {

      if (data.indexOf('Done') !== -1) {
        document.getElementById('Announce').innerText = "Signed up successfully";
        document.getElementById('Announce').style.color = "green"

        setTimeout(function() {
          location.href = "/home"
        }, 1500)
      }


            else if( data.indexOf("exist") !== -1 ) {
              document.getElementById('Announce').innerText = "User already exists!";
              document.getElementById('Announce').style.color = "red"
            }
      else  {
        data = data.replace(/"/g, "")
        document.getElementById('Announce').innerText = data;
        document.getElementById('Announce').style.color = "red"
      }



    }, document.getElementById('name').value, document.getElementById('username').value, document.getElementById('password').value)

  })

}

if (document.cookie) {
  // console.log(document.cookie.split("password=")[1]);

  checkCookies(function(res) {}, document.cookie.split("password=")[1]);
}

if (document.getElementById("loginBtn")) {
  document.getElementById("loginBtn").addEventListener("click", function(e) {
    e.preventDefault();

    logIN(
      function(data) {
        if (data === "true") {
          document.getElementById("Announce").style.color = "green";
          document.getElementById("Announce").innerText =
            "Logged in successfully";

          setTimeout(function() {
            location.href = "/home";
          }, 1500);
        } else {
          document.getElementById("Announce").style.color = "red";
          document.getElementById("Announce").innerText =
            "Invalid username/password";
        }
      },
      document.getElementById("username").value,
      document.getElementById("password").value
    );
  });
}

function updatedom(data) {
  let container = document.getElementById("books");
  container.innerText = "";
  for (var i = 0; i <= data.length - 1; i++) {
    var book = document.createElement("DIV");
    var resBtn = document.createElement("button");
    var title = document.createElement("h3");
    var p0 = document.createElement("p");
    var p1 = document.createElement("p");
    var div = document.createElement("div");
    book.setAttribute("class", "book");

    resBtn.setAttribute("class", "resBtn");
    resBtn.id = "ko" + i;
    resBtn.value = data[i].id;

    resBtn.setAttribute("onclick", `resBook(${data[i].id})`);

    div.setAttribute("class", "div-id");

    title.innerText = data[i].name;
    p0.innerText = data[i].shortdesc;
    p1.innerText = data[i].year + " By " + data[i].author;

    resBtn.innerText = (data[i].avilable == 0 ? "Unr" : "R") + "eserve book";

    book.append(title);
    book.append(p0);
    book.append(p1);
    container.append(book);
    book.append(resBtn);

    p1.setAttribute("id", i);
    document.getElementById("ko" + i).addEventListener("click", e => {
      e.target.innerText =
        e.target.innerText.indexOf("Un") !== -1
          ? "Reserve book"
          : "Unreserve book";
    });
    book.append(div);
    div.append(resBtn);
  }
}

function resBook(id) {
  var username = cookie.substring(
    cookie.lastIndexOf("username=") + 9,
    cookie.lastIndexOf(";")
  );

  reserveBook(id, username);
}
