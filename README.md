# Cachifyrest
Front-end developers who they working on spa clients need fast rest-full apis. but problem will come when they working in large company and the api is too slow because of server is not a live for 24h/day or other reseans .

Cachifyrest let us to cache every requests from mother-server, so Hooray we can develop front with more power !

## Features 

 - Set `port`, `timeout`, `cacheMaxAge` in cli . 

## Technology

Cachifyrest is built with the [expressjs 4](https://expressjs.com/) framework. We're
using [Axios](https://github.com/axios/axios) as a fetch function.

## Requirements

You need [Nodejs](https://nodejs.org/) `>=1.5.x` .

## Installation
```bash
yarn global add cachifyrest
# OR
npm i -g cachifyrest
```

## Running the Cache Server
```bash
cachifyrest -timeout 5000 -cache 900000 -port 3110
# OR
cachifyrest -t 5000 -c 900000
```
You will see sth like this :

```bash

██████╗ █████╗  ██████╗██╗  ██╗██╗███████╗██╗   ██╗██████╗ ███████╗███████╗████████╗
██╔════╝██╔══██╗██╔════╝██║  ██║██║██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝╚══██╔══╝
██║     ███████║██║     ███████║██║█████╗   ╚████╔╝ ██████╔╝█████╗  ███████╗   ██║   
██║     ██╔══██║██║     ██╔══██║██║██╔══╝    ╚██╔╝  ██╔══██╗██╔══╝  ╚════██║   ██║ v1.0.0
╚██████╗██║  ██║╚██████╗██║  ██║██║██║        ██║   ██║  ██║███████╗███████║   ██║ Made in FanapSoft
 ╚═════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝ 
                                                                                     
Cache server listening on port 3110 !
─────────────────────────────────────
- Request Timeout   : 30000ms / 0:30 m:s
- Cache MaxAge      : 900000ms / 15:00 m:s
- Server Port       : 3110
- Server Addresses  :
  local     localhost    
  local     127.0.0.1    
  enp6s0    192.168.1.106
  wlp2s0    192.168.1.108
  docker0   172.17.0.1   
  tun0      10.10.194.164
─────────────────────────────────────
```

## Have a question?

Any issues or questions (no matter how basic), open an issue. Please take the
initiative to read relevant documentation and be pro-active with debugging.


## Want to contribute?

Contributions are welcome. If you're changing something non-trivial, you may
want to submit an issue before creating a large pull request.

## License

MIT
