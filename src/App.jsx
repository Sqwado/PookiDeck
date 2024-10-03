
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';


function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
