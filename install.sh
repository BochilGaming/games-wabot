pkg update && pkg upgrade
apt update && apt upgrade
bin=$PREFIX/bin
dir=$(pwd)
alias ee='echo -e'
if [ -e $bin/node ]; then 
  ee "\u001b[32mSkip install nodejs but already installed!"
else 
  ee "\u001b[31mInstaling \u001b[31mnodejs!"
  pkg install nodejs -y
  ee "\u001b[32mDone install nodejs!"
fi

if [ -e $bin/ffmpeg ]; then 
  ee "\u001b[32mSkip install ffmpeg but already installed!"
else
  ee "\u001b[31mInstaling \u001b[31mffmpeg!"
  pkg install ffmpeg -y
  ee "\u001b[32mDone install ffmpeg!"
fi

if [ -e $bin/magick ]; then 
  ee "\u001b[32mSkip install imagemagick but already installed!"
else
  ee "\u001b[31mInstaling \u001b[31mimagemagick!"
  pkg install imagemagick -y
  ee "\u001b[32mDone install imagemagick!"
fi

ee "\u001b[33mChecking instalation!"
check
ee "\u001b[32mDone checking instalation!" 

ee "\u001b[33mInstall and update module!"
if [ -e $dir/package.json ]; then
  npm install
  npm update
  ee "\u001b[32Done Install and update module!" 
else 
  ee "\u001b[31mPackage.json not found!"
fi 

ee "\u001b[32mStarting bot..."
ee "\u001b[32mIf found bug pls report in https://github.com/Nurutomo/wabot-aq/issues/new?assignees=&labels=&template=bug_report.md&title="
npm run start


function check() {
  if [ -e $bin/node ]; then
    ee "\u001b[32mNodejs already installed!"
  else
    ee "\u001b[31mNodejs not installed!!, install manualy using `pkg install nodejs -y` or `apt install nodejs -y`"
    exit 1
  fi 

  if [ -e $bin/ffmpeg ]; then
    ee "\u001b[32mFfmpeg already installed!" 
  else
    ee "\u001b[31mFfmpeg not installed!!, install manualy using `pkg install ffmpeg -y` or `apt install ffmpeg -y`"
  fi 

  if [ -e $bin/magick ]; then
    ee "\u001b[32mImagemagick already installed!" 
  else
    ee "\u001b[31mImagemagick not installed!!, install manualy using `pkg install imagemagick -y` or `apt install imagemagick -y`"
  fi 
}