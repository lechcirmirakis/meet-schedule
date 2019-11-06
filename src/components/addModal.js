import React, { memo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const addModal = props => {
  console.log('ADD MODAL RENDER');
  console.log(props.valid);

  const getTodayDate = () => {
    let todayDate = new Date();

    let dd = todayDate.getDate();
    let mm = todayDate.getMonth() + 1;
    const yyyy = todayDate.getFullYear();

    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }

    return todayDate = yyyy + '-' + mm + '-' + dd;
  }

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.addTrigger}
      show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>Add new meeting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={props.valid} onSubmit={(event) => props.handleSubmit(event)}>
          <Form.Group>
            <Form.Label>Meeting title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Meeting title"
              name="name"
              value={props.formValues.name.value}
              onChange={(event) => props.updateInput(event)}
            />
            <Form.Control.Feedback type="invalid">Enter the meeting title!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Meeting description</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows="4"
              placeholder="Meeting description"
              name="descript"
              onChange={(event) => props.updateInput(event)} />
            <Form.Control.Feedback type="invalid">Enter the meeting descript!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Meeting date</Form.Label>
            <Form.Control
              required
              type="date"
              min={getTodayDate()}
              name="date"
              onChange={(event) => props.updateInput(event)}
            />
            <Form.Control.Feedback type="invalid">Enter the meeting date (min today date)!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Start of meeting</Form.Label>
            <Form.Control
              required
              type="time"
              name="start"
              // min={getTodayDate()}
              onChange={(event) => props.updateInput(event)}
            />
            <Form.Control.Feedback type="invalid">Select the meeting start time!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>End of meeting</Form.Label>
            <Form.Control
              required
              type="time"
              name="end"
              onChange={(event) => props.updateInput(event)}
            // min={getTodayDate()}
            />
            <Form.Control.Feedback type="invalid">Select the meeting end time!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form_buttons">
            <Button variant="outline-warning" onClick={props.addTrigger}>
              Cancel
            </Button>
            <Button type="submit" variant="success" onClick={props.addHandler}>
              Add
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default memo(addModal);