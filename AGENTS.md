# AI Agent Instructions & Project Context

## Project Overview
- **Name:** Weather_App_Next.js_TailwindCSS_TypeScript
- **Goal:** A modern, high-performance weather application.
- **Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS.

## Technical Standards & Rules
- **Component Patterns:** Use Functional Components with TypeScript `interface` for props.
- **Typing:** Strict TypeScript usage. Avoid `any`. Use descriptive interfaces for API responses.
- **Styling:** Use Tailwind CSS utility classes exclusively. Follow mobile-first design principles.
- **Architecture:** - Prefer **Server Components** for data fetching where possible.
    - Use **Client Components** (`'use client'`) only for interactive elements like search bars or geolocation toggles.
- **Icons:** Use `lucide-react` for weather-related iconography.

## Coding Style
- Use Arrow Functions for components.
- Component naming convention: PascalCase (e.g., `WeatherCard.tsx`).
- File structure: Keep components in `@/components` and utility functions in `@/lib`.

## Weather API Context
- **Primary Source:** OpenWeatherMap API (or similar).
- **Units:** Metric (Celsius).
- **Key Metrics:** Focus on temperature, humidity, wind speed, and 5-day forecast.

## Agent Behavior
- When generating code, ensure it is compatible with **Next.js 15+**.
- Always include Tailwind classes for basic responsiveness.
- Focus on performance optimization (image optimization, minimal re-renders).