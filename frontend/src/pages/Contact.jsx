import Form from '@rjsf/bootstrap-4';
import validator from '@rjsf/validator-ajv8';
import { useEffect, useState } from 'react';

export default function Contact() {
  const [schema, setSchema] = useState(null);

  useEffect(() => {
    fetch('/schemas/contact.schema.json')
      .then(res => res.json())
      .then(setSchema);
  }, []);

  const handleSubmit = ({ formData }) => {
    fetch('http://localhost:8000/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).then(() => alert('Message envoyé'));
  };

  return (
    <div className="page-content">
      <h2 className="mb-3">Formulaire de contact</h2>
      {schema ? (
        <Form schema={schema} validator={validator} onSubmit={handleSubmit} />
      ) : (
        <p>Chargement du formulaire…</p>
      )}
    </div>
  );
}
