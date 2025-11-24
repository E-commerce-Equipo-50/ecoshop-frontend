import { TestComponent } from './store/TestComponent'
import './App.css'

export const App = () => {
  return (
    <div className='App'>
      <b> App Component </b>
      <p>
        En este componente se incluirán todas las páginas de /src/pages para hacer la mejor app frontend de la historia
      </p>
      <TestComponent />
    </div>
  )
}