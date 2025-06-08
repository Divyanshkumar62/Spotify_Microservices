import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { SongProvider } from "./context/SongContext"
const App = () => {
  return (
    <>
      <BrowserRouter>
        <SongProvider>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </SongProvider>
      </BrowserRouter>
    </>
  )
}

export default App