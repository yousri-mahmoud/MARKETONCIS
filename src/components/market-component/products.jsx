import React from "react";
import { Card } from "react-bootstrap";
import data from "../../data.json";
import { Link } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
function Products() {
  return (
    <>
      <div className="row products">
        {data.map((product) => {
          return (
            <div key={product.id} className="col-4 my-2">
              <Card className="position-relative">
                <AiOutlineStar className="position-absolute top-0 end-0" />
                <Link to={`/market/buy/item/${product.id}`}>
                  <Card.Img variant="top" src={product.images} />
                </Link>
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between align-items-center">
                    {product.deviceName}{" "}
                    <small className="text-danger">
                      {product.devicePrice} EGP
                    </small>
                  </Card.Title>

                  <Card.Text>{product.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    posted by : {product.name}
                  </small>
                </Card.Footer>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Products;
