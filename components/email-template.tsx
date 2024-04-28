import * as React from "react";

interface EmailTemplateProps {
  link: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  link,
}) => (
  <div>
    <h1>¡Restablece tu contraseña!</h1>
    <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
    <p>{link}</p>
  </div>
);

export default EmailTemplate;
