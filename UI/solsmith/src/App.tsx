// src/App.jsx
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header>{/* Your navigation, logo, etc. */}</header>

      <main className="flex-grow container mx-auto p-8">
        {/* THIS IS THE CRUCIAL PART: The Outlet renders the matched child route */}
        <Outlet /> {/* <-- This is where the content of your HomePage, DashboardPage, etc., will be injected */}
      </main>

      <footer>{/* Your footer content */}</footer>
    </div>
  );
}