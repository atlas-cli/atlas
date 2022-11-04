COMMAND=$1
SERVICE=$2
STACK_LAYER=$3
npm run build:packages
npm run build:integration
npx cdk $COMMAND --app "node integration_dist/${SERVICE}/infrastructure.js build ${STACK_LAYER}" --all $4 $5