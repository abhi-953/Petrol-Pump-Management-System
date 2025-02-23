import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import modules from "./modules";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
  
  function handleClick(e) {
    const path = e.currentTarget.getAttribute('data-path'); 
    console.log(path);
    navigate("/" + path);
  }

  return (
    <Container className="mt-4" >
        <div style={{marginTop:'8%',marginBottom:'50px'}}>
      <h2 className="text-center mb-4" >Dashboard</h2>
      </div>
      <Row className="g-4">
        {modules.map((box) => (
          <Col key={box.index} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card className="shadow-sm p-3 text-center" data-path={box.title} onClick={handleClick}>
              <Card.Body>
                <Card.Title>{box.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
