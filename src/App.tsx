import './App.css'
import 'chart.js/auto'
import Main from './components/Main'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className=''>
      <Navbar />
      <div className="p-4">
        <Main />
      </div>
    </div>
  )
}

export default App
