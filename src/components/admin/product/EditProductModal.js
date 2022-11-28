import { Modal } from 'react-bootstrap'
import React from 'react'
import EditProduct from './EditProduct'

export default function EditProductModal(props) {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modifier Produit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <EditProduct toedit={props.toedit}/>
        </Modal.Body>
      </Modal>
      )
}
