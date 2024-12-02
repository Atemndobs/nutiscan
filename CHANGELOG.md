# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-09

### Changed
- Updated deployment workflow to build Docker images directly on the server
- Removed DockerHub dependencies and configurations
- Modified deployment script to use local Docker builds
- Updated docker-compose configuration for better cleanup with `-v --rmi all` flags

### Added
- New GitHub Actions workflow for continuous deployment
- Direct server deployment using SSH key authentication
- Automated Docker image building on the server
- Comprehensive cleanup of Docker resources during deployment

### Removed
- DockerHub integration and related configurations
- Remote Docker image pulling
