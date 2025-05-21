import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./backTemperament.css";

const BackTemperament = () => {
  const [temperaments, setTemperaments] = useState(null);
  console.log(temperaments);
  useEffect(() => {
    let data;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3009/temperament/read",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setTemperaments(response.data.temperaments);
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
              aria-label="Identifiant du temperament"
            >
              Id
            </th>
            
            <th style={{ width: "30%" }} aria-label="Libellé du temperament">
              Libellé
            </th>
            <th style={{ width: "30%" }} aria-label="Description du temperament">
              Description
            </th>
            <th style={{ width: "30%" }} aria-label="Actions">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {temperaments &&
            temperaments.map((temperament) => (
              <tr key={temperament.temperament_id}>
                <td>{temperament.temperament_id}</td>
                <td>{temperament.libelle}</td>
                <td>{temperament.description}</td>
                <td>
                  <Link
                    to={`/temperamentProfile/${temperament.temperament_id}`}
                    className="btn btn-primary"
                    aria-label="Editer les temperaments"
                  >
                    Editer
                  </Link>
                </td>
              </tr>
            ))}

          {temperaments && !temperaments.length && (
            <tr>
              <td>
                <p>Pas de temperament à afficher</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BackTemperament;
