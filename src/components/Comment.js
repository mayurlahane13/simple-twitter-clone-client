import React, { useContext } from 'react';
import { Card } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/AuthContext';
import DeleteButton from './DeleteButton';

function Comment({ comment: { id, username, createdAt, body }, postId }) {
    const { user } = useContext(AuthContext);
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            {user && username === user.username &&
                <Card.Content extra>
                    <DeleteButton postId={postId} commentId={id} />
                </Card.Content>
            }
        </Card >
    );
}

export default Comment; 