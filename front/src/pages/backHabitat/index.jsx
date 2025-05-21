import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./backHabitat.css";

const BackHabitat = () => {
  const [habitats, setHabitats] = useState(null);
  console.log(habitats);
  useEffect(() => {
    let data;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3009/habitat/read",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setHabitats(response.data.habitats);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="main">
      <table className="table">
        <thead>
          <tr>
            <th
              style={{ width: "5%" }}
              aria-label="Identifiant de la habitat"
            >
              Id
            </th>
            
            <th style={{ width: "30%" }} aria-label="Libellé de l'habitat">
              Libellé
            </th>
            <th style={{ width: "30%" }} aria-label="Description de l'habitat">
              Description
            </th>
            <th style={{ width: "30%" }} aria-label="Actions">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {habitats &&
            habitats.map((habitat) => (
              <tr key={habitat.habitat_id}>
                <td>{habitat.habitat_id}</td>
                <td>{habitat.libelle}</td>
                <td>{habitat.description}</td>
                <td>
                  <Link
                    to={`/habitatProfile/${habitat.habitat_id}`}
                    className="btn btn-primary"
                    aria-label="Editer les habitats"
                  >
                    Editer
                  </Link>
                </td>
              </tr>
            ))}

          {habitats && !habitats.length && (
            <tr>
              <td>
                <p>Pas d'habitat à afficher</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BackHabitat;
