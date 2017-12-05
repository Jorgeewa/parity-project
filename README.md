This is a project that uses the parity api to make some basic calls.

Download and go into the folder and run npm install. Go into the client folder and run npm install too. You will have to install concurrently for it to run though. So do npm install concurently --save.

run npm start. This will run the client and backend server concurrently.

visit localhost:3000 to view the application.

The search functionality goes through blocks and reads transaction from that address. It is restricted to a thousand blocks. This takes sometime time because I use promises to await response for all the parameters I need.

However, using address 0x00360d2b7d240ec0643b6d819ba81a09e40e5bcd and uncommenting line 33 and commenting line 32 in server.js will produce some specific results. Though this would not populate transactions received. For it to populate transaction received you can use 0x303de3582fbaeea6d2fece3a910802777708a8d1 or any account in the transactions sent tab.

Happy hacking!
