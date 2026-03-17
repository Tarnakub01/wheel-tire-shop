Built a responsive Wheel & Tire Shop web app with React + Vite, featuring product catalog, cart, and product detail pages using React Router.
Implemented search, filter, and sort with derived state to avoid duplicated state and reduce bugs.
Developed reusable cart utilities (add/update/remove) with immutable state updates, enabling predictable UI rendering.
Enforced stock limits at both UI and handler layers to prevent overselling and improve reliability.
Added toast notifications for cart actions and persisted cart state with localStorage for better UX.
Designed a clean data flow using a custom hook useProducts() and an API layer that returns { data, error } for consistent error handling.
Deployed the SPA to Netlify with proper routing fallback to support deep links (e.g., /products/:id).