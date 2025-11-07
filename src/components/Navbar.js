import React from "react";
import { Link } from "react-router-dom";
import { Navbar as BSNavbar, Nav, Container } from "react-bootstrap";

export default function Navbar() {
  return (
    <BSNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BSNavbar.Brand as={Link} to="/">WPA Candidats</BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Formulaire</Nav.Link>
            <Nav.Link as={Link} to="/delete">Supprimer compte</Nav.Link>
            <Nav.Link as={Link} to="/stats">Statistiques</Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}