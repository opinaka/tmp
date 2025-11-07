import Form from '@rjsf/bootstrap-4';
import validator from '@rjsf/validator-ajv8';

const schema = {
  title: "Contact",
  type: "object",
  required: ["nom", "email", "message"],
  properties: {
    nom: { type: "string", title: "Nom" },
    email: { type: "string", format: "email", title: "Email" },
    message: { type: "string", title: "Message" }
  }
};

export default function Contact() {
  const handleSubmit = ({ formData }) => {
    fetch('http://localhost:8000/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).then(() => alert('Message envoyé'));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Formulaire de contact</h2>
      <Form schema={schema} validator={validator} onSubmit={handleSubmit} />
    </div>
  );
}