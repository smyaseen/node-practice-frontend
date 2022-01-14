import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const [editedProduct, setEditedProduct] = useState({
    _id: 1,
    title: "",
    price: 0,
    description: "",
    imageUrl: "",
  });

  const {
    state: { product },
  } = useLocation();

  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEditedProduct(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editProduct = async () => {
    setDisableSubmitButton(true);

    try {
      await fetch("http://localhost:3000/admin/edit-product", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: editedProduct,
          _id: window.location.search.split("=")[1],
        }),
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Can't edit product");
    }
  };

  return (
    <Container className="mt-2">
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) =>
              setEditedProduct({ ...product, title: e.target.value })
            }
            value={editedProduct.title}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Price"
            onChange={(e) =>
              setEditedProduct({ ...product, price: e.target.value })
            }
            value={editedProduct.price}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridImageURL">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Image URL"
            onChange={(e) =>
              setEditedProduct({ ...product, imageUrl: e.target.value })
            }
            value={editedProduct.imageUrl}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            onChange={(e) =>
              setEditedProduct({ ...product, description: e.target.value })
            }
            value={editedProduct.description}
          />
        </Form.Group>
      </Row>

      <Button
        variant="success"
        disabled={disableSubmitButton}
        onClick={editProduct}
      >
        Edit
      </Button>
    </Container>
  );
};

export default EditProduct;
