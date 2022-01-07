import { useEffect, useState } from "react";
import { Accordion, Container, Spinner, Table } from "react-bootstrap";

const Order = () => {
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const data = await fetch("http://localhost:3000/shop/orders");
        const res = await data.json();

        setOrderData(res);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const orderDetail = (products) => {
    let price = 0,
      quantity = 0;

    products.map((product) => {
      price += product.price * product.orderItem.quantity;
      quantity += product.orderItem.quantity;
      return product;
    });

    return (
      <>
        Total Price: {price + "$"}
        <br />
        Total quantity: {quantity}
        <br />
      </>
    );
  };

  return (
    <>
      {loading ? (
        <Spinner animation="border" />
      ) : orderData.length < 1 ? (
        <h1>No Orders Available!</h1>
      ) : (
        <Container className="mt-2">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>User Id</th>
                <th>Created At</th>
                <th>Cart Items</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.userId}</td>
                  <td>{order.createdAt}</td>
                  <td>
                    <Accordion>
                      <Accordion.Item eventKey={`${index}`}>
                        <Accordion.Header>Order Detail</Accordion.Header>
                        <Accordion.Body>
                          {orderDetail(order.products)}
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Individual Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.products.map((product, index) => (
                                <tr key={product.id}>
                                  <td>{index + 1}</td>
                                  <td>{product.title}</td>
                                  <td>{product.price}</td>
                                  <td>{product.orderItem.quantity}</td>
                                  <td>
                                    {product.orderItem.quantity * product.price}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  );
};

export default Order;
