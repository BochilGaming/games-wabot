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

---------

## Installation For Termux User
### Requirement:
* Android 7 or above
* Internet
* 2 Device (one to scan qr code from whatsapp web)
* Little bit IQ

### Steps To Setup Bot Into Termux
* Download Termux. [`Download`](https://github.com/termux/termux-app/releases/download/v0.118.0/termux-app_v0.118.0+github-debug_universal.apk)
* Download `node_modules`. [`Download`](https://drive.google.com/file/d/1Ydcjt3PnGiOr9vL66dFC11V0sEywJb32/view?usp=drivesdk)
* Fork repo or download `games-wabot`. [`Download`](https://github.com/BochilGaming/games-wabot/archive/refs/heads/multi-device.zip)
* Open termux.
* Type below given commands one by one ↓↓
(do not try to copy `$` along with command 😂)
```
$ termux-setup-storage
$ pkg update && pkg upgrade
$ pkg install git
$ pkg install nodejs-lts -y
$ pkg install ffmpeg -y
$ pkg install imagemagick -y
$ pkg install yarn
$ cd /storage/downloads
$ git clone https://github.com/BochilGaming/games-wabot
╭──────────────────
│[If Error in git clone]
│• download `games-wabot` from 3nd step.
│• extract `games-wabot.zip` using any file manager into `downloads` folder.
╰──────────────────
$ cd /storage/downloads/valor-bot
(Here replace `games-wabot` name with current download `games-wabot` folder name)
```
* Extract `node_modules.zip` using any file manager into `games-wabot` folder. For ex. (downloads/games-wabot/node_modules)
* Continue in termux after `$ cd /storage/downloads/games-wabot`
```
$ node .
╭──────────────────
│[If Error after excute `node .`]
│• check twice node_modules
│• contact me on whatsapp
╰──────────────────
```
* Wait for bot starting...
* Scan QR code from 2nd device. (Go to whatsapp > Linked Devices > Join `Multi Device Beta` > Click on `link device`)
```
╭──────────────────
│[If device vibrate but not connected]
│• open file manager, go to `downloads > valor-bot > session.data.json` & delete session.data.json file.
│• exit from termux.
╰──────────────────
$ cd /storage/downloads/games-wabot-bot
$ node .
```
* Scan QR code, once bot connected, appear green in termux at first boot-up.

*Caution:- If failed again to scan QR code, then repeat steps.

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
git clone https://github.com/BochilGaming/games-wabot
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
git clone https://github.com/BochilGaming/games-wabot
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

### `--big-qr`

If small qr unicode doesn't support

### `--restrict`

Enables restricted plugins (which can lead your number to be **banned** if used too often)

* Group Administration `add, kick`

### `--img`

Enable image inspector through terminal

### `--autoread`

If enabled, all incoming messages will be marked as read

### `--nyimak`

No bot, just print received messages and add users to database

### `--test`

**Development** Testing Mode

### `--trace`

```js
conn.logger.level = 'trace'
```

### `--debug`

```js
conn.logger.level = 'debug'
```

---------

## How To Customise Message Display

### Message With Image-Location, Template-URL, Template-Call, Buttons
```
conn.sendHydrated(m.chat, 'text', 'footer', 'image.jpg', 'template-url', 'Template-Name', '0123456789', 'Template-CALL', [
      ['Donate', '/donasi'],
      ['Speed', '/ping'],
      ['Owner', '/owner']
], m, {asLocation: true})
```

### Remove Template Call Button
* Replace 'Template-Call' with 'null' both places to remove it.
```
conn.sendHydrated(m.chat, 'text', 'footer', 'image.jpg', 'template-url', 'Template-Name', null, null, [
      ['Donate', '/donasi'],
      ['Speed', '/ping'],
      ['Owner', '/owner']
    ], m, {asLocation: true})
```

### Remove Both Template URL & Call Button
* Replace 'Template-URL' & 'Template-Call' with 'null' each time both places to remove it.
```
conn.sendHydrated(m.chat, 'text', 'footer', 'image.jpg', null, null, null, null, [
      ['Donate', '/donasi'],
      ['Speed', '/ping'],
      ['Owner', '/owner']
    ], m, {asLocation: true})
```
### Add/Remove/Edit Buttons
* To remove button, delete `['button', '/button']` row.
* To add button, add `['button', '/button']` code line.
* To edit/rename button, edit/rename `button` name.
```
conn.sendHydrated(m.chat, 'text', 'footer', 'image.jpg', null, null, null, null, [
      ['Button¹', '/button¹'],
      ['Button²', '/button²'],
      ['Button³', '/button³]
    ], m, {asLocation: true})
```

### Add/Remove/Edit Image
* To remove image, replace 'image.jpg' with 'null'.
```
conn.sendHydrated(m.chat, 'text', 'footer', null, 'template-url', 'Template-Name', '0123456789', 'Template-CALL', [
      ['Donate', '/donasi'],
      ['Speed', '/ping'],
      ['Owner', '/owner']
], m, {asLocation: true})
```
* To change image, replace 'image.jpg' with custom 'image.jpg link'.
```
conn.sendHydrated(m.chat, 'text', 'footer', 'https://telegra.ph/file/fe5883c8011fd033e395c.jpg', 'template-url', 'Template-Name', '0123456789', 'Template-CALL', [
      ['Donate', '/donasi'],
      ['Speed', '/ping'],
      ['Owner', '/owner']
], m, {asLocation: true})
```
---------

### Thanks To 
**Allah SWT**

[![Nurutomo](https://github.com/Nurutomo.png?size=100)](https://github.com/Nurutomo)
[![BochilGaming](https://github.com/BochilGaming.png?size=100)](https://github.com/BochilGaming)

#### Contributor
[![idhamthoriqbot](https://github.com/idhamthoriqbot.png?size=100)](https://github.com/idhamthoriqbot)
[![zatu22](https://github.com/zatu22)](https://github.com/zatu22)
[![Adiixyz](https://github.com/Adiixyz.png?size=100)](https://github.com/Adiixyz)
[![Nobuyaki](https://github.com/Nobuyaki.png?size=100)](https://github.com/Nobuyaki)
[![arisawali2014](https://github.com/arisawali2014.png?size=100)](https://github.com/arisawali2014)
[![botstylee](https://github.com/botstylee)](https://github.com/botstylee)
