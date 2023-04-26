import { useState } from 'react';
import useAuth  from './Auth';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { handleRegister, error, setError } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }
    handleRegister(name, email, contact, address, password);
  };

  return (
    // <div>
    //   <h1>Register</h1>
    //   {error && <div>{error}</div>}
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor="name">Name:</label>
    //       <input
    //         type="text"
    //         id="name"
    //         value={name}
    //         onChange={(event) => setName(event.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="email">Email:</label>
    //       <input
    //         type="email"
    //         id="email"
    //         value={email}
    //         onChange={(event) => setEmail(event.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="contact">Contact:</label>
    //       <input
    //         type="text"
    //         id="contact"
    //         value={contact}
    //         onChange={(event) => setContact(event.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="address">Address:</label>
    //       <input
    //         type="text"
    //         id="address"
    //         value={address}
    //         onChange={(event) => setAddress(event.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password:</label>
    //       <input
    //         type="password"
    //         id="password"
    //         value={password}
    //         onChange={(event) => setPassword(event.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="password-confirmation">Confirm Password:</label>
    //       <input
    //         type="password"
    //         id="password-confirmation"
    //         value={passwordConfirmation}
    //         onChange={(event) => setPasswordConfirmation(event.target.value)}
    //       />
    //     </div>
    //     <button type="submit">Register</button>
    //   </form>
    // </div>

    <div className="container">
  <h1 className='row justify-content-center'>Register</h1>
  {error && <div className="alert alert-danger">{error}</div>}
  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name:</label>
      <input
        type="text"
        id="name"
        className="form-control"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email:</label>
      <input
        type="email"
        id="email"
        className="form-control"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="contact" className="form-label">Contact:</label>
      <input
        type="text"
        id="contact"
        className="form-control"
        value={contact}
        onChange={(event) => setContact(event.target.value)}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="address" className="form-label">Address:</label>
      <input
        type="text"
        id="address"
        className="form-control"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password:</label>
      <input
        type="password"
        id="password"
        className="form-control"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="password-confirmation" className="form-label">Confirm Password:</label>
      <input
        type="password"
        id="password-confirmation"
        className="form-control"
        value={passwordConfirmation}
        onChange={(event) => setPasswordConfirmation(event.target.value)}
      />
    </div>
    <button type="submit" className="btn btn-primary">Register</button>
  </form>
</div>

  );
};

export default Register;


