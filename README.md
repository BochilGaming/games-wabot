# Games-Wabot

<a href="https://github.com/BochilGaming/games-wabot/network/members"><img title="Forks" src="https://img.shields.io/github/forks/BochilGaming/games-wabot?label=Forks&color=blue&style=flat-square"></a>
<a href="https://github.com/BochilGaming/games-wabot/watchers"><img title="Watchers" src="https://img.shields.io/github/watchers/BochilGaming/games-wabot?label=Watchers&color=green&style=flat-square"></a>
<a href="https://github.com/BochilGaming/games-wabot/stargazers"><img title="Stars" src="https://img.shields.io/github/stars/BochilGaming/games-wabot?label=Stars&color=yellow&style=flat-square"></a>
<a href="https://github.com/BochilGaming/games-wabot/graphs/contributors"><img title="Contributors" src="https://img.shields.io/github/contributors/BochilGaming/games-wabot?label=Contributors&color=blue&style=flat-square"></a>
<a href="https://github.com/BochilGaming/games-wabot/issues"><img title="Issues" src="https://img.shields.io/github/issues/BochilGaming/games-wabot?label=Issues&color=success&style=flat-square"></a>
<a href="https://github.com/BochilGaming/games-wabot/issues?q=is%3Aissue+is%3Aclosed"><img title="Issues" src="https://img.shields.io/github/issues-closed/BochilGaming/games-wabot?label=Issues&color=red&style=flat-square"></a>
<a href="https://github.com/BochilGaming/games-wabot/pulls"><img title="Pull Request" src="https://img.shields.io/github/issues-pr/BochilGaming/games-wabot?label=PullRequest&color=success&style=flat-square"></a>
<a href="https://github.com/BochilGaming/games-wabot/pulls?q=is%3Apr+is%3Aclosed"><img title="Pull Request" src="https://img.shields.io/github/issues-pr-closed/BochilGaming/games-wabot?label=PullRequest&color=red&style=flat-square"></a>


