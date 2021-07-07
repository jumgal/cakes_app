import { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { userLoginAction } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';



const LoginScreen = ({ location, history }) => {
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    const dispatch = useDispatch()
    const { loading, error, userInfo } = useSelector(state => state.userLogin)
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [userInfo, history, redirect])

    const handleFormSubmit = e => {
        e.preventDefault();

        const { email, password } = login;

        dispatch(userLoginAction(email, password))
        setLogin({
            email: '',
            password: ''
        })
    }
    return (
        <>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={e => handleFormSubmit(e)}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        value={login.email}
                        onChange={(e) => setLogin({
                            ...login,
                            email: e.target.value
                        })}
                        type="email" placeholder="Enter email" required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={login.password}
                        onChange={e => setLogin({
                            ...login,
                            password: e.target.value
                        })}
                        type="password" placeholder="Password" required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign In
                </Button>
                <Row className="py-4">
                    <Col>
                        New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                    </Col>
                </Row>
            </Form>
        </>)
}


export default LoginScreen;