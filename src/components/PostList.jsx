import React from 'react';
import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useDeletePost } from '../hooks/mutations';
import { fetchPosts } from '../hooks/queries';
import { State } from "../StateProvider"

const PostList = () => {
    const {editingId, setEditingId} = State();
    const {data, isLoading, isError, isSuccess, isFetching, fetchNextPage, hasNextPage} = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return nextPage <= 5 ? nextPage : undefined;
        }
    })

    const [showDeleteSuccessAlert, setShowDeleteSuccessAlert] = useState(false);

    const deletePostMutation = useDeletePost();
    const handleDelete = (id) => {
        deletePostMutation.mutate(id);
        setShowDeleteSuccessAlert(true)
        setTimeout(() => setShowDeleteSuccessAlert(false), 5000)
    }

    const handleEdit = (id) => {
        setEditingId(id)
    }

    if (isLoading) return <Spinner animation='border' role='status'><span className='visually-hidden'>Loading...</span></Spinner>
    if (isError) return <Alert variant='danger'>Error fetching data</Alert>

    return (
        <div className='bg-secondary'>
            {showDeleteSuccessAlert && <Alert variant="success">Post deleted!</Alert>}
            <h1 className='text-light'>Dashboard</h1>
            {isSuccess && data.pages.map((page, index) => (
                <React.Fragment key={index}>
                    {page.map(post => (
                        <Card key={post.id} className='bg-light mb-3 mx-auto' style={{minWidth: "80%", maxWidth: "90%"}}>
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{post.body}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant='warning' onClick={() => handleEdit(post.id)}>Edit</Button>
                                <Button variant='danger' onClick={() => handleDelete(post.id)}>Delete</Button>
                            </Card.Footer>
                        </Card>
                    ))}
                </React.Fragment>
            ))}
            {hasNextPage && (
                <div className='d-flex justify-content-center'>
                    <Button variant='primary' disabled={isFetching} onClick={() => fetchNextPage()}>
                        {isFetching ? 'Loading...' : 'Load More'}
                    </Button>
                </div>
            )}
        </div>
    )
}

export default PostList