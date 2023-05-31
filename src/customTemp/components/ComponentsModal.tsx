/* eslint-disable @typescript-eslint/no-redeclare */
import { useFormik } from 'formik'
import React from 'react'
import { Button, Modal, ModalBody } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import { BsFillSquareFill, BsFillTriangleFill } from 'react-icons/bs'
import { FaCircle } from 'react-icons/fa'
import * as Yup from 'yup'
import './Components.scss'

export function ComponentsModal({
  show,
  component,
  onClose,
  onSubmit,
  data,
}: {
  show: boolean
  component: string
  onClose: any
  onSubmit: any
  data: any
}) {
  const modalSchema = Yup.object().shape({
    text: component === 'text' ? Yup.string().required('Text is required') : Yup.string(),
    url:
      component === 'photo'
        ? Yup.string().required(`Image URL is required`).url('Invalid image URL')
        : Yup.string(),
  })

  const formik = useFormik({
    initialValues: {
      text: '',
      url: '',
    },
    validationSchema: modalSchema,
    onSubmit: (fields: any, { resetForm }) => {
      switch (component) {
        case 'photo':
          const Irequest = {
            id: 'photo' + (data.length + 1),
            type: 'photo',
            attribute: {
              url: fields.url,
              width: 50,
              height: 50,
              top: 50,
              left: 50,
              scaleX: 0.2,
              scaleY: 0.2,
              angle: 0,
            },
          }
          onSubmit(Irequest)
          break
        case 'text':
          const Trequest = {
            id: 'text' + (data.length + 1),
            type: 'text',
            attribute: {
              text: fields.text,
              left: 100,
              top: 100,
              fontSize: 20,
              fill: 'black',
              width: 100,
              height: 80,
              scaleX: 1,
              scaleY: 1,
              angle: 0,
            },
          }
          onSubmit(Trequest)
          break
      }
      resetForm()
    },
  })

  const HandleShapesClick = (shape: string) => {
    switch (shape) {
      case 'circle':
        const Crequest = {
          id: 'circle' + (data.length + 1),
          type: 'circle',
          attribute: {
            left: 20,
            top: 10,
            width: 200,
            height: 100,
            fill: 'black',
            radius: 50,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
          },
        }
        onSubmit(Crequest)
        break
      case 'rect':
        const Rrequest = {
          id: 'rect' + (data.length + 1),
          type: 'rect',
          attribute: { left: 100, top: 100, width: 100, height: 100, fill: 'black', angle: 0 },
        }
        onSubmit(Rrequest)
        break
      case 'triangle':
        const Trequest = {
          id: 'triangle' + (data.length + 1),
          type: 'triangle',
          attribute: { left: 100, top: 100, width: 100, height: 100, fill: 'black', angle: 0 },
        }

        onSubmit(Trequest)
        break
    }
  }

  const { handleSubmit, values, errors, getFieldProps, touched } = formik

  return (
    <Modal show={show} onHide={onClose} centered>
      <ModalHeader className="border-0 fs-4 pb-0">
        {component === 'photo' ? `Add Image` : component === 'text' ? 'Add Text' : ''}
      </ModalHeader>
      <ModalBody className="pt-0">
        {component !== 'shapes' ? (
          <>
            {component === 'photo' ? 'Copy and paste link of the image:' : 'Enter the Text :'}
            <form noValidate onSubmit={handleSubmit}>
              <div className="form-group  position-relative">
                {component === 'photo' ? (
                  <>
                    <input
                      type="url"
                      className="form-control mt-4"
                      placeholder="http://myimageurl.com"
                      {...getFieldProps('url')}
                    />
                    <small className="text-danger mb-2 d-block">
                      {touched.url && errors.url ? errors.url : null}
                    </small>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      className="form-control mt-4"
                      placeholder="Sample Text ..."
                      {...getFieldProps('text')}
                    />
                    <small className="text-danger mb-2 d-block">
                      {touched.text && errors.text ? errors.text : null}
                    </small>
                  </>
                )}
                <div className="float-end me-3 mt-2">
                  <Button className="mx-2" variant="btn" onClick={() => onClose()}>
                    CANCEL
                  </Button>
                  <Button className="mx-2" type="submit">
                    OK
                  </Button>
                </div>
              </div>
            </form>
          </>
        ) : (
          <div>
            <div>Add Shapes</div>
            <div className="mt-3 d-flex align-items-center justify-content-center">
              <div
                className="text-center border border-top-0 border-bottom-0 border-start-0 d-inline px-4"
                role="button"
                onClick={() => HandleShapesClick('circle')}
              >
                <FaCircle className=" fs-1 component-shape-icons " />
                <div>CIRCLE</div>
              </div>
              <div
                className="text-center border border-top-0 border-bottom-0 border-start-0 d-inline px-4"
                role="button"
                onClick={() => HandleShapesClick('rect')}
              >
                <BsFillSquareFill className="fs-1 component-shape-icons" />
                <div>SQUARE</div>
              </div>
              <div
                className="d-inline px-4 text-center"
                role="button"
                onClick={() => HandleShapesClick('triangle')}
              >
                <BsFillTriangleFill className="fs-1 component-shape-icons" />
                <div>TRIANGLE</div>
              </div>
            </div>
          </div>
        )}
      </ModalBody>
    </Modal>
  )
}
