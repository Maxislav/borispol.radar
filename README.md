# borispol.radar
Борисполь метеорадар

###Required

php

### Install
git clone https://github.com/Maxislav/borispol.radar

cd borispol.radar

npm i
### Start

Edit cron.sh <br/>

```
#!/usr/bin/env bash
cd ~/www/borispol.radar/php
php saveimgs.php
```



~$ crontab -e <br/>
add line <br />
```
0 * * * * sh ~www/borispol.radar/cron.sh
```



### dev
grunt 

###prod

grunt prod

### Demo

[Борисполь радар](http://borispol.hol.es/)