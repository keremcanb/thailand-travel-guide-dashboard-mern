import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextInput, Button, Icon, Row, Container } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      M.toast({ html: 'Please enter email' });
    } else if (!password) {
      M.toast({ html: 'Please enter password' });
    } else {
      login(email, password);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container className="center mt auth-container">
      <Row>
        <form onSubmit={onSubmit}>
          <TextInput
            id="email"
            label="Email"
            email
            value={email}
            onChange={onChange}
            s={12}
          />
          <TextInput
            id="password"
            label="Password"
            value={password}
            onChange={onChange}
            minLength="6"
            password
            s={12}
          />
          <Row s={12} m={12}>
            <Button
              className="blue darken-2"
              type="submit"
              value="Login"
              variant="contained"
            >
              Login
              <Icon right>login</Icon>
            </Button>
            {/* <p>
              Do not have an account? <Link to="/register">Register</Link>
            </p> */}
          </Row>
        </form>
      </Row>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
