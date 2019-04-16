const tape = require('tape');

const createUser = require('../src/queries/createUser');
const runDBuild  = require('../src/database_test/db_build.js');
const getBooks = require('../src/queries/getBooks.js')
const getUsers = require('../src/queries/getUsers.js');
tape("Tape is working", t => {
  t.equals(1, 1, "one equals one");
  t.end();
});

tape("Tape is working", t => {
  t.equals(1, 1, "one equals one");
  t.end();
});




let staticData = [{ id: 1,
    name: 'Linux is a nutshell',
    author: 'AbuSalma',
    year: 2009,
    shortdesc: "a book describing the whole abu salma story" },
  { id: 2,
    name: 'Linux is a not nutshell',
    author: 'Abu-Salma',
    year: 2011,
  shortdesc:  "a book describing the whole abu salma story"  },
  { id: 3,
    name: 'Linux is a nothing',
    author: 'AbuSalma1',
    year: 1999,
  shortdesc: "a book describing the whole abu salma story"  },
  { id: 4,
    name: 'Windows is a nutshell',
    author: 'Abu',
    year: 1965,
  shortdesc: "a book describing the whole abu salma story"  }];


const staticUsers =  [ { id: 1,
        username: 'john',
        name: 'John smith1',
        password: 'hashed',
        reservedbooks: null },
      { id: 2,
        username: 'karam23223',
        name: 'Karam Ashqar',
        password: 'hashed',
        reservedbooks: null },
      { id: 3,
        username: 'faris12',
        name: 'faris',
        password: '123456',
        reservedbooks: null } ]





tape("db_build test", (t)=>{
  runDBuild(function(err,res){
getBooks((err,data)=>{
  if (err){
    t.end("there was eror")
  }else{
    t.deepEqual(staticData,data,"Test passed")
  t.end()}
})
  })
})

tape('User has been created',(t)=>{
  runDBuild(function(err,res){
    createUser( 'faris', 'faris12', '123456', ()=> {
      getUsers((err,data)=>{
        if (err){
          t.end("there was eror")
        }else{
          t.deepEqual(staticUsers,data,"Test passed")
          console.log(data);
        t.end()}
    } )

})
})})
