import React, { useEffect, useRef } from 'react'
import { fabric } from 'fabric'
import './Canvas.scss'

interface ICustomOptions extends fabric.ICircleOptions {
  id: string
  fontSize?: number
  editable?: boolean
}

export function Canvas({
  data,
  setData,
  setSelected,
}: {
  data: any
  setData: any
  setSelected: any
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current)
    // Function to add objects to the canvas
    const addObjectToCanvas = (item: any) => {
      if (item.type === 'rect') {
        const rectOptions: ICustomOptions = {
          id: item.id,
          left: item.attribute.left,
          top: item.attribute.top,
          width: item.attribute.width,
          height: item.attribute.height,
          fill: item.attribute.fill,
          angle: item?.attribute?.angle,
          opacity: item?.attribute?.opacity,
        }
        const rect = new fabric.Rect(rectOptions)
        canvas.add(rect)
      } else if (item.type === 'circle') {
        const circleOptions: ICustomOptions = {
          id: item.id,
          left: item.attribute.left,
          top: item.attribute.top,
          radius: item.attribute.radius,
          fill: item.attribute.fill,
          scaleX: item?.attribute?.scaleX,
          scaleY: item?.attribute?.scaleY,
          angle: item?.attribute?.angle,
          opacity: item?.attribute?.opacity,
          // opacity: 0.4,
        }
        const circle = new fabric.Circle(circleOptions)
        canvas.add(circle)
      } else if (item.type === 'photo') {
        fabric.Image.fromURL(item.attribute.url, (img: any) => {
          const scaleRatio = Math.min(500 / item.attribute.width, 800 / item.attribute.height)
          const adjustedWidth = item.attribute.width * scaleRatio
          const adjustedHeight = item.attribute.height * scaleRatio
          const imageOptions: ICustomOptions = {
            id: item.id,
            left: item.attribute.left,
            top: item.attribute.top,
            scaleX: item?.attribute?.scaleX,
            scaleY: item?.attribute?.scaleY,
            angle: item?.attribute?.angle,
            opacity: item?.attribute?.opacity,
          }

          // Set the image properties
          img.scaleToWidth(adjustedWidth)
          img.scaleToHeight(adjustedHeight)
          img.set(imageOptions)

          canvas.add(img)
          canvas.renderAll()
        })
      } else if (item.type === 'text') {
        const imageOptions: ICustomOptions = {
          id: item.id,
          left: item.attribute.left,
          top: item.attribute.top,
          fill: item.attribute.fill,
          fontSize: item.attribute.fontSize,
          width: item.attribute.width,
          height: item.attribute.height,
          scaleX: item?.attribute?.scaleX,
          scaleY: item?.attribute?.scaleY,
          angle: item?.attribute?.angle,
          editable: false,
          opacity: item?.attribute?.opacity,
        }
        const text = new fabric.IText(item.attribute.text, imageOptions)
        canvas.add(text)
      } else if (item.type === 'triangle') {
        const triangleOptions: ICustomOptions = {
          id: item.id,
          left: item.attribute.left,
          top: item.attribute.top,
          width: item.attribute.width,
          height: item.attribute.height,
          fill: item.attribute.fill,
          angle: item?.attribute?.angle,
          opacity: item?.attribute?.opacity,
        }
        const triangle = new fabric.Triangle(triangleOptions)
        canvas.add(triangle)
      }
    }

    // Clear the canvas and add objects from the data
    canvas.clear()
    data.forEach(addObjectToCanvas)

    // Event handler for object modification
    function handleObjectModified(event: any) {
      setSelected(null)
      const modifiedObject = event.target
      const { left, top, id } = modifiedObject
      console.log(modifiedObject, 'modifiedObject')

      const scaleX = modifiedObject.scaleX
      const scaleY = modifiedObject.scaleY
      const width = modifiedObject.width * scaleX
      const height = modifiedObject.height * scaleY
      // const modifiedRadius = modifiedObject.radius * Math.max(scaleX, scaleY)
      // Update the state with the modified object
      setData((prevData: any) => {
        const updatedData = prevData.map((item: any) => {
          if (item.id === id) {
            return {
              ...item,
              attribute: {
                ...item.attribute,
                left: left,
                top: top,
                width: width,
                height: height,
                radius: modifiedObject.radius,
                scaleX: scaleX,
                scaleY: scaleY,
                angle: modifiedObject.angle,
                fontSize: modifiedObject.fontSize,
                text: modifiedObject.text,
                opacity: modifiedObject.opacity,
              },
            }
          }
          return item
        })
        return updatedData
      })
    }

    // Register the object:modified event listener
    canvas.on('object:modified', handleObjectModified)

    canvas.on('mouse:down', function (event: any) {
      const clickedObject = event.target
      if (clickedObject instanceof fabric.IText) {
        clickedObject.editable = true
        canvas.setActiveObject(clickedObject)
        canvas.requestRenderAll()
      }
    })
    canvas.on('selection:created', (event) => {
      const selectedObjects: any = event.selected
      if (selectedObjects) {
        setSelected(selectedObjects?.[0]?.id)
      }
    })

    // Handle the selection cleared event
    canvas.on('selection:cleared', () => {
      setSelected(null)
    })

    // Clean up the event listener and dispose of the canvas
    return () => {
      canvas.off('object:modified', handleObjectModified)
      canvas.dispose()
    }
  }, [data, setData])

  return (
    <div className="d-flex align-item-center flex-column justify-content-center">
      <div className="d-flex align-item-center justify-content-between mt-5 mx-5">
        <div className="fw-bold">Page 1 - Untitled</div>
        <div className="d-flex align-item-center">
          <div className="mx-1 border p-1">ADD PAGE</div>
          <div className="mx-1 border p-1">DUPLICATE PAGE</div>
        </div>
      </div>
      <canvas ref={canvasRef} width={700} height={400} className="mx-4" />
    </div>
  )
}
