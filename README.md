# CRP in Action: Observation System

A comprehensive classroom observation system designed to systematically collect and analyze culturally responsive practices (CRP) in educational settings.

## 🎯 Project Overview

**Mission**: Collect 5,000 classroom observations by May 2026 with 70% showing evidence of Culturally Responsive Practices.

**Key Features**:
- **Mobile-First Observation Capture**: 10-15 minute classroom observations optimized for tablets
- **Integrated Framework System**: Aligns multiple educational frameworks (CRP, CASEL, Tripod 7Cs, etc.)
- **Real-Time Analytics**: Dashboard for tracking progress toward goals
- **Advanced Data Management**: Import/export capabilities with BigQuery integration
- **PWA Support**: Works offline for classroom observations

## 🏗️ Tech Stack
- **Frontend**: Astro (Static Site Generation) + React 18 + TypeScript (for interactive components)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: Astro File-based Routing
- **Build Tool**: Astro
- **PWA**: Service Worker + Manifest (implemented via Astro integrations)

## 📊 Framework Integration

### Primary Frameworks
- **Culturally Responsive Practices (CRP)** - Core focus
- **Tripod 7Cs of Learning** (Care, Challenge, Clarify, Captivate, Confer, Consolidate, Control)
- **5 Daily Assessment Practices**
- **CASEL Social-Emotional Learning Standards**
- **Panorama Student Experience Data**
- **Inclusive Practices**

### 10 Integrated Look-Fors
1. Learning targets clearly communicated and relevant
2. Inclusive, identity-affirming environment with belonging
3. Checks for understanding with instructional adjustments
4. Questioning strategies promoting higher-order thinking
5. Meaningful collaborative learning experiences
6. Cultural competence and student background integration
7. Active monitoring and support during work
8. Student reflection and learning consolidation opportunities
9. Strong, trusting relationships through affirming interactions
10. Differentiated instruction for diverse learning needs

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crp-observation-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`
   - For mobile testing: `http://localhost:3000/observe`

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject (not recommended)
npm run eject
```

## 📱 Application Structure

```
src/
├── components/          # Reusable UI components
│   └── Layout.tsx      # Main application layout
├── pages/              # Main application pages
│   ├── AdminDashboard.tsx
│   ├── FrameworkConfiguration.tsx
│   ├── MobileObservationCapture.tsx
│   └── DataManagement.tsx
├── hooks/              # Custom React hooks
│   └── index.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── index.ts
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
└── index.css           # Global styles + Tailwind
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#3B82F6` (CRP Blue)
- **Success Green**: `#10B981` (CRP Green)
- **Warning Orange**: `#F59E0B` (CRP Orange)
- **Error Red**: `#EF4444`
- **Purple**: `#8B5CF6` (CRP Purple)
- **Pink**: `#EC4899` (CRP Pink)
- **Indigo**: `#6366F1` (CRP Indigo)

### Framework Color Coding
- **CRP**: Green variants
- **CASEL**: Pink variants
- **Tripod**: Blue variants
- **Assessment**: Yellow variants
- **Panorama**: Purple variants
- **Inclusive**: Indigo variants

## 📊 Key Features

### 1. Admin Dashboard
- Real-time statistics (247 observations toward 5,000 goal)
- Active observer tracking (68/80 observers)
- CRP evidence rate monitoring (68% toward 70% goal)
- Recent observations table with filtering and search

### 2. Mobile Observation Capture
- Touch-optimized interface for tablets
- 4-point rating scale (Clearly Observable, Possibly Present, Unclear/Minimal, Not Evident)
- Framework alignment indicators
- Progress tracking during observation
- Offline capability for classroom use

### 3. Framework Configuration
- Visual framework editor
- Question management with tagging
- Framework alignment mapping
- Drag-and-drop question ordering
- Real-time preview capabilities

### 4. Data Management
- CSV import/export functionality
- API connections management
- BigQuery integration
- Processing job monitoring
- Template downloads for data imports

## 🔄 PWA Features

- **Offline Support**: Continue observations without internet
- **App-like Experience**: Install on mobile devices
- **Fast Loading**: Optimized for mobile networks
- **Push Notifications**: Observer reminders and updates

## 📈 Analytics & Reporting

### Weekly Leadership Meetings
- 5-minute dashboard reviews
- Key metrics and trends
- Action item identification

### Quarterly Data Analysis
- CRP evidence trend analysis
- Observer participation rates
- Professional learning recommendations
- Goal progress assessment

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Firebase Hosting (Recommended)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project
firebase init hosting

# Deploy
firebase deploy
```

### Environment Variables
Create `.env` file for configuration:
```env
REACT_APP_API_URL=https://your-api-url.com
REACT_APP_FIREBASE_CONFIG={}
REACT_APP_BIGQUERY_PROJECT_ID=your-project-id
```

## 📊 Goal Tracking

### Current Progress (Example)
- **Total Observations**: 247 / 5,000 (4.9%)
- **CRP Evidence Rate**: 68% / 70% target
- **Active Observers**: 68 / 80 target
- **Weekly Average**: 18 observations

### Success Metrics
- 5,000 total observations by May 2026
- 70% CRP evidence rate across all observations
- 80 active observers contributing regularly
- 100% teacher observation coverage quarterly

## 🔧 Development Guidelines

### Code Organization
- Use TypeScript for type safety
- Follow React best practices and hooks patterns
- Implement responsive design with Tailwind CSS
- Write reusable components and custom hooks

### Performance
- Lazy load pages and components
- Optimize images and assets
- Use React.memo for expensive components
- Implement proper loading states

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance

## 🤝 Contributing

1. Create feature branch from `main`
2. Follow TypeScript and ESLint guidelines
3. Add appropriate tests for new features
4. Update documentation as needed
5. Submit pull request with clear description

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 📞 Support

For technical support or questions about the CRP in Action initiative:
- Create an issue in the repository
- Contact the educational leadership team
- Refer to the comprehensive project documentation

---

**CRP in Action: Leading with Observation** - Transforming educational practices through systematic observation and culturally responsive teaching.
