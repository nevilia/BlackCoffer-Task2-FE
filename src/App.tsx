import './App.css'
import Main from './components/Main'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className=''>
      <Navbar />
      <div className="p-4">
        <Main />
        <Main />
        <Main />
      </div>
    </div>
  )
}

export default App
