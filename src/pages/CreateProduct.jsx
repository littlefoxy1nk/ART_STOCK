import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


//on reprend L'aPI 
const API_URL = 'https://675c4820fe09df667f6351e2.mockapi.io/api/todo/products';

// comment on crée l'objet 
const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    currency: '€',
    year: '',
    stock: '',
    imgSrc: ''
  });

  // cette fonction permet qu'on retourne a la page home quand on appuie sur submit 
  const navigate = useNavigate();
  
// pour mettre a jour les nouvelles données entreer par 'l'utilsateur'
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // quand on appuie sur envoyer on envoi l'objet a l'API => POST 
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(API_URL, formData)
      .then(() => navigate('/'))
      .catch(error => console.error('Erreur création :', error));
  };

  return (
    <div>
      <h1>DETAILS</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Name" onChange={handleInputChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleInputChange} required />
        <input type="text" name="year" placeholder="year" onChange={handleInputChange} required />
        <input type="number" name="stock" placeholder="Stock" onChange={handleInputChange} required />
        <input type="text" name="imgSrc" placeholder="URL " onChange={handleInputChange} required />
        <button type="submit">ADD </button>
      </form>
    </div>
  );
};

export default CreateProduct;
