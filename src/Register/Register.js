import React, { useState, memo } from 'react';
import axios from 'axios';

import './Register.css';


const initForm = {
  username: '',
  password: '',
};


const Input = memo(({
  name,
  type,
  onChange,
  value,
}) => (
  <input
    type={type}
    name={name}
    autoComplete="off"
    placeholder={name}
    value={value}
    onChange={onChange}
    data-testid={`${name}-form`}
  />
));


const Register = memo(() => {
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
            <Input
              name="username"
              type="text"
              onChange={onChange('username')}
              value={form.username}
            />
            <Input
              name="password"
              type="password"
              onChange={onChange('password')}
              value={form.password}
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
});

export default Register;
