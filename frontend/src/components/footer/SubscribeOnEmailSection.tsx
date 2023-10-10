import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FooterSearchBar from './FooterSearchBar';
import '../../styles/components/footer/email-section.css';

function SubscribeOnEmailSection() {
  return (
    <div className='footer-email-section'>
        <Container>
            <Row 
                className='d-flex align-items-center'
                xs={2}>
                <Col>
                    <h3>Підпишіться на оновлення</h3>
                    <p className="text-body-tertiary">Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna.</p>
                </Col>
                <Col>
                    <FooterSearchBar />
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default SubscribeOnEmailSection