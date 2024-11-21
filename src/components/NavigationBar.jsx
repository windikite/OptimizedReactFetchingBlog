import { NavLink } from "react-router-dom";
import { Button, Navbar, Nav} from "react-bootstrap"
import { State } from "../StateProvider"

const NavigationBar = () => {
    const {showCreatePost, setShowCreatePost, user} = State();

    const handleCreatePost = () => {
        setShowCreatePost(true)
    }

    return (
        <Navbar bg="light" expand="lg" className="p-1">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Brand href="/" className="text-info align-items-center">Grumblr</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {user.isLoggedIn === true ? 
                        <Nav.Link as={NavLink} to="/logout" activeclassname="active">
                            Log Out
                        </Nav.Link> :
                        <Nav.Link as={NavLink} to="/login" activeclassname="active">
                            Log In
                        </Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
            <Button variant="primary" onClick={() => handleCreatePost()}>
                Create Post
            </Button>
        </Navbar>
    )
}

export default NavigationBar