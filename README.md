# SobrietySupport
Simple React Sketch for a Sobriety support react 
# SobrietySupport React Component

A compassionate, feature-rich React component designed to support individuals on their sobriety journey. This component provides real-time encouragement, progress tracking, and emergency support features while maintaining user privacy and data security.

## Features

### 🌟 Core Features
- **Streak Tracking**: Automatically tracks and persists sobriety streaks
- **Time-Based Support**: Provides contextual messages based on time of day
- **Achievement System**: Celebrates milestones with badges and encouraging messages
- **Emergency Support**: Quick access to crisis hotlines and support resources
- **Progress Visualization**: Visual feedback on health, mental clarity, and financial benefits

### 🏆 Milestone Achievements
| Days | Badge | Achievement |
|------|-------|-------------|
| 1    | 🌱    | First Day Champion |
| 7    | 🌟    | One Week Strong |
| 30   | 🏆    | Monthly Milestone Master |
| 90   | 💫    | Quarterly Quest Complete |
| 365  | 👑    | Year of Transformation |

## Installation

1. Install required dependencies:
```bash
npm install lucide-react framer-motion
# or
yarn add lucide-react framer-motion
```

2. Ensure you have the shadcn/ui components installed:
```bash
npx shadcn-ui add card
npx shadcn-ui add button
```

3. Copy the SobrietySupport component into your project:
```bash
cp SobrietySupport.jsx src/components/
```

## Usage

```jsx
import SobrietySupport from './components/SobrietySupport';

function App() {
  return (
    <div className="container mx-auto">
      <SobrietySupport />
    </div>
  );
}
```

## Customization

### Modifying Support Reasons

The component uses a reasons array that can be customized or extended. Each reason object follows this structure:

```javascript
{
  id: string,
  title: string,
  icon: React.ReactNode,
  content: string,
  alternative: string,
  progress: (days: number) => number
}
```

### Adding Emergency Contacts

Emergency contacts can be modified in the `emergencyContacts` array:

```javascript
const emergencyContacts = [
  { name: 'Service Name', number: 'phone-number' },
  // Add more contacts
];
```

### Customizing Milestones

Adjust the milestones array to modify achievement triggers:

```javascript
const milestones = [
  { days: number, badge: string, message: string },
  // Add more milestones
];
```

## Local Storage

The component uses localStorage to persist:
- Sobriety streak count
- Earned achievements

Keys used:
- `sobrietyStreak`: Number of days
- `achievements`: Array of achievement badges

## Accessibility

- ARIA labels included for screen readers
- High contrast color schemes
- Keyboard navigation support
- Responsive design for all screen sizes

## Props

The component currently doesn't accept props but can be modified to accept:

```typescript
interface SobritySupportProps {
  initialStreak?: number;
  customReasons?: Reason[];
  customMilestones?: Milestone[];
  customEmergencyContacts?: EmergencyContact[];
}
```

## Contributing

We welcome contributions! Please consider:

1. Adding new features that support recovery
2. Improving accessibility
3. Adding internationalization support
4. Enhancing data visualization
5. Implementing additional achievement types

## License

MIT License - feel free to use and modify for your needs.

## Support

If you're using this component and need support:
- Check the issues section for common problems
- Create a new issue for bugs or feature requests
- Consider contributing improvements back to the project

Remember: This component is a tool for support, not a replacement for professional help. Always seek appropriate medical and professional assistance when needed.
