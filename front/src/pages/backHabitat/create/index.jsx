import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BackHabitatCreate = () => {
  let actualUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [habitat, setHabitat] = useState();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHabitat((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(habitat);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      actualUser !== undefined &&
      actualUser.role === "admin"
    ) {
      const API_URL = import.meta.env.VITE_API_URL;
      let data = {
        id_habitat: habitat.id_habitat,
        libelle: habitat.libelle,
        description: habitat.description
      };
      data = JSON.stringify(data);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${API_URL}/habitat/create`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            toast.success("Création effectuée avec succès");
            setTimeout(() => {
              navigate("/backHabitat");
            }, 3000);
          }
        })
        .catch((error) => {
          const errorMessage = error.response
            ? error.response.data.message || "An error occurred"
            : "An error occurred";
          toast.error(errorMessage);
        });
    } else {
      const errorMessage =
        "Vous ne disposez pas des droits pour cette modification";
      toast.error(errorMessage);
      navigate("/home");
    }
  };

  return (
    <div className="main-table">
      <div className="center">
        <h2>Nouvel Habitat</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="col-sm-6 mx-auto">
          <div className="mt-4">
            <label className="form-label" htmlFor="id_habitat">
              ID Habitat
            </label>
            <input
              type="text"
              id="id_habitat"
              className="form-control"
              name="id_habitat"
              value={habitat?.id_habitat || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4">
            <label className="form-label" htmlFor="libelle">
              Libellé
            </label>
            <input
              type="text"
              id="libelle"
              className="form-control"
              name="libelle"
              value={habitat?.libelle || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="form-control"
              name="description"
              rows="4"
              value={habitat?.description || ""}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="center mt-4">
          <button className="btn btn-primary" type="submit">
            Créer
          </button>
        </div>
      </form>
    </div>
  );
};

export default BackHabitatCreate;