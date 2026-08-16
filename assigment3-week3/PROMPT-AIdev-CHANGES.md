# ShopEase — AI Development Documentation

## 1. Prompts Used During Development

1. "Set up Tailwind CSS v4 in my Vite + React project using the CSS-first approach with @tailwindcss/vite — give me the exact vite.config.js and index.css content."

2. "Set up a folder structure for a React shopping app with components: Navbar, ProductGrid, ProductCard, Cart, and a Zustand store for cart state. Install zustand and create the skeleton files."

3. "Create a custom hook called useProducts that fetches product data from https://api.escuelajs.co/api/v1/products, with loading and error states."

4. "Build ProductGrid and ProductCard components that use the useProducts hook to display a grid of products with image, title, price, and an Add to Cart button, styled with Tailwind."

5. "Create a Zustand store called cartStore with addItem, removeItem, updateQuantity, and a total price calculation, persisted to localStorage."

6. "Build a Cart component that shows all items in the cartStore, lets me change quantities or remove items, and shows the total. Add a cart icon with item count to the Navbar that toggles the cart view."

7. "Put Navbar, ProductGrid, and Cart into App.jsx so everything works together as a complete shopping app."

8. "Add loading spinners, an empty cart message, and make the layout responsive for mobile."

9. "Add a modal that opens when I click a ProductCard — it should appear on top of the page with a dimmed background behind it, show the product's full image, title, price, description, and an Add to Cart button, and close when I click outside it or an X button."

10. "Make the navbar work — when the user clicks Shop, show the current product listing page. When the user clicks Home, show a separate page about the shop."

## 2. How AI Assisted

AI was used throughout to generate the core structure and functionality of the application: the Tailwind setup, the component skeleton (Navbar, ProductGrid, ProductCard, Cart), the product-fetching logic (`useProducts` hook), the Zustand cart store (add/remove/update quantity/total, persisted to localStorage), the product detail modal, and the Home/Shop page routing on the navbar. Each feature was built through a separate, targeted prompt rather than one large request, so the app was tested after each step to confirm it still worked before moving on to the next piece.

## 3. Manual Improvements and Corrections

- **Removed unnecessary UI elements** that AI had added but weren't needed for the app to function or look clean, simplifying the interface.
- **Changed the price text color** from plain black to green, since the original color didn't stand out enough against the rest of the card and made prices harder to spot at a glance.
