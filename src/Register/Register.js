import React, { useState } from 'react';
import axios from 'axios';

import './Register.css';

const initForm = {
  username: '',
  password: '',
};

const Register = () => {
  const [form, setForm] = useState(initForm);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const onChange = (key) => ({ target: { value } }) => setForm({
    ...form,
    [key]: value
  });

  const onSave = async () => {
    setIsLoading(true);

    try {
      const { data: { id } } = await axios.post('http://local.mock/api/users', { ...form });
      setUserId(id);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      {
        userId && (
          <h1 data-testid="register-done">Register success!</h1>
        )
      }
      {
        !userId && (
          <>
            <h1 data-testid="register-start">Register</h1>
            <input
              type="text"
              name="username"
              autoComplete="off"
              placeholder="Username"
              value={form.username}
              onChange={onChange('username')}
              data-testid="username-form"
            />
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Password"
              value={form.password}
              onChange={onChange('password')}
              data-testid="password-form"
            />
            <button
              onClick={onSave}
              disabled={isLoading}
              data-testid="save-button"
            >
              Save
            </button>
          </>
        )
      }
    </div>
  );
}

export default Register;
