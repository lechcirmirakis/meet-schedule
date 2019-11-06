import React, { memo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const addModal = props => {
  console.log('DEL MODAL RENDER');

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

        Tu będzie form

      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-warning" onClick={props.addTrigger}>
          Cancel
        </Button>
        <Button variant="success" onClick={props.addHandler}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default memo(addModal);