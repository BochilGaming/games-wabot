pkg update && pkg upgrade
apt update && apt upgrade
bin=$PREFIX/bin
dir=$(pwd)
if [ -e $bin/node ]; then 
  echo -e "\u001b[32mSkip install nodejs but already installed!"
else 
  echo -e "\u001b[31mInstaling \u001b[31mnodejs!"
  pkg install nodejs -y
  echo -e "\u001b[32mDone install nodejs!"
fi

if [ -e $bin/ffmpeg ]; then 
  echo -e "\u001b[32mSkip install ffmpeg but already installed!"
else
  echo -e "\u001b[31mInstaling \u001b[31mffmpeg!"
  pkg install ffmpeg -y
  echo -e "\u001b[32mDone install ffmpeg!"
fi

if [ -e $bin/magick ]; then 
  echo -e "\u001b[32mSkip install imagemagick but already installed!"
else
  echo -e "\u001b[31mInstaling \u001b[31mimagemagick!"
  pkg install imagemagick -y
  echo -e "\u001b[32mDone install imagemagick!"
fi

echo -e "\u001b[32mUpdate npm version"
npm install -g npm@6.14.14
echo -e "\u001b[32mDone Update npm version!"

echo -e "\u001b[33mChecking instalation!"
check() {
  if [ -e $bin/node ]; then
    echo -e "\u001b[32mNodejs already installed!"
  else
    echo -e "\u001b[31mNodejs not installed!!, install manualy using `pkg install nodejs -y` or `apt install nodejs -y`"
    exit 1
  fi 

  if [ -e $bin/ffmpeg ]; then
    echo -e "\u001b[32mFfmpeg already installed!" 
  else
    echo -e "\u001b[31mFfmpeg not installed!!, install manualy using `pkg install ffmpeg -y` or `apt install ffmpeg -y`"
  fi 

  if [ -e $bin/magick ]; then
    echo -e "\u001b[32mImagemagick already installed!" 
  else
    echo -e "\u001b[31mImagemagick not installed!!, install manualy using `pkg install imagemagick -y` or `apt install imagemagick -y`"
  fi 
}

check
echo -e "\u001b[32mDone checking instalation!" 

echo -e "\u001b[33mInstall and update module!"
if [ -e $dir/package.json ]; then
  npm install
  npm update
  echo -e "\u001b[32Done Install and update module!" 
else 
  echo -e "\u001b[31mPackage.json not found!"
fi 

echo -e "\u001b[32mStarting bot..."
echo -e "\u001b[32mIf found bug pls report in \u001b[33;1mhttps://github.com/Nurutomo/wabot-aq/issues/new?assignees=&labels=&template=bug_report.md&title="
npm run start
