import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditFamille = () => {
  const { id_famille } = useParams();

  let actualUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [famille, setFamille] = useState();

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}/famille/${id_famille}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response);
        setFamille(response.data.famille);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id_famille]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFamille((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(famille);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (actualUser !== undefined && actualUser.role === "admin") {
      const API_URL = import.meta.env.VITE_API_URL;
      let data = {
        id_famille: famille.id_famille,
        libelle: famille.libelle,
        description: famille.description,
      };
      data = JSON.stringify(data);

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${API_URL}/famille/update/${id}`,
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
            toast.success("Modification validée");
            setTimeout(() => {
              navigate("/backFamille");
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
        <h2>Modifier la Famille</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="col-sm-6 mx-auto">
          <div className="mt-4">
            <label className="form-label" htmlFor="libelle">
              Libellé
            </label>
            <input
              type="text"
              id="libelle"
              className="form-control"
              name="libelle"
              value={famille?.libelle || ""}
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
              value={famille?.description || ""}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="center mt-4">
          <button className="btn btn-primary" type="submit">
            Modifier
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFamille;