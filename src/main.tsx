import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SpecularButtons } from './components/ui/SpecularButtons';

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <SpecularButtons />
  </>,
);
