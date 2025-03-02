import './styles/style.scss';
console.log('Webpack Setup Works!');

import { handleFormSubmit } from './js/app.js';
document.addEventListener("DOMContentLoaded", () => {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("departure-date").setAttribute("min", today);
  });
document.getElementById("travel-form").addEventListener("submit", handleFormSubmit);
