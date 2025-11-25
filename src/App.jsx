import { TestComponent } from './store/TestComponent'

export const App = () => {
  return (
    <div className='App'>
      <b> App Component </b>
       <h1 className="text-green-500 text-4xl">Tailwind v3 funciona 💚</h1>
      <p>
        En este componente se incluirán todas las páginas de /src/pages para hacer la mejor app frontend de la historia
      </p>
      <TestComponent />
    </div>
  )
}