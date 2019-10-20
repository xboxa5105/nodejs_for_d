## Requirements

For development, you will only need Node.js and a node global package, Yarn, Redis, installed in your environement.

### Node
- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
      $ sudo apt-get install -y nodejs

If the installation was successful, you should be able to run the following command.

    $ node --version
    v12.11.1

    $ npm --version
    6.11.3

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/xboxa5105/nodejs_for_d.git
    $ cd nodejs_for_d
    $ yarn install

## Configure app

You will need a .env file:

    $ vi .env

And edit your redis port and redis host

## Redis installation

    $ sudo apt-get install redis-server
    $ sudo systemctl enable redis-server.service

## Running the project

    $ npm run start
