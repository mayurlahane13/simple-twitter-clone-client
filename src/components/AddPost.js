import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import { useMutation } from '@apollo/client';
import { M_ADD_POST, Q_GET_POSTS } from '../queries/post';

function AddPost() {
    const { onChange, onSubmit, values } = useForm(addPostCallback, {
        body: ''
    });

    const [postButtonDisabled, setPostButtonDisabled] = useState(true);
    const [addPost, { error }] = useMutation(M_ADD_POST, {
        update(proxy, result) { //gets triggered after successful mutation 
            const data = proxy.readQuery({
                query: Q_GET_POSTS
            }); //this query will access the inmemory cache on the client
            proxy.writeQuery({
                query: Q_GET_POSTS,
                data: {
                    getPosts: [result.data.createPost, ...data.getPosts],
                },
            });
            values.body = '';
        },
        onError(err) {

        },
        variables: values
    });
    function addPostCallback() {
        addPost();
    }
    function onChangeCallback(event) {
        onChange(event);
        setPostButtonDisabled(event.target.value.length > 0 ? false : true);
    }

    return (
        <div className='p-form-container'>
            <Form onSubmit={onSubmit} noValidate autoComplete="off">
                <Form.Field>
                    <h1>Add Post</h1>
                    <Form.Input
                        placeholder='Hi...'
                        name='body'
                        value={values.body}
                        onChange={onChangeCallback}
                        type='text'
                    />
                    <Button positive disabled={postButtonDisabled}>Post</Button>
                </Form.Field>
            </Form>
            {error &&
                <div className="ui error message">
                    <ul className="list">
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            }
        </div>
    );
}

export default AddPost; 