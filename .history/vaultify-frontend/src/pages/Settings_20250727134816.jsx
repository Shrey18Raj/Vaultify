import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';

const Settings = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
  };

    return (
        <MainLayout>
            <Container fluid>
                <h3 className="mb-4">Settings</h3>

                {/* User Info Card */}
                <Card className="mb-4 shadow-sm">
                    <Card.Body>
                        <h5>User Information</h5>
                        <Row className="mt-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" value="John Doe" disabled />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value="john.doe@vaultify.com" disabled />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Preferences */}
                <Card className="mb-4 shadow-sm">
                    <Card.Body>
                        <h5>Preferences</h5>
                        <Form.Check
                            type="switch"
                            id="dark-mode-switch"
                            label="Enable Dark Mode"
                            checked={darkMode}
                            onChange={toggleDarkMode}
                            className="mt-3"
                        />
                    </Card.Body>
                </Card>

                {/* Security */}
                <Card className="shadow-sm">
                    <Card.Body>
                        <h5>Security</h5>
                        <Form.Group className="mt-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter new password" />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm new password" />
                        </Form.Group>
                        <Button className="mt-3">Update Password</Button>
                    </Card.Body>
                </Card>
            </Container>
        </MainLayout>
    );
};

export default Settings;