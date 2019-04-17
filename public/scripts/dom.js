function toSignup() {
  location.href = "/signup"
}

function toLogin() {
  location.href = "/"
}

if (document.cookie) {
  checkCookies(function(res) {
    console.log(res + 'h');
  }, document.cookie.split("password=")[1])
}
const cookie = document.cookie;

function updatedom(data) {
  let container = document.getElementById('books');
  container.innerText = "";
  for (var i = 0; i <= data.length - 1; i++) {
    var book = document.createElement('DIV');
    var resBtn = document.createElement('button');
    var title = document.createElement('h3');
    var p0 = document.createElement('p');
    var p1 = document.createElement('p');
    var div = document.createElement('div');
    book.setAttribute('class', "book");

    resBtn.setAttribute('class', "resBtn");
    resBtn.id = "ko" + i;
    resBtn.value = data[i].id;

    resBtn.setAttribute('onclick', `resBook(${data[i].id})`);

    div.setAttribute('class', 'div-id');

    title.innerText = data[i].name;
    p0.innerText = data[i].shortdesc;
    p1.innerText = data[i].year + " By " + data[i].author;

    resBtn.innerText = ((data[i].avilable == 0 ? "Unr" : "R") + "eserve book");

    book.append(title);
    book.append(p0);
    book.append(p1);
    container.append(book);
    book.append(resBtn);

    p1.setAttribute("id", i);
    document.getElementById("ko" + i).addEventListener("click", (e) => {

      e.target.innerText = e.target.innerText.indexOf('Un') !== -1 ? "Reserve book" : "Unreserve book";
    })
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
};
