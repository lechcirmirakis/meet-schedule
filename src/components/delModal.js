import React, { memo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const delModal = props => {
  console.log('DEL MODAL RENDER');

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.delTrigger}
      show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>Delete "{props.meetTitle}" ?</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this meeting?!</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-warning" onClick={props.delTrigger}>
          Cancel
        </Button>
        <Button variant="danger" onClick={props.delHandler}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default memo(delModal);