import { Modal } from 'react-bootstrap'
import React from 'react'
import EditCategoryCmp from './EditCategoryCmp'

export default function EditCategoryModal(props) {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modifier Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <EditCategoryCmp toedit={props.toedit}/>
        </Modal.Body>
      </Modal>
      )
}
