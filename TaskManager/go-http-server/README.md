## GO HTTP Server

Serves HTTP requests for working with files in a directory

GO version 1.14.4

## Flags

    -dir string
        HTTP server's dir. Default: "./root" (default "./root")
    -host string
        HTTP server's host. Default: "localhost"
    -port string
        HTTP server's port. Default: "8080" (default "8080")
        
## Structure
    .
    ├── bin
    │   ├── server
    │   └── server.exe
    ├── root
    │   ├── public
    |   |   ├── css
    |   |   |   └── main.css
    |   |   ├── fonts
    |   |   ├── img
    |   |   └── js
    |   |       └── main.js
    │   └── index.html
    ├── README.md
    └── server.go