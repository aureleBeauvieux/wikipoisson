import './App.css'  
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/Home";
import BackOffice from "./pages/backOffice";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import UserProfile from "./pages/userProfile";
import BackCommentaire from "./pages/backCommentaire";
import BackCommentaireCreate from "./pages/backCommentaire/create";
import BackCommentaireUpdate from "./pages/backCommentaire/update";

import BackContribution from "./pages/backContribution";
import Contribution from "./pages/contribution";
import BackContributionUpdate from "./pages/backContribution/update";

import BackEspece from "./pages/backEspece";
import BackEspeceCreate from "./pages/backEspece/create";
import BackEspeceUpdate from "./pages/backEspece/update";

import BackHabitat from "./pages/backHabitat";
import BackHabitatCreate from "./pages/backHabitat/create";
import BackHabitatUpdate from "./pages/backHabitat/update";

import BackTemperament from "./pages/backTemperament";
import BackTemperamentCreate from "./pages/backTemperament/create";
import BackTemperamentUpdate from "./pages/backTemperament/update";

import BackFamille from "./pages/backFamille";
import BackFamilleCreate from "./pages/backFamille/create";
import BackFamilleUpdate from "./pages/backFamille/update";







function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/backOffice" element={<BackOffice />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/userProfile" element={<UserProfile />} />
        
        <Route path="/backCommentaire" element={<BackCommentaire />} />
        <Route path="/backCommentaire/create" element={<BackCommentaireCreate />} />
        <Route path="/backCommentaire/update/:id" element={<BackCommentaireUpdate />} />

        <Route path="/backContribution" element={<BackContribution />} />
        <Route path="/Contribution" element={<Contribution />} />
        <Route path="/backContribution/update/:id" element={<BackContributionUpdate />} />

        <Route path="/backEspece" element={<BackEspece />} />
        <Route path="/backEspece/create" element={<BackEspeceCreate />} />
        <Route path="/backEspece/update/:id" element={<BackEspeceUpdate />} />

        <Route path="/backHabitat" element={<BackHabitat />} />
        <Route path="/backHabitat/create" element={<BackHabitatCreate />} />
        <Route path="/backHabitat/update/:id" element={<BackHabitatUpdate />} />

        <Route path="/backTemperament" element={<BackTemperament />} />
        <Route path="/backTemperament/create" element={<BackTemperamentCreate />} />
        <Route path="/backTemperament/update/:id" element={<BackTemperamentUpdate />} />
      
        <Route path="/backFamille" element={<BackFamille />} />
        <Route path="/backFamille/create" element={<BackFamilleCreate />} />
        <Route path="/backFamille/update/:id" element={<BackFamilleUpdate />} />
      </Routes>     
      <Footer />
      <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
    </Router>
  )
}

export default App