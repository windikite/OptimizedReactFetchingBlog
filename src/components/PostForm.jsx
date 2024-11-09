import { Form, Col, Button } from "react-bootstrap"
import { useState, useEffect } from "react"

const PostForm = ({onSubmit, initialValue, startString, progressString, isLoading}) => {

    const [post, setPost] = useState({
        title: initialValue.title || '',
        body: initialValue.body || ''
    })

    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(post)
        e.target.reset()
    }

    useEffect(() => {
        setPost({
            id: initialValue.id,
            title: initialValue.title,
            body: initialValue.body
        })
        console.log(post)
    }, [initialValue])

    return (
        <Col >
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" name="title" required onChange={(e) => handleChange(e)} value={post.title} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="body">
                    <Form.Label>Body</Form.Label>
                    <Form.Control as="textarea" rows={3} name="body" required onChange={(e) => handleChange(e)} value={post.body} />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? progressString : startString}
                </Button>
            </Form>
        </Col>
    )
}

export default PostForm