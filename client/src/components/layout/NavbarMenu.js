import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import {useContext } from 'react'
import {AuthContext} from '../../contexts/AuthContext'
const NavbarMenu = () => {
    const {authState: {user :{username}}, logoutUser} = useContext(AuthContext)

    const logout = () => logoutUser()
    return (
        <Navbar expand='lg' bg='primary' variant='dark' className='shadow' >
            <Navbar.Brand className='font-weight-bolder text-white' >
                <button width='32' heigth='32' className='mr-2'>Santaryot</button>Learnit
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav' >
                <Nav className='mr-auto'>
                    <Nav.Link className='font-weight-bolder text-white' to='/dashboard' as={Link}>
                        Dashboard
                    </Nav.Link>
                    <Nav.Link className='font-weight-bolder text-white' to='/about' as={Link}>
                        About
                    </Nav.Link>
                </Nav>

                <Nav>
                    <Nav.Link className='font-weight-bolder text-white' disabled>
                        welcome {username}
                    </Nav.Link>
                    <Button variant='secondary' className='font-weight-bolder text-white' onClick={logout}>
                        Logout
                    </Button>
                </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarMenu
