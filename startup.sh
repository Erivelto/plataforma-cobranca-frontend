# Azure App Service deployment script
echo "Building application..."
npm install
npm run build

echo "Starting application..."
node dist/index.js