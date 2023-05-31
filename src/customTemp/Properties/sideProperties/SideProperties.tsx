import React, { useEffect, useState } from 'react'
import './SideProperties.scss'
import debounce from 'lodash/debounce'

export function SideProperties({
  selected,
  data,
  setData,
}: {
  selected: any
  data: any
  setData: any
}) {
  const [component, setComponent] = useState<any>()

  const componentUpdate = (key: string, value: any) => {
    console.log(key, value, 'key - value')

    // const UpadtedAttribute = { ...component?.attribute, [key]: value }
    // const UpdatedComponent = { ...component, attribute: UpadtedAttribute }
    // setComponent(UpdatedComponent)
    // const newData = data.filter((item: any) => item.id !== selected)
    // setData([...newData, UpdatedComponent])
  }

  const debouncedComponentUpdate = debounce(componentUpdate, 100)

  useEffect(() => {
    const filteredData = data.filter((item: any) => item.id === selected)
    setComponent(filteredData[0])
  }, [data, selected])
  return (
    <div className="w-100 h-100 border Side-properties-container p-3">
      {component && (
        <>
          <div className="slider-wrapper">
            <label htmlFor="opacity-slider">Opacity</label>
            <input
              type="range"
              min="0"
              max="1"
              id="opacity-slider"
              step="0.01"
              value={component?.attribute?.opacity || 0}
              onChange={(e: any) => debouncedComponentUpdate('opacity', parseInt(e.target.value))}
            />
            <output htmlFor="opacity-slider" id="slider-value">
              {component?.attribute?.opacity || 0}
            </output>
          </div>
          <div className="mt-3">
            x :
            <input
              type="number"
              value={component?.attribute?.left || 0}
              onChange={(e: any) => debouncedComponentUpdate('left', parseInt(e.target.value))}
            />
          </div>
          <div className="mt-2">
            y :
            <input
              type="number"
              value={component?.attribute?.top || 0}
              onChange={(e: any) => debouncedComponentUpdate('top', parseInt(e.target.value))}
            />
          </div>
        </>
      )}
    </div>
  )
}
