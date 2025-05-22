import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditCommentaire = () => {
  const { id } = useParams();

  let actualUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [commentaire, setCommentaire] = useState();

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}/commentaire/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response);
        setCommentaire(response.data.commentaire);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommentaire((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(commentaire);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (actualUser !== undefined && actualUser.role === "admin") {
      const API_URL = import.meta.env.VITE_API_URL;
      let validate
      if (actualUser.role = "admin") {
        validate = commentaire.validation;
      }else{
        validate = false;
      }
      let data = {
        note: commentaire.note,
        commentaire: commentaire.commentaire,
        validation: validate,
      };
      data = JSON.stringify(data);

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${API_URL}/commentaire/update/${id}`,
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
              navigate("/backCommentaire");
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
        <h2>Modifier le Commentaire</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="col-sm-6 mx-auto">
          <label className="form-label mt-4">Note</label>
          <div className="d-flex justify-content-between">
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="note"
                  id={`note${value}`}
                  value={value}
                  checked={commentaire && commentaire.note === value.toString()}
                  onChange={handleInputChange}
                  required
                />
                <label className="form-check-label" htmlFor={`note${value}`}>
                  {value}
                </label>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="form-label" htmlFor="commentaire">
              Commentaire
            </label>
            <textarea
              id="commentaire"
              className="form-control"
              name="commentaire"
              rows="4"
              placeholder="Écrivez votre commentaire ici"
              value={commentaire?.commentaire || ""}
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

export default EditCommentaire;