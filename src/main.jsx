import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from './components/context/context.jsx'


createRoot(document.getElementById('root')).render(<Provider><App /></Provider>)

