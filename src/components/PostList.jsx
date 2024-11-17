import React, { useEffect } from 'react';
import { useState, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useDeletePost } from '../hooks/mutations';
import { fetchPosts } from '../hooks/queries';
import { State } from "../StateProvider"
import PostContent from './PostContent';

const PostList = () => {
    const {editingId, setEditingId, selectedUserId, setSelectedUserId} = State();
    const {data, isLoading, isError, isSuccess, isFetching, fetchNextPage, hasNextPage} = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return nextPage <= 5 ? nextPage : undefined;
        }
    })

    // sets pool of posts to display later
    const [allPosts, setAllPosts] = useState([]);
    // if data exists, update pool of posts
    useEffect(() => {
        if(data){
            setAllPosts(data.pages)
        }
    }, [data])
    // if there is a pool of posts and a selected user id, filter the posts
    const filteredPosts = useMemo(() => {
        if(selectedUserId){
            return allPosts.map(page => page.filter(post => post.userId === selectedUserId))
        }else{
            return allPosts
        }
    }, [allPosts, selectedUserId])

    const [showDeleteSuccessAlert, setShowDeleteSuccessAlert] = useState(false);

    const deletePostMutation = useDeletePost();
    const handleDelete = (id) => {
        deletePostMutation.mutate(id);
        setShowDeleteSuccessAlert(true);
        setTimeout(() => setShowDeleteSuccessAlert(false), 5000);
    }

    const handleEdit = (id) => {
        setEditingId(id)
    }

    const toggleUserPosts = () => {
        if(!selectedUserId){
            // this just sets the user ID to 2 to simulate filtering
            setSelectedUserId(2)
        }else{
            setSelectedUserId(false)
        }
    }

    if (isLoading) return <Spinner animation='border' role='status'><span className='visually-hidden'>Loading...</span></Spinner>
    if (isError) return <Alert variant='danger'>Error fetching data</Alert>

    return (
        <div className='bg-secondary'>
            <Button variant={selectedUserId ? 'success' : 'secondary'} onClick={() => toggleUserPosts()}>Your Posts</Button>
            {showDeleteSuccessAlert && <Alert variant="success">Post deleted!</Alert>}
            <h1 className='text-light'>Dashboard</h1>
            {isSuccess && !selectedUserId && allPosts.map((page, index) => (
                <React.Fragment key={index}>
                    {page.map(post => (
                        <PostContent
                            post={post}
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete}
                        />
                    ))}
                </React.Fragment>
            ))}
            {isSuccess && selectedUserId && filteredPosts.map((page, index) => (
                <React.Fragment key={index}>
                    {page.map(post => (
                        <PostContent
                            post={post}
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete}
                        />
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