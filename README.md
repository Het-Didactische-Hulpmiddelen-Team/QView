# QView

This is the front-end for our innovative Queueing system.

# Setup

The only configuration you have to do is defining the url of the backend.
You can do this in the first 3 lines of 'js/header.js'.
Please change the 'url' variable and the 'ws' variable.
The first one being the url to which all requests will be sent, the 'ws' variable needs to be the websocket you have set up in the backend.

# Use as a student

As a student you only have to enter your name in the loginwindow that pops up when you visit the site.
You can navigate to any Q-Room you want by clicking the 'Join' button on the index page or by selecting a room from the dropdown menu in the header.

Next, you can either enter a queue or leave a queue you are already a part of. This is achieved by clicking the well marked buttons on the webpage.

# Use as a lector

As a lector you will have to login with the admin username and password.
By default this is 'root' - 'qwerty'. This can be changed in the backend.

Logging in as a lector will hide the buttons to enter or leave a queue, enlarge the Q-Room's name and give you the possibility to delete any person from the queue.