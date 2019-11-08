import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import formInputs from '../../static/addFormObject';
import WithTodayDate from '../../hoc/todayDate';

const AppModal = React.memo(props => {
  console.log(props.todayDate);
  console.log('ADD MODAL RENDER');

  const [formInputsState, setFormInputsState] = useState(formInputs);
  const [formValidState, setFormValidState] = useState(false);
  const [hourValidState, setHourValidState] = useState(true);

  useEffect(() => console.log('value changed!'), [props.show]);

  const submitHandler = event => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setFormValidState(true)
    }
    else {
      let startTime = Date.parse('01/01/2011 ' + formInputsState.start.value);
      let endTime = Date.parse('01/01/2011 ' + formInputsState.end.value);

      if (!(endTime > startTime)) {
        setHourValidState(false);
        return
      }

      const newMeeting = {
        id: Math.random().toString(),
        title: formInputsState.name.value,
        descript: formInputsState.descript.value,
        date: formInputsState.date.value,
        startTime: formInputsState.start.value,
        endTime: formInputsState.end.value,
        open: false
      }

      props.onAddMeeting(newMeeting);

      setFormValidState(false);
      setHourValidState(true);

      setFormInputsState(prevState => {
        const resetForm = prevState;
        for (const key in resetForm) {
          resetForm[key].value = ''
        }
        return resetForm
      })
    }
  };

  // make an array for form inputs
  const formInputsArray = [];

  for (const key in formInputsState) {
    formInputsArray.push({
      key: key,
      config: formInputsState[key]
    })
  }

  const validInfo = !hourValidState ? <p className="hour_valid">Please enter valid hours</p> : null;

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
        <Form noValidate validated={formValidState} onSubmit={event => submitHandler(event)}>
          {
            formInputsArray.map(input => {
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
                    name={input.key}
                    min={input.config.min}
                    onChange={event => {
                      const updateValue = event.target.value;
                      setFormInputsState(prevState => {
                        const newState = { ...prevState }
                        newState[input.key].value = updateValue
                        return newState
                      })
                    }}
                  >
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">{input.config.validText}</Form.Control.Feedback>
                </Form.Group>
              )
            })
          }
          <Form.Group className={['form_buttons', !hourValidState ? 'form_buttons--invalid' : null].join(' ')}>
            {validInfo}
            <div>
              <Button variant="outline-warning" onClick={props.addTrigger}>
                Cancel
              </Button>
              <Button type="submit" variant="success">
                Add
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
});

export default WithTodayDate(AppModal);