## Join Group Diskusi
[![Grup WhatsApp](https://img.shields.io/badge/WhatsApp%20Group-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/GVwpKf83s42D1CnIfDW19G) 
**NO BOT**


#### Deploy to Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/BochilGaming/games-wabot)

#### Heroku Buildpack
| BuildPack | LINK |
|--------|--------|
| **FFMPEG** |[here](https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest) |
| **IMAGEMAGICK** | [here](https://github.com/DuckyTeam/heroku-buildpack-imagemagick) |

### FOR TERMUX USER
1. Type mentioned below given commands one by one in Termux.
```sh
$ pkg upgrade && pkg update
$ pkg install git -y
$ pkg install nodejs -y
$ pkg install ffmpeg -y
$ pkg install imagemagick -y
$ git clone https://github.com/BochilGaming/games-wabot -b multi-device
$ cd games-wabot
$ npm i 
```
If error try using yarn instead of npm, see [here](https://github.com/BochilGaming/games-wabot/tree/multi-device#if-npm-install-failed--try--using-yarn-instead-of-npm)
```sh
$ node .
```
2. Wait for bot starting...
3. Scan QR code from 2nd device. (Go to whatsapp > Linked Devices > Join `Multi Device Beta` > Click on `link device`)
4. Now your bot is ready to rock n roll.

#### If npm install failed, try using yarn instead of npm
```sh
$ pkg install yarn -y
$ yarn install
```
---------

## INSTALL ON TERMUX WITH UBUNTU

[ INSTALLING UBUNTU ]

```bash
apt update && apt full-upgrade
apt install wget curl git proot-distro
proot-distro install ubuntu
echo "proot-distro login ubuntu" > $PREFIX/bin/ubuntu
ubuntu
```
---------

[ INSTALLING REQUIRED PACKAGES ]

```bash
ubuntu
apt update && apt full-upgrade
apt install wget curl git ffmpeg imagemagick build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev dbus-x11 ffmpeg2theora ffmpegfs ffmpegthumbnailer ffmpegthumbnailer-dbg ffmpegthumbs libavcodec-dev libavcodec-extra libavcodec-extra58 libavdevice-dev libavdevice58 libavfilter-dev libavfilter-extra libavfilter-extra7 libavformat-dev libavformat58 libavifile-0.7-bin libavifile-0.7-common libavifile-0.7c2 libavresample-dev libavresample4 libavutil-dev libavutil56 libpostproc-dev libpostproc55 graphicsmagick graphicsmagick-dbg graphicsmagick-imagemagick-compat graphicsmagick-libmagick-dev-compat groff imagemagick-6.q16hdri imagemagick-common libchart-gnuplot-perl libgraphics-magick-perl libgraphicsmagick++-q16-12 libgraphicsmagick++1-dev
```

---------

[ INSTALLING NODEJS & GAMES-WABOT ]

```bash
ubuntu
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
apt install -y nodejs gcc g++ make
git clone https://github.com/BochilGaming/games-wabot -b multi-device
cd games-wabot
npm install
npm update
```

---------

## FOR WINDOWS/VPS/RDP USER

* Download And Install Git [`Click Here`](https://git-scm.com/downloads)
* Download And Install NodeJS [`Click Here`](https://nodejs.org/en/download)
* Download And Install FFmpeg [`Click Here`](https://ffmpeg.org/download.html) (**Don't Forget Add FFmpeg to PATH enviroment variables**)
* Download And Install ImageMagick [`Click Here`](https://imagemagick.org/script/download.php)

```bash
git clone https://github.com/BochilGaming/games-wabot -b multi-device
cd games-wabot
npm install
npm update
```

---------

## Run

```bash
node .
```

---------

## Arguments `node . [--options] [<session name>]`

### `--self`

Activate self mode (Ignores other)

### `--pconly`

If that chat not from private bot, bot will ignore

### `--gconly`

If that chat not from group, bot will ignore

### `--swonly`

If that chat not from status, bot will ignore

### `--prefix <prefixes>`

* `prefixes` are seperated by each character
Set prefix

### `--server`

Used for [heroku](https://heroku.com/) or scan through website

### `--restrict`

Enables restricted plugins (which can lead your number to be **banned** if used too often)

* Group Administration `add, kick`

### `--img`

Enable image inspector through terminal

### `--autoread`

If enabled, all incoming messages will be marked as read

### `--autocleartmp`

If enabled, **tmp* folder contain files will be auto delete

### `--nyimak`

No bot, just print received messages and add users to database

### `--test`

**Development** Testing Mode

### `--db`

pass mongodb url or cloud url to connect to database, by the default it will connect to database.json

---------

## FAQ
- How to send button image?
```js
// Syntax
conn.sendButton(
      jid, // jid of the user to send the message to
      text, // text to send
      foooter, // footer to send
      buffer, // buffer to send (optional), if you want to send button image, location, etc
      buttons, // buttons to send, example [['text1', 'id1'], ['text2', 'id2']]
      quoted, // quoted message to send (optional)
      options // options to send, example { asLocation: true }
)

// example 
conn.sendButton(m.chat, 'Hello world!', '@BochilGaming', null, [
      ['Hello', 'hello'], ['Bye', 'bye']
])
// example button location
conn.sendButton(m.chat, 'Hello world!', '@BochilGaming', 'https://github.com/BochilGaming', 
      [['Hello', 'hello'], ['Bye', 'bye']], 
      null, { asLocation: true }
)
```

- Why my plugins not working in this multi-device?
      
> Please cek syntax error on your plugins. and maybe your script still using CJS
> This multi-device script use ESM and CJS [(legacy code)](https://github.com/BochilGaming/games-wabot/tree/main) not support yet. Learn more about [ESM](https://nodejs.org/api/esm.html)

- How to delete session?

> You can delete folder `sessions` or run command ```rm -rf sessions```

- Why i can't scan qr code?

> if your error like this ```(node:7016) UnhandledPromiseRejectionWarning: TypeError [ERR_INVALID_ARG_TYPE]: The "key" argument must be of type string or an instance of Buffer, TypedArray, DataView, or KeyObject. Received undefined``` you can use [multi-device branch](https://github.com/BochilGaming/games-wabot/tree/multi-device)

- How to change owner number?

> You can change in `config.js`, on global.owner. make sure you use correct syntax.
```js
global.owner = [
  ['6281319944687', 'BG', true]
]
```
> First argument on array is number like `6281319944687`, second argument is name like `BG` (if this argument pass, if using `owner` command, this number will send as owner), third argument is developer like `true` (if this argument pass, if there have plugins error (not syntax error) the error will send to developer)
---------

### want to contribute?
1. fork this repository
2. Change/edit/create what you want. for example you can add features, fix bug, etc
3. **test** before making a pull req!!
4. make a pull req!
5. if your pull req is already in **acc/merge**, you can delete your branch or you can create pull req again :)

---------


### Thanks To 
**Allah SWT**,

**Orang Tua**,

**Semua yang selalu mendukung**


#### Special Thanks to
[![Nurutomo](https://github.com/Nurutomo.png?size=100)](https://github.com/Nurutomo)
[![BochilGaming](https://github.com/BochilGaming.png?size=100)](https://github.com/BochilGaming)

#### Contributor
[![Adiixyz](https://github.com/Adiixyz.png?size=100)](https://github.com/Adiixyz)
[![idhamthoriqbot](https://github.com/idhamthoriqbot.png?size=100)](https://github.com/idhamthoriqbot)
[![BlueShiYT](https://github.com/BlueShiYT.png?size=100)](https://github.com/BlueShiYT)
[![zatu22](https://github.com/zatu22.png?size=100)](https://github.com/zatu22)
[![unx21](https://github.com/unx21.png?size=100)](https://github.com/unx21)
[![botstylee](https://github.com/botstylee.png?size=100)](https://github.com/botstylee)
[![Jauhariq](https://github.com/Jauhariq.png?size=100)](https://github.com/Jauhariq)
[![Nobuyaki](https://github.com/Nobuyaki.png?size=100)](https://github.com/Nobuyaki)
[![Aiinne](https://github.com/Aiinne.png?size=100)](https://github.com/Aiinne)
[![arisawali2014](https://github.com/arisawali2014.png?size=100)](https://github.com/arisawali2014)
[![ryznxx](https://github.com/ryznxx.png?size=100)](https://github.com/ryznxx)
[![ZeroChanBot](https://github.com/ZeroChanBot.png?size=100)](https://github.com/ZeroChanBot)
[![Bintangp02](https://github.com/Bintangp02.png?size=100)](https://github.com/Bintangp02)
[![itsmeR1F4I](https://github.com/itsmeR1F4I.png?size=100)](https://github.com/itsmeR1F4I)
[![DineshValor](https://github.com/DineshValor.png?size=100)](https://github.com/DineshValor)
[![TeamMars20](https://github.com/TeamMars20.png?size=100)](https://github.com/TeamMars20)
