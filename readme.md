## Backbone Postgres Seed

### Synopsis

Backbone + Postgres + Express + Node 6

### Installation

    ./install.sh
    
### Usage 

#### Development
    
    npm run watch
    npm run webpack
    npm run dev
    
#### Production

##### /shintech/bbps_deploy
    
    git clone https://github.com/shintech/bbps_deploy
    cd bbps_deploy
    docker-compose pull
    docker-compose up -d

    
### Notes 

    #Edit /etc/postgresql/9.4/main/pg_hba.conf 
    
    local   all             postgres                                trust #peer
    
    #######################################################################
    
    sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
    psql -f db.sql -U postgres
    
    #GET models
    curl http://127.0.0.1:8000/api/models
    
    #GET models/:id
    curl http://127.0.0.1:8000/api/models/:id
    
    #POST models
    curl -H "Content-Type: application/json" -X POST -d '{ "name":"killbill", "attribute":1 }' http://127.0.0.1:8000/api/models
    
    #PUT models
    curl -H "Content-Type: application/json" -X PUT -d '{ "name":"Kill Bill" }' http://127.0.0.1:8000/api/models/2
    
    #DELETE models
    curl -X DELETE http://127.0.0.1:8000/api/models/1