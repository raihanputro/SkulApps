import React from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Auth from "./components/auth/auth";
import SchoolDetails from "./components/posts/postDetails/postDetails";

const App = () => {

    const user = JSON.parse(localStorage.getItem('profile'));


    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN} >
            <BrowserRouter>
                <Container maxWidth="xl">
                    <Navbar />
                    <Routes>
                        <Route path="/"  element={<Navigate to="/schools" />} />
                        <Route path="/schools" element={<Home />}/>
                        <Route path="/schools/search" element={<Home />}/>
                        <Route path="/schools/:id" element={<SchoolDetails />}/>
                        <Route path="/auth"  element={!user ? <Auth /> : <Navigate to="/schools" />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
};

export default App;