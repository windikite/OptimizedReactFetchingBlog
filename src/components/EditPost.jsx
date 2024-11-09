import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Col, Row, Form, Button, Modal, Spinner } from "react-bootstrap";
import { State } from "../StateProvider"
import PostForm from "./PostForm";
import { fetchPost, updatePost } from "../hooks/queries";


const EditPost = () => {
    const {editingId, setEditingId} = State();
    const queryClient = useQueryClient();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const {data: post, isPending} = useQuery({
        queryKey: ['posts', editingId],
        queryFn: () => fetchPost(editingId)
    })

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: updatePost,
        onSuccess: (data) => {
            setShowSuccessAlert(true);
            console.log('Post updated with ID:', data.id);
            queryClient.invalidateQueries(['posts']);
            setTimeout(() => setShowSuccessAlert(false), 5000)
        }
    })

    const handleUpdate = (post) => {
        mutate(post)
        handleClose()
    }

    const handleClose = () => {
        setEditingId(false)
    }

    if (isPending) return <Spinner animation='border' role='status'><span className='visually-hidden'>Loading...</span></Spinner>

    return (
        <div>
            {isError && <Alert variant="danger">An error occured: {error.message}</Alert>}
            {showSuccessAlert && <Alert variant="success">Post saved sccessfully!</Alert>}
            {editingId && !isPending &&
                <Modal show={editingId} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Edit Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PostForm 
                            onSubmit={handleUpdate}
                            initialValue={post}
                            startString={'Save'}
                            progressString={'Updating...'}
                            isLoading={isLoading}
                        />
                    </Modal.Body>
                </Modal>
            }
        </div>
    );
}

export default EditPost;