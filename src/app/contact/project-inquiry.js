'use client';

import { useState } from 'react';
import styles from './contact.module.scss';

export default function ProjectInquiry() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  async function submitInquiry(event) {
    event.preventDefault();
    if (status === 'sending' || status === 'received') return;
    const form = event.currentTarget;
    setStatus('sending');
    setMessage('');
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();
      if (!response.ok || !result.received) throw new Error(result.message);
      form.reset();
      setStatus('received');
      setMessage('Thanks for reaching out. We received your project inquiry.');
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Please try again or email us directly.');
    }
  }

  return (
    <form className={styles.form} onSubmit={submitInquiry}>
      <h2>Tell us about your project</h2>
      <div hidden>
        <label>Leave this field empty <input name="website" autoComplete="off" tabIndex={-1} /></label>
      </div>
      <div className={styles.fields}>
        <label>Name <input name="name" autoComplete="name" maxLength={100} required /></label>
        <label>Email <input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
        <label>Organization (optional) <input name="organization" autoComplete="organization" maxLength={120} /></label>
        <label>What can we help with?
          <select name="service" defaultValue="" required>
            <option value="" disabled>Select a service</option>
            <option>Web design and e-commerce</option>
            <option>Applications and internal tools</option>
            <option>Automation and API integrations</option>
            <option>Brand identity</option>
            <option>Multiple services or unsure</option>
          </select>
        </label>
      </div>
      <label>Ideal timeline (optional) <input name="timing" maxLength={120} /></label>
      <label>Project brief
        <textarea name="brief" rows={5} maxLength={1000} required placeholder="What are you trying to achieve? Share any requirements you already know." />
      </label>
      <p>We’ll use your email to follow up about your project.</p>
      <button className="primary" type="submit" disabled={status === 'sending' || status === 'received'}>
        {status === 'sending' ? 'Sending…' : 'Send inquiry'}
      </button>
      {message && <p role={status === 'error' ? 'alert' : 'status'}>{message}</p>}
    </form>
  );
}
