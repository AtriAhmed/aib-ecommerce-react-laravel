import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import AddBDTCmp from './AddBDTCmp'

function AddBDTModal(props) {
  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Ajouter Type panne
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <AddBDTCmp/>
    </Modal.Body>
  </Modal>
  )
}

export default AddBDTModal
