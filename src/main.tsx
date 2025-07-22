import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/console.ts'

createRoot(document.getElementById("root")!).render(<App />);
