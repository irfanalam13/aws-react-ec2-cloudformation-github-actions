import { useState } from 'react';
import { CheckIcon, CopyIcon } from './icons.jsx';

export default function DetailList({ profile }) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard needs HTTPS or localhost; on plain HTTP the mailto link still works.
    }
  }

  return (
    <dl className="details">
      <div className="detail">
        <dt>Roll No.</dt>
        <dd className="numeric">{profile.roll}</dd>
      </div>
      <div className="detail">
        <dt>Year</dt>
        <dd>{profile.year}</dd>
      </div>
      <div className="detail">
        <dt>Department</dt>
        <dd>{profile.department}</dd>
      </div>
      <div className="detail">
        <dt>CGPA</dt>
        <dd>
          <span className="gpa numeric">{profile.cgpa}</span>
        </dd>
      </div>
      <div className="detail detail-wide">
        <dt>Email</dt>
        <dd className="email-row">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          {window.isSecureContext && (
            <button
              type="button"
              className="icon-btn"
              onClick={copyEmail}
              aria-label={copied ? 'Email copied' : 'Copy email'}
              title={copied ? 'Copied' : 'Copy email'}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
          )}
        </dd>
      </div>
    </dl>
  );
}
