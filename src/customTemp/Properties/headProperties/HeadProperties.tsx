import React from 'react'

export function HeadProperties() {
  return (
    <div className="w-100 bg-primary text-light d-flex justify-content-between px-3">
      <div className="d-flex align-items-center">
        <div className="m-2 fw-bold">File</div>
        <div className="m-2 fw-bold">Resize</div>
        <div className="m-2 border border-end-0 border-top-0 border-bottom-0 ps-2">undo</div>
        <div className="m-2 border border-start-0 border-top-0 border-bottom-0 pe-2">Re-do</div>
      </div>
      <div className="d-flex align-items-center m-2">
        <div className="mx-2">Untitled Design </div>
        <button className="mx-2 btn btn-success">SAVE</button>
      </div>
    </div>
  )
}
