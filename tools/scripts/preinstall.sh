echo $NODE_ENV
# checks if env var NODE_ENV is set to 'production'
if [ "$NODE_ENV" = "production" ]; then
  # if it is, run the cleanup script
  ./tools/scripts/remove-lines.sh
fi

