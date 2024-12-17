
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// axios = bibli JS pour amélérorer les requêtes vers les API 
import axios from 'axios';

// API creer avec mockAPI 
const API_URL = 'https://675c4820fe09df667f6351e2.mockapi.io/api/todo/products';


// on creer le produit 
const Home = () => {
  const [products, setProducts] = useState([]);

  // prendre ce qu'il y' a dans l'API 
  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.error('Erreur de récupération des produits :', error));
  }, []); // le [] pour quand ca doit se faire donc ici une seule fois 

  // supprimer l'objet quand j'appuie sur le boutons supprimer 
  const deleteProduct = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setProducts(products.filter(product => product.id !== id)))
      .catch(error => console.error('Erreur de suppression:', error));
  };

  return (
    <div>
      <h1>ARTS PRODUCTS </h1>
      {/*pour creer le lien vers la page d'ajout*/}
      <Link className="add" to="/create"> + Add a New One</Link> 
      <div>
          {/*venir rechercher ce qu'on veut dans l'API */}
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img 
              src={product.imgSrc || 'https://via.placeholder.com/150'} 
              alt={product.title} 
              width="100" 
              height="100" 
            />
            <h2>{product.title}</h2>
            <p>Prix : {product.price} {product.currency}</p>
            <p>Stock : {product.stock}</p>
              {/*le bouton avec la fonction pour supprimer */}
            <button onClick={() => deleteProduct(product.id)}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
