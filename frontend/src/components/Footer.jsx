import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FooterPage = () => {
    return (
        <footer className="bg-primary text-white text-center py-3">
            <Container>
                <Row>
                    <Col sm={6}>
                        <h6>Park Hero</h6>
                        <p>Here you can use rows and columns to organize your footer content.</p>
                    </Col>
                    <Col sm={6}>
                        <h6>Links</h6>
                        <ul className="list-unstyled">
                            <li><a href="#!" className="text-white">Link 1</a></li>
                            <li><a href="#!" className="text-white">Link 2</a></li>
                            <li><a href="#!" className="text-white">Link 3</a></li>
                            <li><a href="#!" className="text-white">Link 4</a></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            <div className="text-center mt-3">
                &copy; {new Date().getFullYear()} Copyright: 
                <a href="https://www.ParkHero.com" className="text-white"> ParkHero.com </a>
            </div>
        </footer>
    );
};

export default FooterPage;
