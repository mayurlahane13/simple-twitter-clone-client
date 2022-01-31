import React, { useContext } from 'react';
import { Grid, Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { Q_GET_POST } from '../queries/post';
import moment from 'moment';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/AuthContext';
import DeleteButton from '../components/DeleteButton';
import Comment from '../components/Comment';
import AddComment from '../components/AddComment';

function SinglePagePost(props) {
    const { user } = useContext(AuthContext);
    const postId = props.match.params.postId;
    const { data } = useQuery(Q_GET_POST, {
        variables: {
            postId
        },
        onError(err) {
            console.log(err);
        }
    });

    function deleteCallback() {
        props.history.push('/');
    }
    let singlePostPage;
    if (!data) {
        singlePostPage = <div className="single-post-div"><h3>Loading post....</h3></div>;
    } else {
        const { id, body, username, createdAt, comments, likes, likeCount, commentCount } = data.getPost;
        singlePostPage = (
            <div className="single-post-div">
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                                size='small' float="right" />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>{username}</Card.Header>
                                    <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                                    <Card.Description>{body}</Card.Description>
                                </Card.Content>
                                <hr />
                                <Card.Content extra>
                                    <LikeButton post={{ id, likes, likeCount }}></LikeButton>
                                    <Button
                                        as='div'
                                        labelPosition='right'>
                                        <Button basic color='green'>
                                            <Icon name='comments' />
                                        </Button>
                                        <Label basic color='green' pointing='left'>
                                            {commentCount}
                                        </Label>
                                    </Button>
                                    {(user && user.username === username) &&
                                        <DeleteButton deleteCallback={deleteCallback} postId={id} />
                                    }
                                </Card.Content>
                            </Card>
                            {user && <AddComment postId={postId} />}
                            {comments.map(comment =>
                                <Comment key={comment.id} comment={comment} postId={postId} />
                            )}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
    return singlePostPage;
}

export default SinglePagePost; 