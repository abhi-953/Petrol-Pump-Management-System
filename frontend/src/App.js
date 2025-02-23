import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/navbar.js';
import Records from './components/table.js';
import Forms from './components/form.js';
import HomePage from './components/homePage.js';
import modules from './components/modules.js';

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          {modules.map((module) => (
            <Route key={module.title} path={`/${module.title}`} element={<Records module={module.title} />} />
          ))}
          {modules.map((module) => (
            <Route key={`${module.title}/Form`} path={`/${module.title}/Form`} element={<Forms module={module.title} />} />
          ))}
          {modules.map((module) => (
            <Route key={`${module.title}/Edit`} path={`/${module.title}/Edit/:value`} element={<Forms module={module.title} />} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
