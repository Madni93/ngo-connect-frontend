import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import './index.css'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <AuthProvider>
      <App />
    </AuthProvider>
);