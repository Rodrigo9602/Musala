# Gateway's administrator

# Presentation
Web application for the administration of gateways, built on the basis of javascript frameworks, intended for the management, creation and updating of gateways as well as the peripheral devices associated with them. The fundamental objectives that are pursued after the implementation of this project are based on the need to create a web tool for the management of gateways or master devices, as will also be defined, capable of managing the entire process from the creation of a gateway, its update, its information displayed in detail and in turn guarantee a simple and intuitive environment for the user.

# Product Backlog
> Management of gateways able to control and associate to peripheral devices following a predefined structure.
> Storage gateways objects in a database or locally, as well as the peripheral devices associated with them.
> Operation for displaying information about all stored gateways (and their devices).
> Operation for desplaying details for a single gateway.
> Operations for add and delete devices from an especific gateway.

# Main functionalities developed
1. Creation and display of gateways storaged.
2. Search of a specific gateway and the possibility of providing all its detailed information.
3. Add or delete a device from a specific gateway.

## Start guide

### Installation requierements
1. Node 16
2. npm 8.19.2
3. Docker 20.10.21


### Installation procedure
 ```bash
# in the root folder of the project 
# on mac or Linux
$ cd ./backend
$ npm i #install dependencies
# this start the service on the background
$ sudo docker-compose up -d
$ npm start

# in the root folder of the project
# on mac or Linux
$ cd ./frontend
$ npm i #install dependencies
$ npm start
 ```



### Basic knowledge to understand and refine the code
1. JavaScript
2. TypeScript
3. NodeJs 
4. Angular version 14.1.0
5. MongoDB
6. Express
7. Mongoose





# Code Arquitecture
- *frontend folder* : Folder used for store all files related to the development of the user interface.
    -*package.json* : configuration of dependencies and scripts for start, build and test the app.
    -*src* : Folder used to store all the components, data models, services and app routing, resources and global styles.
        -*app*: Folder used to mainly store components, data models, services and app routing.       
            -*app.routing.ts* : File for routes configurations and administration.
            -*components folder* : folder for store all components
            -*services folder*: Folder for store the apps services
                -*gateway.service.ts*: Services for http request related to gateways management.
            -*UI folder* : UI related components.

- *backend folder* : Folder used for store all files related to the development of the API REST.
     -*package.json* : configuration of dependencies and scripts for start, build and test the app.
     -*app.js* : file used to establish the prefixes to the different routes of the Api and for the configuration of the Cors.
     -*index.js* :  started point file, used to stablish communication with database server.
     -*test folder* : Folder used for store the gateway.test file where all unit test are developed.
     -*routes* :  Forlder use to storage the file destined to resolve the http request made to our API
     -*models folder*: Folder used to store the data models used.
     -*functions* :  Folder used to store functions for differents tasks.
        -*addDevices.function.js* : function used to add a device to a concret gateway's devices array.
        -*create_uid.js* : function used to generate a random 8 digits number for devices unique identificator.
        -*deleteDevices.function.js* : function used to delete a device from a concret gateway's devices array and also delete the device from device's collection.
        -*saveDevices.js* : function used to save a device on device's collection.
    -*controllers folder* : Folder used for store gateway's controller.
        -*gateway.controller.js* : Controller for gateways, all method for the Api are implemented on this file.


# Documantation Rules
1. For establish pending code please use the tag PENDING at the beggining of each comment.
2. All functions must be documented with a general description.
3. All files must contain a general description and authors name for future reference.

# Improvement Aspects
1. Implement the functionality for delete a gateway in case of being necessary.
2. Update the ui styles.
3. Add referencial links for about us information and other views on th frontend.
4. Optimize the use of styles for all components.
5. Add the visualation of message from backend in case of error.
6. Add the functionality for update the status of a single device on a specific gateway.
7. Modify visual alerts.
 






