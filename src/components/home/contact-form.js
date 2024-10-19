'use client'
import React from "react"
import { navigate } from "gatsby-link"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

export default function Contact() {
  const [state, setState] = React.useState({})

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error))
  }

  return (
    <>
      <form
        className="contact"
        name="contact"
        method="post"
        action="/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <p hidden>
          <label>
            Don’t fill this out:{" "}
            <input name="bot-field" onChange={handleChange} />
          </label>
        </p>
        <div className="grid-container col-2 col-gap-5 small-col-1">
          <input
            name="name"
            type="text"
            placeholder="name"
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
        </div>
        <textarea
          className="margin-top-4"
          name="message"
          type="text"
          placeholder="message"
          onChange={handleChange}
        />

        <div data-netlify-recaptcha="true"></div>
        <button type="submit" className="primary margin-top-4">
          Submit
        </button>
      </form>
    </>
  )
}
