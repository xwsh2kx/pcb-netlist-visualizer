# PCB Netlist Visualizer

A full-stack application for uploading, visualizing, and validating electronic circuit netlists.

![Architecture](https://img.shields.io/badge/Architecture-Client%20%3C%2D%3E%20Server-blue)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Chakra%20UI-319795)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933)
![Database](https://img.shields.io/badge/Database-MongoDB-47A248)

## Features

- **Upload** JSON netlist files with components and nets
- **Visualize** circuits as SVG schematics with auto-layout
- **Validate** designs against configurable rules
- **Store** submissions per-user in MongoDB
- **Review** validation results with highlighted violations

<img width="2058" height="1173" alt="image" src="https://github.com/user-attachments/assets/02688d8b-0bd5-4d5c-8196-1c34eb97b9f4" />

## Quick Start

### Using Docker Compose (Recommended)

```bash
# Clone and start all services
docker-compose up --build

# Access the application
open http://localhost:3000
```

### Local Development

```bash
# Terminal 1: Start MongoDB
docker run -p 27017:27017 mongo:7

# Terminal 2: Start server
cd server
npm install
npm run dev

# Terminal 3: Start client
cd client
npm install
npm run dev

# Access the application
open http://localhost:3000
```

## Netlist JSON Schema

```json
{
  "version": "1.0",
  "design": {
    "title": "My Circuit",
    "tool": "KiCad",
    "date": "2024-01-15"
  },
  "components": [
    {
      "ref": "R1",
      "value": "10K",
      "footprint": "R_0805",
      "description": "Pull-up resistor"
    },
    {
      "ref": "U1",
      "value": "ATmega328P",
      "footprint": "DIP-28"
    }
  ],
  "nets": [
    {
      "code": 1,
      "name": "VCC",
      "nodes": [
        { "ref": "R1", "pin": "1", "pinType": "passive" },
        { "ref": "U1", "pin": "7", "pinFunction": "VCC", "pinType": "power_in" }
      ]
    },
    {
      "code": 2,
      "name": "GND",
      "nodes": [
        { "ref": "U1", "pin": "8", "pinFunction": "GND", "pinType": "power_in" }
      ]
    }
  ]
}
```

### Component Reference Prefixes

| Prefix | Type | Example |
|--------|------|---------|
| R | Resistor | R1, R2 |
| C | Capacitor | C1, C2 |
| L | Inductor | L1 |
| D | Diode | D1 |
| Q | Transistor | Q1 |
| U, IC | Integrated Circuit | U1, IC1 |
| J, P, CN | Connector | J1, P1 |

### Pin Types

- `passive` - Resistors, capacitors, etc.
- `input` - Signal inputs
- `output` - Signal outputs
- `power_in` - Power supply pins
- `power_out` - Power output pins

## Validation Rules

| Rule | Severity | Description |
|------|----------|-------------|
| `names-not-blank` | Error | Component refs and net names must not be empty |
| `duplicate-refs` | Error | Each component must have a unique reference |
| `invalid-ref` | Error | Net nodes must reference existing components |
| `gnd-connected` | Error | ICs must be connected to ground |
| `power-connected` | Warning | ICs should have power connections |
| `floating-pins` | Warning | Nets should have at least 2 connections |

## Project Structure

```
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── atoms/        # Basic UI elements
│   │   │   ├── molecules/    # Composite elements
│   │   │   ├── organisms/    # Complex sections
│   │   │   └── templates/    # Page layouts
│   │   ├── hooks/            # React hooks
│   │   ├── utils/            # Pure functions
│   │   ├── types/            # TypeScript types
│   │   ├── constants/        # Configuration
│   │   ├── api/              # API client
│   │   └── theme/            # Chakra UI theme
│   └── Dockerfile
│
├── server/                    # Express backend
│   ├── src/
│   │   ├── routes/           # API endpoints
│   │   ├── models/           # Mongoose schemas
│   │   ├── services/         # Business logic
│   │   ├── middleware/       # Express middleware
│   │   └── types/            # TypeScript types
│   └── Dockerfile
│
└── docker-compose.yml         # Container orchestration
```

## Architecture

### Atomic Design Pattern (Frontend)

The frontend uses Atomic Design for maximum modularity:

- **Atoms**: `StatusBadge`, `EmptyState`, `SectionHeader`
- **Molecules**: `FileInput`, `SubmissionCard`, `SvgComponent`, `SvgWire`
- **Organisms**: `UploadForm`, `SubmissionList`, `SchematicCanvas`, `ValidationResults`
- **Templates**: `AppLayout`, `Sidebar`, `MainContent`

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/netlists` | Upload and validate netlist |
| GET | `/api/netlists` | List user submissions |
| GET | `/api/netlists/:id` | Get specific submission |
| DELETE | `/api/netlists/:id` | Delete submission |

All endpoints require `x-user-id` header.

## Deployment

### AWS ECS/Fargate

```bash
# Build and push images
docker build -t pcb-client ./client
docker build -t pcb-server ./server

# Tag and push to ECR
aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_URL
docker tag pcb-client:latest $ECR_URL/pcb-client:latest
docker tag pcb-server:latest $ECR_URL/pcb-server:latest
docker push $ECR_URL/pcb-client:latest
docker push $ECR_URL/pcb-server:latest
```

### Environment Variables

**Server:**
- `PORT` - Server port (default: 4000)
- `MONGODB_URI` - MongoDB connection string

**Client:**
- `VITE_API_URL` - Backend API URL (default: http://localhost:4000/api)

## Example Files

The `/examples/` directory contains sample netlists:

- `voltage-divider.json` - Simple resistor divider
- `inverting-amplifier.json` - Op-amp circuit with feedback

## License

MIT
