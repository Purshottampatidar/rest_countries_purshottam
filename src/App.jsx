import './App.css'
import Countries from './Components/Countries'
import Header from './Components/Header'
import Country from './Components/Country';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, useTheme } from './Components/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AppContainer />
    </ThemeProvider>
  );
}
function AppContainer() {
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? "app-dark" : "app-light"}>
      <Router>
      <Header />
       <Routes>
         <Route path="/" element={<Countries/>} />
         <Route path="/country/:id" element={<Country />} />
      </Routes>
      </Router>
    </div>
  );
}
export default App
