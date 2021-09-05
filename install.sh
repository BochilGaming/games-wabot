pkg update && pkg upgrade
apt update && apt upgrade
bin=$PREFIX/bin
dir=$(pwd)
if [ -e $bin/node ]; then 
  echo "\u001b[32mSkip install nodejs but already installed!"
else 
  echo "\u001b[31mInstaling \u001b[31mnodejs!"
  pkg install nodejs -y
  echo "\u001b[32mDone install nodejs!"
fi

if [ -e $bin/ffmpeg ]; then 
  echo "\u001b[32mSkip install ffmpeg but already installed!"
else
  echo "\u001b[31mInstaling \u001b[31mnpm!"
  pkg install ffmpeg -y
  echo "\u001b[32mDone install ffmpeg!"
fi

if [ -e $bin/magick ]; then 
  echo "\u001b[32mSkip install imagemagick but already installed!"
else
  echo "\u001b[31mInstaling \u001b[31mnpm!"
  pkg install imagemagick -y
  echo "\u001b[32mDone install imagemagick!"
fi

echo "\u001b[33mChecking instalation!"
check
echo "\u001b[32mDone checking instalation!" 

echo "\u001b[33mInstall and update module!"
if [ -e $dir/package.json ]; then
  npm install
  npm update
  echo "\u001b[32Done Install and update module!" 
else 
  echo "\u001b[31mPackage.json not found!"
fi 

echo "\u001b[32mStarting bot..."
echo "\u001b[32mIf found bug pls report in https://github.com/Nurutomo/wabot-aq/issues/new?assignees=&labels=&template=bug_report.md&title="
npm run start


function check() {
  if [ -e $bin/node ]; then
    echo "\u001b[32mNodejs already installed!"
  else
    echo "\u001b[31mNodejs not installed!!, install manualy using `pkg install nodejs -y` or `apt install nodejs -y`"
    exit 1
  fi 

  if [ -e $bin/ffmpeg ]; then
    echo "\u001b[32mFfmpeg already installed!" 
  else
    echo "\u001b[31mFfmpeg not installed!!, install manualy using `pkg install ffmpeg -y` or `apt install ffmpeg -y`"
  fi 

  if [ -e $bin/magick ]; then
    echo "\u001b[32mImagemagick already installed!" 
  else
    echo "\u001b[31mImagemagick not installed!!, install manualy using `pkg install imagemagick -y` or `apt install imagemagick -y`"
  fi 
}