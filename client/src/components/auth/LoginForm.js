import React, {useState, useContext}from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link, useHistory} from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const LoginForm = () => {
    const history = useHistory()
    const {loginUser} = useContext(AuthContext)
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })
    const {username, password} = loginForm

    const [alert, setAlert] = useState(null)
    const onChangeLoginForm = event => setLoginForm({...loginForm, [event.target.name]: event.target.value})

    const login = async event => {
        event.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            if(loginData.success) {
                // history.push('/dashboard')
            }else{
                setAlert({type: 'danger', message: loginData.message})
                setTimeout(() => setAlert(null), 5000)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
        <Form className='my-4' onSubmit={login}>
        <AlertMessage info={alert} />
            <Form.Group>
                <Form.Control 
                    type='text'
                    placeholder='Username'
                    name='username'
                    required
                    value={username}
                    onChange={onChangeLoginForm}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control 
                    type='password'
                    placeholder='Password'
                    name='password'
                    required
                    value={password}
                    onChange={onChangeLoginForm}
                />
            </Form.Group>
            <Form.Group>
                <Button type='submit'>login </Button>
            </Form.Group>
        </Form>
        <p>
            Don't have a account
            <Link to='/register' >
                <Button variant='info' size='sm' className='ml-2' >Register</Button>
            </Link>
        </p>
        </>
    )
}

export default LoginForm
