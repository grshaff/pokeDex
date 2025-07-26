### Hello, Thanks for coming. <br>this README.md shows detailed information about this project, enjoy and have a great day!

# Pokémon Dex

A responsive web application built with Next.js and Material-UI that allows users to explore Pokémon, filter them by types, search by name, and view detailed statistics and evolution chains.

## Deployment Link

[PokeDex by grshaff](https://pokedex-grshaff.vercel.app)

## Features Implemented

*   **Pokémon Data Fetching:** Fetches and displays Pokémon data from the PokeAPI.
*   **Type-Based Filtering:** Filter Pokemon by one or multiple types.
*   **Search Functionality:** Search Pokemon by name.
*   **Pagination:** Page index to browse through large lists of Pokémon.
*   **Responsive Design:** Can be used from phone to pc browser
*   **Interactive UI:** Border animation and background changes based on types selected (on pokemon type)
*   **Loading screen:** Using delay when fetching data and shows skeleton or loading animation

## Technical Decisions

*   **Styling:** Custom color mapping for Pokémon types and evolution stages for a visually engaging experience.
*   **Data Fetching:**
    *   Directly consumes the [PokeAPI](https://pokeapi.co/) using `fetch` for all data retrieval.
    *   Asynchronous operations (`async/await`, `Promise.all`, `axios`) are used to efficiently fetch multiple Pokémon details or type-specific data.
    *   Environment variables (`.env.local` and Vercel environment variables) are used to manage API base URLs, following best practices for security and configurability.
*   **State Management:** Using useState` and `useEffect` hooks for local component state and side effects (like data fetching and animation control).
*   **Responsive Design Strategy:**
    *   Combines MUI's breakpoint system with percentage-based widths and `min-width`/`max-width` properties to ensure components scale fluidly rather than jumping between fixed sizes.
    *   Flexible Box (Flexbox) layouts are extensively used for dynamic content arrangement.

## Setup Instructions

To reproduce/run locally, follow these steps:

1.  **Clone the repository:**
       ```bash
       git clone https://github.com/grshaff/pokeDex.git
       cd pokeDex
       ```  

2. **Install dependencies:**
  
     ```shellscript
     npm install
     # or
     yarn install
     ```

3. **Create a `.env.local` file:**
In the root of the project, create file named `.env.local` and add environment variables. 

      ```plaintext
      NEXT_PUBLIC_API_URL=https://pokeapi.co/api/v2
      ```

4. **Run dev server:**

      ```shellscript
      npm run dev
      # or
      yarn dev
      ```

5. **Open in browser:**
      `http://localhost:3000`.


## Future Improvements

- **Sorting Options:** Implement sorting for Pokémon lists (e.g., by ID, name, or specific stats).
- **Advanced Filters:** Add more filtering options (e.g., by generation, abilities, or specific stat ranges).
- **Search Autocomplete:** Enhance the search bar with real-time suggestions.
- **Accessibility Enhancements:** Further improve ARIA attributes and keyboard navigation.
- **Performance Optimization:** Explore image optimization techniques and data caching strategies.
- **Theming:** Implement a full dark mode or custom theme switcher.
- **Language:**: Add more language to support global users


## ️ Time Spent

This project was completed in approximately **48 hours** of focused development.

**Learning MaterialUI:** 2 hours
**Initial setup (Next.js, MUI, basic routing):** 1 hours
**Core data fetching & state management:** ~15 hours (fetching lists, details, handling loading)
**Pages and components:** ~6 hours
**Filtering & search logic (Type filter, Search bar, URL sync):** 12 hours
**Refinements, Animations, Polish:** 5 hours
**Code Review:** 1 hours
**Total: ~45 hours**
