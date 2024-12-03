# NutiScan: Local-First Receipt Tracking

## Local-First Architecture

NutiScan now implements a local-first approach using Dexie.js, providing:

- 🚀 Instant, offline-first data storage
- 💾 Client-side IndexedDB persistence
- 🔄 Future-ready synchronization capabilities

### Key Features

- Local data storage with Dexie.js
- Offline functionality
- Easy data synchronization
- Performance-optimized local queries

### Database Structure

- **Scans**: Store receipt metadata
- **Products**: Store individual product details
- Automatic relationship management

### Sync Strategy

1. Local-first data storage
2. Seamless offline support
3. Prepared for future remote sync

### Getting Started

```bash
npm install dexie dexie-observable dexie-syncable
```

### Future Roadmap

- Remote database synchronization
- Cloud backup options
- Enhanced offline capabilities

## Development

For local development, use:

```bash
docker-compose up --build
```

See [CHANGELOG.md](CHANGELOG.md) for version history and changes.
