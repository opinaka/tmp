import Form from '@rjsf/bootstrap-4';
import validator from '@rjsf/validator-ajv8';

const schema = {
  title: "Déposer un CV",
  type: "object",
  required: ["nom", "email", "cv"],
  properties: {
    nom: { type: "string", title: "Nom" },
    email: { type: "string", format: "email", title: "Email" },
    cv: { type: "string", title: "Lien vers le CV" }
  }
};

export default function Formulaire() {
  const handleSubmit = ({ formData }) => {
    console.log("Données soumises :", formData);
  };

  return (
    <div>
      <h2>Formulaire JSON Schema</h2>
      <Form schema={schema} validator={validator} onSubmit={handleSubmit} />
    </div>
  );
}