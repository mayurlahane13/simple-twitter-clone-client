import React, { useState, useContext } from 'react';
import { Form, FormGroup, Button } from 'semantic-ui-react';
import { M_LOGIN_USER } from '../queries/user';
import { useMutation } from '@apollo/client';
import { useForm } from '../util/hooks';
import { AuthContext } from '../context/AuthContext';

function Login(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loginUser, { loading }] = useMutation(M_LOGIN_USER, {
        update(_, { data: { login: userData } }) { //gets triggered after successful mutation 
            context.login(userData); //we destructure result to data and then data to login and get an alias for login as userData 
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });
    function loginUserCallback() {
        loginUser();
    }
    return (
        <div className="l-form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
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
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    type="password"
                    error={errors.password ? true : false}
                    className="r-password"
                />

                <Button positive>Log In</Button>
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

export default Login; 
