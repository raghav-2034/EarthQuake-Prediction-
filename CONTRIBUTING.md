# Contributing to EarthquakeAI

Thank you for your interest in contributing to EarthquakeAI! This document provides guidelines and information for contributors.

## 🚀 Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/raghav-2034/EarthQuake-Prediction-.git
   cd earthquake-ai
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git

### Running the Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## 📝 Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` types when possible
- Use meaningful variable and function names

### React Components
- Use functional components with hooks
- Follow the single responsibility principle
- Keep components under 200 lines when possible
- Use proper prop typing with interfaces

### Styling
- Use Tailwind CSS classes
- Follow the existing design system
- Maintain responsive design principles
- Use consistent spacing (8px system)

### File Organization
- Keep files focused on single functionality
- Use proper imports/exports
- Organize components in logical directories
- Follow the existing project structure

## 🎨 Design Guidelines

- Follow Apple-level design aesthetics
- Maintain consistent visual hierarchy
- Use appropriate color contrast ratios
- Implement smooth transitions and hover states
- Ensure responsive design across all devices

## 🧪 Testing

Currently, the project uses manual testing. When adding new features:
- Test across different screen sizes
- Verify all interactive elements work properly
- Check data visualization accuracy
- Ensure proper error handling

## 📊 Data and Visualization

When working with earthquake data or charts:
- Maintain data type consistency
- Use appropriate chart types for data
- Ensure accessibility in visualizations
- Follow existing data patterns

## 🔄 Pull Request Process

1. **Create a descriptive PR title**
   - Use format: `feat: add new prediction model` or `fix: resolve chart rendering issue`

2. **Provide detailed description**
   - Explain what changes were made
   - Include screenshots for UI changes
   - Reference any related issues

3. **Ensure code quality**
   - Code follows style guidelines
   - No console errors or warnings
   - Responsive design maintained
   - Proper TypeScript typing

4. **Test thoroughly**
   - Test on different screen sizes
   - Verify all functionality works
   - Check for any breaking changes

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser and device information
- Screenshots if applicable

## 💡 Feature Requests

For new features:
- Describe the feature clearly
- Explain the use case and benefits
- Consider how it fits with existing functionality
- Provide mockups or examples if helpful

## 📋 Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to docs
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed

## 🎯 Areas for Contribution

### High Priority
- Real seismic data API integration
- Advanced machine learning models
- Geographic mapping features
- Mobile responsiveness improvements

### Medium Priority
- Additional chart types
- Enhanced filtering options
- Performance optimizations
- Accessibility improvements

### Low Priority
- UI polish and animations
- Additional themes
- Internationalization
- Documentation improvements

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/en-US)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on the project's goals

## 📞 Getting Help

If you need help:
- Check existing issues and discussions
- Create a new issue with the `help wanted` label
- Be specific about what you're trying to achieve
- mail to: [raghavendra2034@gmail.com]

Thank you for contributing to EarthquakeAI! 🌍