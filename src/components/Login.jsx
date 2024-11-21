import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import { State } from "../StateProvider"

function Login() {
    const [username, setUsername] = useState('');
    const {user, setUser} = State();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('userSession');
        if(storedUser) {
            const userSession = JSON.parse(storedUser);
            setUser(userSession);
            navigate('/')
        }
    }, [navigate, setUser]);

    const handleLogin = (e) => {
        e.preventDefault();
        const userData = { name: username, isLoggedIn: true, userId: 2};
        setUser(userData);
        localStorage.setItem('userSession', JSON.stringify(userData));
        navigate('/')
    };

    return ( 
        <Container className="vh-100">
            <Row className="justify-content-center align-items-center h-100">
                <Col md={5}>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="usernameInput" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">Log In</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
     );
}

export default Login;