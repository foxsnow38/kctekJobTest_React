import { Route, BrowserRouter, Routes, Outlet } from "react-router-dom"
import { useIndexDb } from "./data/Indexed/IndexedContext"
import Login from "./pages/Login"
import MainPage from "./pages/MainPage"
import Navbar from "./components/Navbar"
import MathExamJson from "./data/questions/math.json"
import GeoExamJson from "./data/questions/geo.json"
import TrafficExamJson from "./data/questions/traffic.json"
import QuizPage from "./pages/QuizPage"

function App() {
  const { isLoadingDBContext, user } = useIndexDb()

  return (
    <div>
      {!isLoadingDBContext ? (
        <BrowserRouter>
          <Routes>
            <Route element={<Login />} path="/" />
            <Route
              element={
                <div>
                  {user !== undefined && (
                    <>
                      <Navbar />
                      <MainPage />
                    </>
                  )}
                </div>
              }
              path="main"
            />
            <Route element={<Outlet />} path="/quiz">
              <Route
                element={<QuizPage data={MathExamJson} topic="math" />}
                path="math"
              />
              <Route
                element={<QuizPage data={GeoExamJson} topic="geography" />}
                path="geo"
              />
              <Route
                element={<QuizPage data={TrafficExamJson} topic="traffic" />}
                path="traffic"
              />
            </Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <div
          style={{
            height: `100vh`,
            width: `100%`,
            display: `flex`,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="https://c.tenor.com/whis5JX19ycAAAAS/loading-load.gif"
            alt="loading"
            style={{ width: `300px`, height: `300px` }}
          />
        </div>
      )}
    </div>
  )
}

export default App

// questıons Math
// https://cdn.darussafaka.org/c/uploads/pages/5c2bdaa3c30496832c6cfbb1/content-9c11b7ee00b1bebe3063f190140d1af8.pdf
// https://ogmmateryal.eba.gov.tr/panel/upload/files/xawunsglobt.pdf

// geo qustions
//  https://ogmmateryal.eba.gov.tr/panel/upload/files/xawunsglobt.pdf
// https://ogmmateryal.eba.gov.tr/panel/upload/files/0ayzfdy1cv4.pdf

// traffic question
// https://www.ehliyethane.net/1-deneme-trafik-ve-cevre-test-sorulari/
