# Control Estadístico - Copilot Instructions

## Project Overview
This is an Angular 19 statistical analysis application that allows users to input numerical data via Handsontable and generate various statistical calculations and charts. The app follows a modular architecture with shared services for data management and statistical computations.

## Architecture Patterns

### Data Flow Architecture
- **Central Data Entry**: `IngresarDatosComponent` serves as the main data hub using Handsontable for spreadsheet-like input
- **Service-Based Calculations**: Raw data flows through specialized services (`MedidasService`, `HistogramaService`, `ParametrosService`, `GraficasxrService`)
- **Component Visualization**: Each statistical component subscribes to its respective service for calculations and chart rendering

### Component Structure
- **Single-Page App**: All components are embedded in `IngresarDatosComponent` with conditional visibility flags
- **Toggle Pattern**: Components use `mostrar[ComponentName]` boolean flags for show/hide functionality
- **Service Injection**: Components use Angular's `inject()` function (modern pattern) instead of constructor injection

### Service Design Pattern
Services follow a consistent pattern:
- `setData(data: number[][])` - Receives raw 2D array from Handsontable
- `matrizToArray()` - Internal helper to flatten matrix data
- Statistical calculation methods (e.g., `getMedia()`, `getMediana()`, `getModa()`)
- Chart configuration methods returning CanvasJS options

## Key Dependencies & Tools

### Core Libraries
- **Handsontable** (`@handsontable/angular`): Spreadsheet component for data input
- **CanvasJS** (`@canvasjs/angular-charts`): Chart rendering library
- **Angular 19**: Standalone components architecture (no NgModule)

### Data Validation Pattern
```typescript
private esNumeroValido(valor: any): boolean {
  return (typeof valor === 'number' && !isNaN(valor)) ||
    (typeof valor === 'string' && /^[+-]?(\d+(\.\d+)?|\.\d+)$/.test(valor.trim()));
}
```

## Development Workflow

### Running the Application
```bash
npm start                 # Start dev server (ng serve)
npm run build            # Production build
npm test                 # Run unit tests with Karma
```

### Component Generation
```bash
ng generate component components/new-component --standalone
ng generate service services/new-service
```

## File Organization

### Component Structure
- `components/[feature]/` - Each statistical feature has its own component
- `services/[feature]/` - Matching service for calculations and data management
- Components are standalone with explicit imports in their decorators

### Service Organization
- Services are organized by statistical domain (medidas, histograma, parametros, graficasxr)
- Each service handles both calculations and chart configuration for its domain
- Services use `providedIn: 'root'` for singleton pattern

## Code Conventions

### Component Patterns
- Use `inject()` for dependency injection instead of constructor injection
- Conditional rendering with `*ngIf` and boolean flags
- Button state management with `[ngClass]` for active/inactive states
- Example: `[ngClass]="mostrarHistograma ? 'btn-primary' : 'btn-outline-primary'"`

### Data Handling
- Always validate numerical input using `esNumeroValido()`
- Filter empty rows and non-numeric values before processing
- Update all relevant services when data changes using `getTableData()`

### Chart Integration
- CanvasJS charts configured in services, not components
- Chart options returned as objects from service methods
- Components handle chart visibility toggling and updates

## Testing Setup
- Karma + Jasmine for unit testing
- Each component and service has corresponding `.spec.ts` files
- Standalone component testing pattern without TestBed modules

## Common Tasks

### Adding New Statistical Feature
1. Generate component in `components/[feature]/`
2. Generate service in `services/[feature]/`
3. Add service injection and data flow in `IngresarDatosComponent`
4. Add toggle button and conditional display in main template
5. Implement statistical calculations in service
6. Configure chart options if visualization needed

### Working with Charts
- All charts use CanvasJS configuration objects
- Chart types: histograms, box plots, control charts, scatter plots
- Services return complete chart configurations, components handle rendering

## Key Files to Understand
- `src/app/components/ingresar-datos/` - Main data entry and control center
- `src/app/services/medidas/medidas.service.ts` - Statistical calculations pattern
- `src/app/components/histograma/` - Chart integration example
- `package.json` - Core dependencies and build scripts
