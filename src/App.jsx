import React, { useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import { Col, Container, Form, Row } from "react-bootstrap";

function App() {
  // States
  const [tempo, setTempo] = useState(120);
  const [tempos] = useState([Date.now(), Date.now(), Date.now(), Date.now()]);

  //
  function tapTempo() {
    tempos.shift();
    tempos.push(Date.now());

    const difference = tempos.at(3) - tempos.at(0);
    if (difference < 4500) {
      console.log(
        `Skipping tap update as the bpm would be too low: ${difference}`
      );
      return;
    }
    const t = Math.round(3 / (difference / 1000 / 60));

    console.log(`Updating tempo to ${t}`);
    setTempo(t);
  }

  return (
    <Container className="App">
      <h3>Tap Music</h3>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Form>
            <Form.Group className="mb-3" controlId="timeSignature">
              <Form.Label>Time Signature</Form.Label>
              <Form.Select
                aria-label="Select for the beat part of the Time Signature"
                defaultValue="4"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </Form.Select>
              <Form.Select
                aria-label="4 for the note part of the Time Signature"
                defaultValue="quaver"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="preferredNote">
              <Form.Label>Preferred Note</Form.Label>
              <Form.Select
                aria-label="Select for the preferred note"
                defaultValue="quaver"
              >
                <option value="breve">Breve</option>
                <option value="semibreve">Semibreve</option>
                <option value="minum">Minum</option>
                <option value="crotchet">Crotchet</option>
                <option value="quaver">Quaver</option>
                <option value="semiquaver">Semiquaver</option>
                <option value="demisemiquaver">Demisemiquaver</option>
                <option value="hemidemisemiquaver">Hemidemisemiquaver</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="tapTempo">
              <Form.Label>Tempo</Form.Label>
              <Button onClick={() => tapTempo()}>{tempo}</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
