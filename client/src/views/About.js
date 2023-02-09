import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import {useState} from 'react'

const About = () => {
    var domain = [
        "freetuts.net", 
        "techtuts.net", 
        "simpletutorials.org"
    ];
     
    var array = [
        {
            id: 1,
            name: 'Thuan',
            Add: 'Giao Hai'
        },
        {
            id: 2,
            name: 'Nam',
            Add: 'Giao Long'
        },
        {
            id: 3,
            name: 'Dao',
            Add: 'Giao Thuy'
        },
        {
            id: 4,
            name: 'Buoi',
            Add: 'Giao Lam'
        },
        {
            id: 5,
            name: 'Vi',
            Add: 'Giao Xuan'
        }
    ]
    const [search , setSearch] = useState('')
    const newArray = array.find(function (member , index){
        return member.id === search
    })
    return (
        <>
            <Row className='mt-5'>
            <Col className='text-center'>
                <Button 
                    variant='primary'
                    href='https://napthe.vn/app/32787/buy/0'
                    size='lg'
                >
                    Donate for me
                </Button>

            </Col>
            </Row>
            <input type='text' value={search} onChange={e => setSearch(e.target.value)} />
            {/* <ul>
                {newArray.map((m) => (<li>{m.name}</li>))}
            </ul> */}
            {
                
                newArray.map(function(item){
                    console.log(item);
                })
            }
        </>
        
    )
}

export default About
