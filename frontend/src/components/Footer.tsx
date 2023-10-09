import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import RoundedButton from './common/RoundedButton';

function Footer(){
    return(
        <footer>
            <div className="bg-light">
                <Container className='bg-light'>
                    <Row 
                        className="d-flex align-items-center"
                        xs={2}>
                        <Col className=''>
                            <h3>Підпишіться на оновлення</h3>
                            <p className="text-body-tertiary">Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna.</p>
                        </Col>
                        <Col>
                            <InputGroup size="sm">
                                <Form.Control
                                    placeholder='Ваша почта'
                                />
                                <RoundedButton>Підписатися</RoundedButton>
                            </InputGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="bg-"></div>
        </footer>
    );
}

export default Footer;