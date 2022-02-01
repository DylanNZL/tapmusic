import React, { useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import { Col, Container, Form, Row } from "react-bootstrap";

function App() {
  // States
  const [timeSigBeat, setTimeSigBeat] = useState("4");
  const [timeSigNote, setTimeSigNote] = useState("4");
  const [preferredNote, setPreferredNote] = useState("quaver");
  const [tempo, setTempo] = useState(120);
  const [tempos] = useState([Date.now(), Date.now(), Date.now(), Date.now()]);
  const [recording, setRecording] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  let [notes] = useState([]);

  // tapTempo allows the user to modify the tempo by tapping the tempo out with mouse clicks instead.
  //
  // The logic for this tap tempo implementation looks at when the user clicked 3 taps ago and the latest tap. If that
  //  value is more than 4500ms we skip the tap tempo update as that would result in too low of a BPM. We then take that
  //  difference and convert it to seconds and use that to divide 3 as that is how many differences between beats we have.
  function tapTempo() {
    tempos.shift();
    tempos.push(Date.now());

    const difference = tempos.at(3) - tempos.at(0);
    if (difference > 4500) {
      console.log(
        `Skipping tap update as the bpm would be too low: ${difference}`
      );
      return;
    }
    const t = Math.round(3 / (difference / 1000 / 60));

    console.log(`Updating tempo to ${t}`);
    setTempo(t);
  }

  function start() {
    console.log("Starting recording");
    notes = [];
    setRecording(true);
    setStartTime(Date.now());
  }

  function startRecording() {
    const recordingTimeout = (timeSigNote / tempo) * 1000 * 60;
    // TODO: Preroll of timeSigBeat before the recording starts
    console.log(recordingTimeout);
    setTimeout(() => start(), recordingTimeout);
  }

  function stopRecording() {
    console.log("Stopping recording");
    setRecording(false);
    setEndTime(Date.now());
  }

  function recordNote() {
    console.log("Recording notes");
    notes.push(Date.now());
  }

  function listArray(array) {
    if (array.length === 0) {
      return <p>[]</p>;
    }

    return array.map((t) => <p>{t}&nbsp;</p>);
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
                value={timeSigBeat}
                onChange={(e) => setTimeSigBeat(e.target.value)}
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
                defaultValue={timeSigNote}
                onChange={(e) => setTimeSigNote(e.target.value)}
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
                defaultValue={preferredNote}
                onChange={(e) => setPreferredNote(e.target.value)}
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

      <Row>
        {/* TODO: Implement the notes being displayed */}
        <p>Picture containing the notes that has been recorded</p>

        {/* TODO: Remove or create proper debug section */}
        <p>Debug:</p>
        <p>tempos: {listArray(tempos)}</p>
        <p>recording: {recording.toString()}</p>
        <p>startTime: {startTime}</p>
        <p>endTime: {endTime}</p>
        <p>notes: {listArray(notes)}</p>
      </Row>

      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Form>
            <Form.Group className="mb-3" controlId="timeSignature">
              {recording ? (
                <div>
                  <Button onClick={() => stopRecording()}>
                    Stop Recording
                  </Button>
                  <Button onClick={() => recordNote()}>Record Note</Button>
                </div>
              ) : (
                <div>
                  <Form.Label>Record Music</Form.Label>
                  <Button onClick={() => startRecording()}>
                    Start Recording
                  </Button>
                </div>
              )}
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
