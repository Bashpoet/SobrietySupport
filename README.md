# Sobriety Support

A comprehensive, personalized dashboard for maintaining sobriety with intelligent features for motivation, reflection, and real-time support.


## Features

- **Streak Tracking**: Monitor consecutive days of sobriety with milestone achievements
- **Health & Benefit Insights**: Visualize physical, mental, financial, and relationship improvements
- **Journal System**: Record thoughts, feelings, and experiences with mood tracking
- **Trigger Management**: Document and manage personal triggers with intensity ratings
- **Coping Strategy Library**: Access evidence-based techniques for managing urges
- **Community Resources**: Connect with support groups and recovery communities
- **Emergency Support**: Quick access to crisis hotlines and support resources
- **AI-Powered Features**:
  - Personalized motivational messages based on your journey
  - Intelligent journal prompts to guide self-reflection
  - Real-time urge support through AI conversation

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Anthropic API key (for AI features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sobriety-support.git
cd sobriety-support
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Configure your Claude API key in the settings panel of the application

## Architecture

The application follows a component-based architecture using React and various modern practices:

### Core Structure

- **Context Providers**: Global state management with React Context
- **Custom Hooks**: Reusable logic for localStorage, API interactions, etc.
- **Component Organization**: Modular components grouped by feature

### Technologies

- **React**: Core UI library
- **Framer Motion**: Animations and transitions
- **Anthropic Claude API**: AI-powered features
- **localStorage/sessionStorage**: Client-side data persistence

## Data Privacy

- All personal data remains on the user's device via localStorage
- API keys are stored in sessionStorage and cleared when the browser is closed
- No user data is transmitted except when making API calls to Anthropic

## Component Hierarchy

```
App
├── UserDataProvider
├── APIProvider
└── MainLayout
    ├── Header
    ├── DesktopNavigation / MobileNavigation
    ├── Settings
    ├── EmergencySupport
    └── Tabs
        ├── DashboardTab
        │   └── BenefitCard
        ├── JournalTab
        │   ├── JournalPrompt
        │   ├── MoodSelector
        │   └── JournalEntry
        ├── TriggersTab
        │   ├── IntensitySelector
        │   └── TriggerItem
        ├── CopingToolsTab
        │   └── CopingStrategyCard
        ├── CommunityTab
        └── UrgeSupportTab
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- **Mobile App**: Native mobile experience with push notifications
- **Data Analysis**: Insights and patterns from journal entries and triggers
- **Goal Setting**: Custom milestone tracking beyond streaks
- **Expanded Community**: Anonymous sharing of experiences and strategies
- **API Backend**: Move to server-side API handling for improved security

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by evidence-based approaches to addiction recovery
- AI capabilities powered by Anthropic's Claude API
