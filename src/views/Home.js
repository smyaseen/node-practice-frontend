import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const data = await fetch("http://localhost:3000/admin/products");
        const res = await data.json();

        if (res.length > 0) setProducts(res);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const deleteProduct = async (index) => {
    setLoading(true);
    try {
      await fetch("http://localhost:3000/admin/delete-product", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index }),
      });

      products.splice(index, 1);
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const editProduct = (index) => {
    navigate(
      {
        pathname: "/edit-product",
        search: `?${createSearchParams({
          idx: index,
        })}`,
      },
      {
        state: {
          product: products[index],
        },
      }
    );
  };

  const addToCart = async (index) => {
    try {
      await fetch("http://localhost:3000/shop/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: products[index],
          index,
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
      <Row xs={1} md={4} sm={2} lg={6} className="g-4">
        {loading ? (
          <Spinner animation="border" />
        ) : products.length < 1 ? (
          <h1>No Products Available!</h1>
        ) : (
          products.map(({ title, price, image, description, id }, index) => (
            <Col
              style={{
                minHeight: "50px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              key={index}
            >
              <Card>
                <Card.Img variant="top" src={image} width={150} height={150} />
                <Card.Body>
                  <Card.Title
                    style={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {title}
                    <br />
                    {price}$
                  </Card.Title>
                  <Card.Text
                    style={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {description}
                  </Card.Text>

                  <Row className="g-3">
                    <Col>
                      <Button
                        variant="success"
                        onClick={() => editProduct(index)}
                      >
                        Edit
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="danger"
                        onClick={() => deleteProduct(index)}
                      >
                        Delete
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="warning"
                        onClick={() => addToCart(index)}
                      >
                        Add To Cart
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Home;
