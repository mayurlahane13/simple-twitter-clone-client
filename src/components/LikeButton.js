import React, { useContext, useState, useEffect } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { M_LIKE_POST } from '../queries/post';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function LikeButton({ post: { id, likes, likeCount } }) {
    const { user } = useContext(AuthContext);
    const [liked, setLiked] = useState(false);
    const [likePost, { error }] = useMutation(M_LIKE_POST, {
        variables: {
            postId: id
        },
        onError(err) {

        }
    });
    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]);
    const likeButton = user ? (
        liked ? (
            <Button color='red' onClick={likePost}>
                <Icon name='heart' />
            </Button>
        ) : (
                <Button color='red' onClick={likePost} basic>
                    <Icon name='heart' />
                </Button>
            )
    ) : (
            <Button color='red' onClick={likePost} as={Link} to='/login' basic>
                <Icon name='heart' />
            </Button>
        );
    return (
        <Button as='div' labelPosition='right'>
            {likeButton}
            <Label as='a' basic color='red' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    );
}

export default LikeButton; 