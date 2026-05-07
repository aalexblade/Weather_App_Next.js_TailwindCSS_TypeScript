# SkyCast ☀️

A modern, high-performance weather application built with Next.js. Search any city to get current weather conditions and a 5-day forecast with a sleek glassmorphism UI.

## Tech Stack

- **[Next.js](https://nextjs.org/) 16** — App Router, Server Components, streaming
- **[TypeScript](https://www.typescriptlang.org/)** — Strict typing with descriptive interfaces
- **[Tailwind CSS](https://tailwindcss.com/) v4** — Utility-first styling, mobile-first design
- **[Lucide React](https://lucide.dev/)** — Weather iconography
- **[OpenWeatherMap API](https://openweathermap.org/api)** — Weather data & geocoding
- **[CodeRabbit](https://coderabbit.ai/)** — AI-powered code review

## Key Features

- **City Search** with autocomplete suggestions (debounced, 5 results)
- **Current Weather** display with temperature, feels-like, humidity, wind, and cloud coverage
- **5-Day Forecast** with daily highs/lows and weather icons
- **Loading States** — spinner while fetching weather and city suggestions
- **Error Handling** — graceful fallback UI when a city is not found
- **Image Optimization** — `next/image` with remote patterns configured for OpenWeatherMap icons
- **Revalidation** — ISR-based caching (hourly revalidation) for weather data
- **Glassmorphism UI** — backdrop blur, gradient backgrounds, smooth animations

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/Weather_App_Next.js_TailwindCSS_TypeScript.git
cd Weather_App_Next.js_TailwindCSS_TypeScript

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

Get a free API key at [OpenWeatherMap](https://openweathermap.org/api). The variable is prefixed with `NEXT_PUBLIC_` so it is accessible on the client for geocoding requests.

## AI-Driven Development

This project was developed with AI-assisted tooling to ensure code quality, consistency, and best practices:

- **CodeRabbit** — Every pull request is automatically audited by CodeRabbit AI, which performs static analysis, identifies anti-patterns, enforces project conventions, and provides inline suggestions for improvement. The configuration in `.coderabbit.md` tailors review guidelines to this project's specific tech stack and coding standards.
- **AGENTS.md** — A context file that codifies architectural decisions (Server vs. Client Components, TypeScript interfaces, Tailwind conventions) so AI agents produce consistent, idiomatic code.
