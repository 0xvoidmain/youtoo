import React from 'react'
import Layout from 'components/Layout'
import Home from 'pages/Home'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  )
}

export default App
