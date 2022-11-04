COMMAND=$1
SERVICE=$2
STACK_LAYER=$3
npx cdk $COMMAND --app "node integration_dist/${SERVICE}/infrastructure.js build ${STACK_LAYER}" --all $4 $5