import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./backFamille.css";

const BackFamille = () => {
  const [familles, setFamilles] = useState(null);
  console.log(familles);
  useEffect(() => {
    let data;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3009/famille/read",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setFamilles(response.data.familles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="main">
      <h1>Familles</h1>
      <Link to="/backFamille/create" className="my-4">Créer famille</Link>
      <table className="table">
        <thead>
          <tr>
            <th
              style={{ width: "5%" }}
              aria-label="Identifiant de la famille"
            >
              Id
            </th>
            
            <th style={{ width: "30%" }} aria-label="Libellé de la famille">
              Libellé
            </th>
            <th style={{ width: "30%" }} aria-label="Description de la famille">
              Description
            </th>
            <th style={{ width: "30%" }} aria-label="Actions">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {familles &&
            familles.map((famille) => (
              <tr key={famille.famille_id}>
                <td>{famille.famille_id}</td>
                <td>{famille.libelle}</td>
                <td>{famille.description}</td>
                <td>
                  <Link
                    to={`/familleProfile/${famille.famille_id}`}
                    className="btn btn-primary"
                    aria-label="Editer les familles"
                  >
                    Editer
                  </Link>
                </td>
              </tr>
            ))}

          {familles && !familles.length && (
            <tr>
              <td>
                <p>Pas de familles à afficher</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BackFamille;
