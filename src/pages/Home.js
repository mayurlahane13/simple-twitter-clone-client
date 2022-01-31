import React, { useEffect, useState, useContext } from 'react';
import { Grid, Transition } from 'semantic-ui-react'
import { Q_GET_POSTS } from '../queries/post';
import { useQuery } from '@apollo/client';
import Post from '../components/Post';
import { AuthContext } from '../context/AuthContext';
import AddPost from '../components/AddPost';

function Home() {
    const { user } = useContext(AuthContext);
    const { loading, data: { getPosts: posts } = {} } = useQuery(Q_GET_POSTS);
    return (
        <Grid columns={3}>
            <Grid.Row>
                <h1 className="posts-h1">Recent Posts</h1>
            </Grid.Row>
            {user &&
                <Grid.Column>
                    <AddPost></AddPost>
                </Grid.Column>}
            <Grid.Row>
                {

                    loading ? (<h1>Loading posts...</h1>) :
                        <Transition.Group> {
                            posts && posts.map(post => (
                                <Grid.Column key={post.id}>
                                    <Post post={post} />
                                </Grid.Column>

                            ))}
                        </Transition.Group>
                }
            </Grid.Row>
        </Grid>
    );
}
export default Home; 
