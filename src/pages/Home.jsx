
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// axios = bibli JS pour amélérorer les requêtes vers les API 
import axios from 'axios';

// API creer avec mockAPI 
const API_URL = 'https://675c4820fe09df667f6351e2.mockapi.io/api/todo/products';


// on creer le produit 
const Home = () => {
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(null); // stocke l'ID du produit quand on veut le modifier 
 

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

 // Mettre à jour les champs du produit lorsqu'on tape dans l'input
 const handleInputChange = (id, field, value) => { // id , le champ et la valeur sont les 3 paramètre 
  const updatedProducts = products.map(product => 
    product.id === id ? { ...product, [field]: value } : product // : product veut dire que si ce n'est pas le bon on le laisse comme ca 
  );
  setProducts(updatedProducts);
};

// Enregistrer les modifications du produit
const saveProduct = (id) => {
  const productToUpdate = products.find(product => product.id === id);
  axios.put(`${API_URL}/${id}`, productToUpdate)
    .then(() => alert('Produit mis à jour '))
    .catch(error => console.error('Erreur de mise à jour:', error));
    setEditMode(null);
};

// permettre la modification d'un produit 
const enableEditMode = (id) => {
  setEditMode(id);
}




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
           {/*$si son veut faire des modifications  */}
           {editMode === product.id ? (
            // si on est en edit mode => on voit les inputs 
              <>
           <input 
              type="text" 
              name="title" 
              value={product.title} 
              onChange={(e) => handleInputChange(product.id, 'title', e.target.value)} 
            />

            <input 
              type="number" 
              name="price" 
              value={product.price} 
              onChange={(e) => handleInputChange(product.id, 'price', e.target.value)} 
            />

            <input 
              type="number" 
              name="stock" 
              value={product.stock} 
              onChange={(e) => handleInputChange(product.id, 'stock', e.target.value)} 
            />

            <input 
              type="text" 
              name="year" 
              value={product.year} 
              onChange={(e) => handleInputChange(product.id, 'year', e.target.value)} 
            />

            {/* Boutons d'action */}
            <button onClick={() => saveProduct(product.id)}>Enregistrer</button>
            <button onClick={() => deleteProduct(product.id)}>Supprimer</button>
          </>
           ):(
            // sinon on est en mode lecture et on voit juste la lecture
            <>
            <h2>{product.title}</h2>
                <p>Prix : {product.price} {product.currency}</p>
                <p>Stock : {product.stock}</p>
                <p>Year : {product.year}</p>

                <button onClick={() => enableEditMode(product.id)}>Modifier</button>
                <button onClick={() => deleteProduct(product.id)}>Supprimer</button>
            </>
           )}
           </div>
         ))}
       </div>
     </div>
   );
 };

export default Home;
