import React, { useContext, useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { AuthContext } from '../context/AuthContext';
import { useMutation } from '@apollo/client';
import { M_DELETE_POST, Q_GET_POSTS, M_DELETE_COMMENT } from '../queries/post';


function DeleteButton({ postId, commentId, deleteCallback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const mutation = commentId ? M_DELETE_COMMENT : M_DELETE_POST;
    const [deletePost, { error }] = useMutation(mutation, {
        update(proxy, result) {
            if (!commentId) {
                const data = proxy.readQuery({
                    query: Q_GET_POSTS
                }); //this query will access the inmemory cache on the client
                const newData = data.getPosts.filter(d => d.id !== postId);
                proxy.writeQuery({
                    query: Q_GET_POSTS,
                    data: {
                        getPosts: newData,
                    },
                });
            }
            if (deleteCallback) {
                deleteCallback();
            }
        },
        onError(err) {
            console.log(err);
        },
        variables: {
            postId,
            commentId
        }
    });

    return (
        <>
            <Button as='div' negative floated='right'
                onClick={() => setConfirmOpen(true)}>
                <Icon name='trash' style={{ margin: 0 }} />
            </Button>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePost}>
            </Confirm>
        </>
    );
}

export default DeleteButton;