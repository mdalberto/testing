create_www_zip()
{
  rm www.zip
  vim www/js/services/config.js -c "%s/var environment = 'production'/var environment = '$app_environment'/g | x" &&
  vim www/config.xml -c "%s/PsychicSource Test/$app_name/g | x" &&
  if [ -z ${app_description+x} ]; then
    echo "Using default description"
  else
    vim www/config.xml -c "%s/Official PsychicSource Mobile App/$app_description/g | x"
  fi
  cd www &&
  zip -r ../www.zip * &&
  cd .. &&
  git checkout www/config.xml &&
  git checkout www/js/services/config.js &&

  echo "www.zip ready"
}
