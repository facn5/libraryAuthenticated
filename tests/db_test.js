const tape = require('tape');

const createUser = require('../src/queries/createUser');
const runDBuild  = require('../src/database_test/db_build.js');
const getBooks = require('../src/queries/getBooks.js')
tape("Tape is working", t => {
  t.equals(1, 1, "one equals one");
  t.end();
});

tape("Tape is working", t => {
  t.equals(1, 1, "one equals one");
  t.end();
});

tape("db_build test", (t)=>{
  runDBuild(function(err,res){
getBooks((err,data)=>{
  if (err){
    t.end("there was eror")
  }else{
    t.deepEqual([ { id: 1,
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
      shortdesc: "a book describing the whole abu salma story"  } ],data,"Test passed")
  t.end()}
})
  })
})
