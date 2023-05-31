import React, { Ref, useState } from 'react'
import { BsCircleFill, BsFileTextFill, BsSquareFill } from 'react-icons/bs'
import { FaImage, FaTrash } from 'react-icons/fa'
import './Components.scss'
// import { ReactComponent as Shapes } from '../../../assets/icons/shapesIcon.svg'
// import { ReactComponent as Text } from '../../../assets/icons/textIcon.svg'
// import { ReactComponent as Photo } from '../../../assets/icons/photoIcon.svg'
// import { ReactComponent as Badge } from '../../../assets/icons/badgeIcon.svg'
import { ComponentsModal } from './ComponentsModal'

export function Components({
  data,
  setData,
  onDelete,
}: {
  data: any
  setData: any
  onDelete: any
}) {
  const [selectedComponent, setSelectedComponent] = useState('')
  const [modal, setModal] = useState(false)
  const handleSelect = (value: string) => {
    setSelectedComponent(value)
    setModal(true)
  }

  const handleSubmit = (values: any) => {
    setData([...data, values])
    setModal(false)
  }
  return (
    <div className="h-100 border text-dark text-center pt-4 d-flex flex-column justify-content-between align-items-center components-container">
      <div className="w-100 px-3 pt-3 d-flex justify-content-center flex-column align-items-center">
        <div className="mb-4" role="button" onClick={() => handleSelect('text')}>
          {/* <Text className="w-100" /> */}
          <small className="fw-bold w-100">Text</small>
        </div>
        <div className="mb-4" role="button" onClick={() => handleSelect('photo')}>
          {/* <Photo /> */}
          <small className="fw-bold">Photos</small>
        </div>
        <div className="mb-4" role="button" onClick={() => handleSelect('shapes')}>
          {/* <Shapes /> */}
          <small className="fw-bold">Shapes</small>
        </div>
        <div>
          {/* <Badge /> */}
          <small className="fw-bold">Brand</small>
        </div>
      </div>
      <div
        className="border w-100 border-start-0 py-2 components-trash-button"
        role="button"
        onClick={() => onDelete()}
      >
        <FaTrash />
      </div>
      {modal && (
        <ComponentsModal
          show={modal}
          component={selectedComponent}
          onClose={() => {
            setModal(false)
          }}
          onSubmit={handleSubmit}
          data={data}
        />
      )}
    </div>
  )
}
