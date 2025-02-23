import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import modules from './modules';

function Header() {
  const navigate = useNavigate();

  function handleClick(e) {
    const path = e.target.getAttribute('data-path'); 
    navigate("/" + path);
  }
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Petrol Pump Management System</Navbar.Brand>
        <div className="justify-content-end">
        <Nav className="me-auto">
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          {modules.map((box) => (
            <NavDropdown.Item data-path={box.title} onClick={handleClick}>
              {box.title}
            </NavDropdown.Item>
            
          ))}
            
            <NavDropdown.Divider />
          </NavDropdown>
        </Nav>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
