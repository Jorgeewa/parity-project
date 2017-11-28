This is a project that uses the parity api to make some basic calls.

Download and go into folder and run npm install.

run npm start. This will run the client and backend server concurrently.

visit localhost:3000 to view the application.

The search functionality goes through blocks and reads transaction from that address. It is restricted to a thousand blocks.

However, using address 0x00360d2b7d240ec0643b6d819ba81a09e40e5bcd and uncommenting line 33 and commenting line 32 in server.js will produce some specific results. Though would not populate transactions received.