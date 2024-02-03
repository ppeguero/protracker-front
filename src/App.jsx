import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './AppRouter';


function App() {
  return (
    <div className="App">
      <Router>
        <AppRouter/>
      </Router>
      
    </div>
  );
}

export default App;