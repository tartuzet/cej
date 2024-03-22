import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div align='center'>
    <h1>Directorio de la Confraternidad Evagélica de Jiutepec</h1>
    </div>
    <App />
    <br/><br/>
    <div align='center'>
    <a href="https://www.facebook.com/confraternidadjiutepec">¡Visita nuestra página de facebook!</a>    
    <p>©2024 CEJ | Un sitio de la Confraternidad Evagélica Jiutepec</p>
    </div>    
    <br/><br/>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
