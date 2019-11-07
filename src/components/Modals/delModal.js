import React, { memo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const delModal = props => {
  console.log('DEL MODAL RENDER');
  console.log(props);
  const closeModal = () => props.delTrigger('del');

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={closeModal}
      show={props.show}>
      <Modal.Header closeButton>
        <Modal.Title>Delete "{props.meetTitle}" ?</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this meeting?!</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-warning" onClick={closeModal}>
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