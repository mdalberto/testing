create_www_zip()
{
  rm www.zip
  vim www/js/services/config.js -c "%s/var environment = 'production'/var environment = '$app_environment'/g | x" &&
  vim www/config.xml -c "%s/PsychicSource Test/$app_name/g | x" &&
  cd www &&
  zip -r ../www.zip * &&
  cd .. &&
  git checkout www/config.xml &&
  git checkout www/js/services/config.js &&

  echo "www.zip ready"
}
