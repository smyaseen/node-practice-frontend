import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const data = await fetch("http://localhost:3000/shop/products");
        const res = await data.json();

        let price = 0;
        let quantity = 0;

        res.map((product) => {
          price += product.price * product.cartItem.quantity;
          quantity += product.cartItem.quantity;
          return product;
        });

        setTotalPrice(price);
        setTotalQuantity(quantity);

        if (res.length > 0) setProducts(res);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const deleteProduct = async (index, id) => {
    setLoading(true);
    try {
      await fetch("http://localhost:3000/shop/delete-product", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      products.splice(index, 1);
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const checkout = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:3000/shop/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setProducts([]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Spinner animation="border" />
      ) : products.length < 1 ? (
        <h1>No Products Available!</h1>
      ) : (
        <Container className="mt-2">
          Total Price: {" " + totalPrice + "$"}
          <br />
          Total quantity: {" " + totalQuantity}
          <br />
          <Button variant="success" onClick={() => checkout()}>
            Checkout
          </Button>
          <br />
          <hr />
          <br />
          <Row xs={1} md={4} sm={2} lg={6} className="g-4">
            {products.map(
              (
                {
                  title,
                  price,
                  imageUrl,
                  description,
                  id,
                  cartItem: { quantity },
                },
                index
              ) => (
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
                    <Card.Img
                      variant="top"
                      src={imageUrl}
                      width={150}
                      height={150}
                    />
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
                        <br />
                        quantity: {" " + quantity}
                        <br />
                        Total $: {" " + price * quantity}$
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
                      <Row className="g-1">
                        <Button
                          variant="danger"
                          onClick={() => deleteProduct(index, id)}
                        >
                          Delete
                        </Button>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              )
            )}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Cart;
