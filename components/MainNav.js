import React, { useState } from 'react';
import { Container, Form, Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '../lib/userData';
import { removeToken, readToken } from '../lib/authenticate';


const MainNav = () => {

  const router = useRouter();
  const [ isExpanded, setIsExpanded ] = useState(false);
  const [ input, setInput ] = useState('');
  const [ searchHistory, setSearchHistory ] = useAtom(searchHistoryAtom);

  let token = readToken();


  const logout = () => {
    setIsExpanded(false);
    removeToken();
    router.push('/login');
  }

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    router.push(`/artwork?title=true&q=${input}`);
    setIsExpanded(false);
    setInput('');
    setSearchHistory(await addToHistory(`title=true&q=${input}`));
  }


  const handleToggle = (e) =>{
    setIsExpanded(!isExpanded);
  }

  return (
    <>
    <Navbar collapseOnSelect onToggle={handleToggle} className="fixed-top navbar-dark bg-primary" expand="lg" expanded={isExpanded}>
      <Container>
        <Navbar.Brand>YoonSeong Seo</Navbar.Brand>
        <Navbar.Toggle  aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref>
                <Nav.Link active={router.pathname === "/"}>Home</Nav.Link>
            </Link>
            {token && <Link href="/search" passHref>
                <Nav.Link active={router.pathname === "/search"}>Advanced Search</Nav.Link>
            </Link>}
          </Nav>
          {!token && 
            <Nav>
              <Link href="/register" passHref>
                <Nav.Link active={router.pathname === "/register"}>Register</Nav.Link>
              </Link>
              <Link href="/login" passHref>
                <Nav.Link active={router.pathname === "/login"}>Log In</Nav.Link>
              </Link>
            </Nav>}
          
          {token && <><br/><Form onSubmit={handleSubmit} className="d-flex">
            <Form.Control 
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={input}
              onChange={handleChange}
            />
            <Button variant="success" type="submit">Search</Button>
          </Form><br/></>}
          
          <Nav>
          {token && <NavDropdown title={token.userName} id="basic-nav-dropdown">
            <Link href="/favourites" passHref>
              <NavDropdown.Item active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item>
            </Link>
            <Link href="/history" passHref>
              <NavDropdown.Item active={router.pathname === "/history"}>Search History</NavDropdown.Item>
            </Link>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br/><br/><br/>
    </>
  )
}

export default MainNav