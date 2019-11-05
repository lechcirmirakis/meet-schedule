import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const delModal = props => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.deltrigger}
      show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>Delete "{props.title}" ?</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this meeting?!</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-warning" onClick={props.deltrigger}>
          Cancel
        </Button>
        <Button variant="danger">
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default delModal;