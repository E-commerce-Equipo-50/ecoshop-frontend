import { useBear } from "./Store"

export const TestComponent = () => {
  const bears = useBear(state => state.bears)
  const increasePopulation = useBear(state => state.increasePopulation)
  
  return (
    <div className='TestComponent'>
      TestComponent Component
      <h1>{bears} bears around here...</h1>
      <button type="button" onClick={increasePopulation}>one up</button>
      {/* TODO implementar botón para remover todos los osos y para actualizar osos */}
    </div>
  )
}