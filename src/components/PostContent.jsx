import { Card, Button } from "react-bootstrap"
import { memo } from "react";

const PostContent = memo(function PostContent({post, handleEdit, handleDelete}){
    return (
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
    )
});

export default PostContent;