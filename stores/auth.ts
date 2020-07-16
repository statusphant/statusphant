import { useState } from "react";
import { createContainer } from "unstated-next";

function AuthStore(initialValues) {
  const [token, setToken] = useState<string | null>(
    initialValues.token || null
  );
  const [name, setName] = useState<string | null>(initialValues.name || null);
  const [email, setEmail] = useState<string | null>(
    initialValues.email || null
  );
  const [avatar, setAvatar] = useState<string | null>(
    initialValues.avatar || null
  );
  const [app, setApp] = useState<string | null>(initialValues.app || null);

  return {
    token,
    setToken,
    name,
    setName,
    email,
    setEmail,
    avatar,
    setAvatar,
    app,
    setApp,
  };
}

export default createContainer(AuthStore);
