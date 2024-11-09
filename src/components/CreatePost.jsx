import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert, Col, Row, Form, Button, Modal } from "react-bootstrap";
import { State } from "../StateProvider"
import PostForm from "./PostForm";
import { postPost } from "../hooks/queries";


const CreatePost = () => {
    const {showCreatePost, setShowCreatePost} = State();
    const queryClient = useQueryClient();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: postPost,
        onSuccess: (data) => {
            setShowSuccessAlert(true);
            console.log('Post added with ID:', data.id);
            queryClient.invalidateQueries(['posts']);
            setTimeout(() => setShowSuccessAlert(false), 5000)
        }
    })

    const handleCreate = (post) => {
        mutate(post)
        handleClose()
    }

    const handleClose = () => {
        setShowCreatePost(false)
    }

    return (
        <div>
            {isError && <Alert variant="danger">An error occured: {error.message}</Alert>}
            {showSuccessAlert && <Alert variant="success">Post added sccessfully!</Alert>}
            {showCreatePost === true && 
                <Modal show={showCreatePost} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Create New Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PostForm 
                            onSubmit={handleCreate}
                            initialValue={false}
                            startString={'Post'}
                            progressString={'Posting...'}
                            isLoading={isLoading}
                        />
                    </Modal.Body>
                </Modal>
            }
        </div>
    );
}

export default CreatePost;