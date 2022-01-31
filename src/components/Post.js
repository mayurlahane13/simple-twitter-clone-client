import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/AuthContext';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

function Post({ post: { username, body, createdAt, likeCount, commentCount, id, likes } }) {
    const { user } = useContext(AuthContext);
    return (
        <div className="post">
            <Card>
                <Card.Content>
                    <Image
                        floated='right'
                        size='mini'
                        src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                    />
                    <Card.Header>{username}</Card.Header>
                    <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>{
                /*setting true for getting rid of the ago 
                */}
                    <Card.Description>
                        {body}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <LikeButton post={{ id, likes, likeCount }} />
                    <Button as='div' labelPosition='right'>
                        <Button basic color='green'>
                            <Icon name='comments' />

                        </Button>
                        <Label as='a' basic color='green' pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>
                    {(user && user.username === username) &&
                        <DeleteButton postId={id} />
                    }
                </Card.Content>
            </Card>
        </div >
    );
}

export default Post; 