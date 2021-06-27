import { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { userRegisterAction } from '../actions/userActions'



const RegisterScreen = ({ history, location }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const { loading, error, userInfo } = useSelector(state => state.userRegister)

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])


    const handleFormSubmit = e => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(userRegisterAction(name, email, password))
        }

        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }




    return (
        <>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="formname">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type="text" placeholder="Enter name" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        type="password" placeholder="Confirm Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    SignUp
                </Button>

                <Row className='py-4'>
                    <Col>
                        Have an Account?{' '}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                            Login
                        </Link>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default RegisterScreen;