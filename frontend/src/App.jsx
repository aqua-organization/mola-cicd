import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import Modal from "react-modal";
import AuthProvider from "./contexts/auth";

Modal.setAppElement("#root");

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
