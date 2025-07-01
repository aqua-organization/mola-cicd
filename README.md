# Mola CI/CD Pipeline

A comprehensive CI/CD pipeline for a multi-service application with React + Vite + Bun frontend and Express + Bun backend.

## 🏗️ Architecture

- **Frontend**: React + Vite + Bun (Port 3000)
- **Backend**: Express + Bun (Port 8000)
- **Database**: MongoDB

## 🚀 CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/deploy.yaml`) includes:

### Jobs:

1. **Frontend CI/CD**: Build, test, and deploy React application
2. **Backend CI/CD**: Build, test, and deploy Express API
3. **Integration Tests**: End-to-end testing of all services
4. **Deployment**: Production deployment (production branch only)

### Features:

- ✅ Multi-stage Docker builds
- ✅ Dependency caching for faster builds
- ✅ Automated testing and linting
- ✅ Container registry (GitHub Container Registry)
- ✅ Integration testing with docker-compose
- ✅ Production deployment automation

## 🐳 Docker Setup

### Frontend

```bash
# Build
docker build -t frontend ./frontend

# Run
docker run -p 3000:80 frontend
```

### Backend

```bash
# Build
docker build -t backend ./backend

# Run
docker run -p 8000:8000 backend
```

## 🧪 Testing

### Local Development

```bash
# Start all services for testing
docker-compose -f docker-compose.test.yml up -d

# Run tests
docker-compose -f docker-compose.test.yml exec backend bun test
```

### Integration Tests

The CI/CD pipeline automatically runs integration tests using `docker-compose.test.yml`.

## 🚀 Production Deployment

### Using Docker Compose

```bash
# Set environment variables
export REGISTRY=ghcr.io
export IMAGE_NAME=your-username/mola-cicd
export TAG=latest
export MONGODB_URI=mongodb://user:pass@host:27017/db
export JWT_SECRET=your-secret
export MONGO_PASSWORD=your-password

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

### Using Kubernetes

```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/

# Update deployment
kubectl set image deployment/frontend frontend=ghcr.io/your-username/mola-cicd/frontend:latest
kubectl set image deployment/backend backend=ghcr.io/your-username/mola-cicd/backend:latest
```

## 🔧 Environment Variables

### Frontend

- `NODE_ENV`: Environment (development, test, production)

### Backend

- `NODE_ENV`: Environment
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret

### Database

- `MONGO_DB`: Database name
- `MONGO_USER`: Database user
- `MONGO_PASSWORD`: Database password

## 📁 Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yaml          # CI/CD pipeline
├── frontend/
│   ├── Dockerfile              # Frontend container
│   ├── nginx.conf              # Nginx configuration
│   ├── .dockerignore           # Docker ignore rules
│   └── ...                     # React + Vite source
├── backend/
│   ├── Dockerfile              # Backend container
│   ├── .dockerignore           # Docker ignore rules
│   └── ...                     # Express + Bun source
├── docker-compose.test.yml     # Testing environment
├── docker-compose.prod.yml     # Production environment
└── README.md                   # This file
```

## 🔒 Security

- Non-root users in production containers
- Security headers in nginx configuration
- Environment variable management
- Health checks for all services

## 📊 Monitoring

### Health Checks

All services include health check endpoints:

- Frontend: `http://localhost/health`
- Backend: `http://localhost:8000/health`

### Logging

- Structured logging in all services
- Centralized log collection (configurable)

## 🛠️ Development

### Prerequisites

- Docker & Docker Compose
- Bun (for frontend/backend development)
- Node.js 18+ (alternative to Bun)

### Local Development

```bash
# Clone repository
git clone <repository-url>
cd mola-cicd

# Start development environment
docker-compose -f docker-compose.test.yml up -d

# Access services
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

The CI/CD pipeline will automatically test your changes.

## 📝 License

This project is licensed under the MIT License.
