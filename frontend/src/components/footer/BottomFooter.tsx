import React from 'react'
import '../../styles/components/footer/bottom-footer.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FooterList from './FooterList'

function BottomFooter() {
  return (
    <div className='bottom-footer'>
        <Container>
            <Row>
                <Col></Col>
                <Col>
                    <FooterList 
                        title="My Account"
                        list={[
                            { text: "string1", link: "" },
                            { text: "string2", link: "" },
                            { text: "string3", link: "" },
                        ]}
                    />
                </Col>
                <Col></Col>
                <Col></Col>
            </Row>
        </Container>
    </div>
  )
}

export default BottomFooter