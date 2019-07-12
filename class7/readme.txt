class:08-06-19
.......................................................................................................

controllers
Defining routers

class:09-06-19
........................................................................................................

C drive->data directory -> dbdirectory

relational database             document database
  server                            server
  database                          database
  tables                            collections
  rows                              documents
  columns                           fields

  document--->is a javascript object
  eg:
  {
      id:`1,
      brand:"nokia",
      model:"xr",
      price:4000,
      orders:[
        {date:1/1/2000,qty:2},
        {date:1/1/2000,qty:3},
        {date:1/1/2000,qty:1}]
  }
  {
      id:2,
    brand:"samsung",
    model:"s8",
    price:1000,
  }
   products-tables
id    brand     model       price 
1     nokia     xyz         200

orders
productID  date         qty 
1          1/1/2000      2
1          1/1/2000      3
1          1/1/2000      1

reviews -> new table 


///////  cannot run mongod server for unclean shutdowns

sudo lsof -iTCP -sTCP:LISTEN -n -P
Search for mongod COMMAND and its PID and type,

sudo kill <mongo_command_pid>
Now start your mongod instance by typing,

mongod


// detected lock file 
sudo rm /data/db/mongod.lock