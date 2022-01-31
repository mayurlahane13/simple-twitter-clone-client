import React, { useState, useContext } from 'react';
import { Form, FormGroup, Button } from 'semantic-ui-react';
import { M_REGISTER_USER } from '../queries/user';
import { useMutation } from '@apollo/client';
import { useForm } from '../util/hooks';
import { AuthContext } from '../context/AuthContext';

function Register(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [addUser, { loading }] = useMutation(M_REGISTER_USER, {
        update(_, { data: { register: userData } }) { //gets triggered after successful mutation 
            //console.log(result);
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            //console.log(err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });
    function registerUser() {
        addUser();
    }
    return (
        <div className="r-form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    value={values.username}
                    onChange={onChange}
                    type="text"
                    error={errors.username ? true : false}
                    className="r-username"
                />
                <Form.Input
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    value={values.email}
                    onChange={onChange}
                    type="email"
                    error={errors.email ? true : false}
                    className="r-email"
                />

                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    type="password"
                    error={errors.password ? true : false}
                    className="r-password"
                />
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password..."
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={onChange}
                    type="password"
                    error={errors.password ? true : false}
                    className="r-c-password"
                />
                <Button positive>Register</Button>
            </Form>
            {Object.keys(errors).length > 0 &&
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(error =>
                            <li key={error}>{error}</li>
                        )}
                    </ul>
                </div>
            }

        </div>
    );
}

export default Register; 