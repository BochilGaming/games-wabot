bin=$PREFIX/bin
dir=$(pwd)
alias ee='echo -e'
if [ -e $bin/git ]; then 
  ee "\u001b[32mSkip install git but already installed!"
else 
  ee "\u001b[31mInstaling \u001b[31mgit!"
  pkg install nodejs -y
  ee "\u001b[32mDone install git!"
fi

ee "\u001b[33mChecking instalation!"
check
ee "\u001b[32mDone checking instalation!" 

ee "\u001b[36mCloning reposito!"
git clone https://github.com/BochilGaming/games-wabot.git games-wabot
if [ -d $dir/games-wabot ]; then
  ee "\u001b[36mDone clone reposito!"
else
  ee "\u001b[31mFail to clone reposito!"
  exit 1
fi

ee "\u001b[36mChange working directory!"
cd games-wabot
main_dir=$(pwd)
if [ $main_dir !== $dir ]; then
  ee "\u001b[36mDone change working directory!"
  ee "\u001b[36mInstalling bot!"
  bash install.sh
else 
  ee "\u001b[31mFail to change working directory!!"
  exit 1
fi

function check() {
  if [ -e $bin/git ]; then
    ee "\u001b[32mGit already installed!"
  else
    ee "\u001b[31mGit not installed!!, install manualy using `pkg install git -y` or `apt install git -y` and after that, type `bash install2.sh`"
    exit 1
  fi
}