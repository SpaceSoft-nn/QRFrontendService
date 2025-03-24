import { createRoot } from 'react-dom/client'
import './globals.scss'
import { AppProviders } from './providers/app-providers'

const App: React.FC = () => {
	return <AppProviders />
}

createRoot(document.getElementById('root')!).render(<App />)
