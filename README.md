# NutriScan

## Deployment

The application is deployed using GitHub Actions with direct server deployment. No DockerHub is required as images are built directly on the server.

### Prerequisites

- SSH access to the deployment server
- GitHub repository secret: `DEPLOY_SSH_KEY` for server authentication

### Deployment Process

1. Push to the `main` branch triggers the deployment workflow
2. GitHub Actions:
   - Connects to server via SSH
   - Pulls latest code
   - Builds Docker image locally
   - Deploys using docker-compose

### Manual Deployment

If needed, you can manually deploy using the deploy script:

```bash
./scripts/deploy.sh
```

This will:
- Stop and remove existing containers (`docker-compose down -v --rmi all`)
- Start new containers (`docker-compose up -d`)
- Clean up unused images

### Server Configuration

- Server: nutriscan.atemkeng.de
- Application Path: `/home/atem/docker/nutriscan`
- Port: 2025 (mapped to container port 3000)

## Development

For local development, use:

```bash
docker-compose up --build
```

See [CHANGELOG.md](CHANGELOG.md) for version history and changes.
