# Property Ads Processor
***
#### Parser for the following sites about real estate ads:
- [Myhome.ge](http://myhome.ge/)
- [Ss.ge](http://ss.ge/)
- [Place.ge](http://place.ge/)
- [Gancxadebebi.ge](http://gancxadebebi.ge/)

## Getting started
**** 
> You must have docker installed!

You can deploy the server with one command


To do this, you need to:
1) Clone the repository:
```bash
git clone https://github.com/kvartalnovd/PropertyAdsProcessor.git
```


2) run docker:
```bash
./src/docker/bin/start  # equal to: docker-compose up -d --build 
```

After that, you can go to the address `localhost` or `127.0.0.1`

Also, in the `hosts` settings, you can register a working domain `processor.io`

> The first launch may take time due to loading docker images

3) Other commands:

```bash
# Let's go to the root directory
cd src

# Check docker services' statuses
# Equal to: docker-compose ps
./docker/bin/status

# Stop all docker services
# Equal to: docker-compose kill
./docker/bin/stop

# Restart all docker services 
# Equal to: ./docker/bin/stop && ./docker/bin/start
./docker/bin/restart

# Exec to a specific container
./docker/bin/exec [Docker service name]
```
