import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = useState({
    id: 1,
    title: "",
    price: 0,
    description: "",
    image: "",
  });
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const navigate = useNavigate();

  const postProduct = async () => {
    setDisableSubmitButton(true);

    try {
      await fetch("http://localhost:3000/admin/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...product, id: Math.random().toString() }),
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Can't add product");
    }

    // setDisableSubmitButton(false);
  };

  return (
    <Container className="mt-2">
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Price"
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridImageURL">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Image URL"
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
        </Form.Group>
      </Row>

      <Button
        variant="primary"
        disabled={disableSubmitButton}
        onClick={postProduct}
      >
        Submit
      </Button>
    </Container>
  );
};

export default AddProduct;
