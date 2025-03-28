# Recipe App

A modern React application for discovering and managing your favorite recipes. Built with TypeScript, Tailwind CSS, and Tanstack Query.

## Features

- 🔍 Search recipes by name
- 🏷️ Filter recipes by category
- ❤️ Add/remove recipes to favorites
- 📱 Responsive design for all devices
- 🔄 Dynamic portion size adjustment
- 📊 Automatic ingredient quantity recalculation
- 🎥 Video recipe support

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Tanstack Query
- Redux Toolkit
- Framer Motion
- React Router
- Axios

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/react-recipe-app.git
cd react-recipe-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── api/          # API service functions
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── pages/        # Page components
├── services/     # External service integrations
├── store/        # Redux store configuration
├── types/        # TypeScript type definitions
└── utils/        # Utility functions
```

## Features in Detail

### Recipe Search
- Real-time search with debouncing
- Search by recipe name
- Display all recipes starting with 'A' when no search query

### Category Filtering
- Filter recipes by category
- Visual feedback for selected category
- Maintains search results while filtering

### Favorites Management
- Add/remove recipes to favorites
- Adjust portion sizes for favorite recipes
- View combined ingredients from all favorites
- Clear all favorites with confirmation

### Portion Size Adjustment
- Dynamic portion size control
- Automatic recalculation of ingredient quantities
- Maintains recipe proportions

### Responsive Design
- Mobile-first approach
- Grid layout adapts to screen size
- Optimized for desktop and mobile viewing
- Smooth animations and transitions

## API Integration

The app uses TheMealDB API for recipe data:
- Search recipes
- Get recipe details
- Fetch categories
- Get random recipes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
