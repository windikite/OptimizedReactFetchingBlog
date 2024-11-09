import { useState } from "react"
import { Button, Modal, Navbar, Nav, NavLink } from "react-bootstrap"
import { State } from "../StateProvider"

const ToolBar = () => {
    const {showCreatePost, setShowCreatePost} = State();

    const handleCreatePost = () => {
        setShowCreatePost(true)
    }

    const handleClose = () => {
        setShowCreatePost(false)
    }

    return (
        <Navbar bg="light" expand="lg" className="p-1">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Brand href="/" className="text-info align-items-center">Grumblr</Navbar.Brand>
            <Button variant="primary" onClick={() => handleCreatePost()}>
                Create Post
            </Button>
            
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/" activeclassname="active">
                        Dashboard
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default ToolBar