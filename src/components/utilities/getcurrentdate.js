import React from "react"

const GetCurrentDate = () => {
  return React.createElement("span", null, new Date().getFullYear())
}

export default GetCurrentDate
