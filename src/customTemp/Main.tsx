import { Col, Row } from 'react-bootstrap'
import { Canvas } from './Canvas/Canvas'
import { Components } from './components/Components'
import { HeadProperties } from './Properties/headProperties/HeadProperties'
import { SideProperties } from './Properties/sideProperties/SideProperties'
import React, { useState } from 'react'
import './Main.scss'

export function Main() {
  const [data, setData] = React.useState<any | string>([])

  const [selected, setSelected] = useState()

  // const undo = () => {
  //   if (canvasRef.current && canvasRef.current.history) {
  //     canvasRef.current.history.undo()
  //     canvasRef.current.renderAll()
  //   }
  // }

  // const redo = () => {
  //   if (canvasRef.current && canvasRef.current.history) {
  //     canvasRef.current.history.redo()
  //     canvasRef.current.renderAll()
  //   }
  // }

  const handleComponentDelete = () => {
    const filteredData = data.filter((item: any) => item.id !== selected)
    setData(filteredData)
  }

  return (
    <div className="custom-temp-body">
      <HeadProperties />
      <Row className="m-0 p-0 h-100">
        <Col lg={1} md={1} sm={1} xs={1} className="p-0">
          <Components setData={setData} data={data} onDelete={handleComponentDelete} />
        </Col>
        <Col lg={9} md={9} sm={9} xs={9} className="p-0 overflow-auto">
          <Canvas data={data} setData={setData} setSelected={setSelected} />
        </Col>
        <Col lg={2} md={2} sm={2} xs={2} className="p-0">
          <SideProperties selected={selected} data={data} setData={setData} />
        </Col>
      </Row>
    </div>
  )
}
