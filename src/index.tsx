import ReactDOM from "react-dom/client"
import * as React from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { IndexDbProvider } from "./data/Indexed/IndexedContext"
import App from "./App"

ReactDOM.createRoot(document.getElementById(`root`) as HTMLElement).render(
  <IndexDbProvider>
    <ToastContainer />
    <App />
  </IndexDbProvider>
)
