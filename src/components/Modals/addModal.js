import React, { memo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AppModal = props => {
  console.log('ADD MODAL RENDER');
  console.log(props);
  const validInfo = !props.hourValid ? <p className="hour_valid">Please enter valid hours</p> : null;

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
          {
            props.inputsArray.map(input => {
              return (
                <Form.Group key={input.key}>
                  <Form.Label>{input.config.title}</Form.Label>
                  <Form.Control
                    value={input.config.value}
                    type={input.config.type}
                    as={input.config.as}
                    rows={input.config.rows}
                    placeholder={input.config.placeholder}
                    required={input.config.required}
                    onChange={(event) => props.updateInput(event, 'add')}
                    name={input.key}
                    min={input.config.min}
                  >
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">{input.config.validText}</Form.Control.Feedback>
                </Form.Group>
              )
            })
          }
          <Form.Group className={['form_buttons', !props.hourValid ? 'form_buttons--invalid' : null].join(' ')}>
            {validInfo}
            <div>
              <Button variant="outline-warning" onClick={props.addTrigger}>
                Cancel
              </Button>
              <Button type="submit" variant="success" onClick={props.addHandler}>
                Add
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default memo(AppModal);