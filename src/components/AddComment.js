import React, { useState, useRef, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { M_ADD_COMMENT } from '../queries/post';


function AddComment({ postId }) {
    const [comment, setComment] = useState('');
    const addCommentInputRef = useRef(null);
    const [addComment, { error }] = useMutation(M_ADD_COMMENT, {
        update(_, result) {
            setComment('');
            addCommentInputRef.current.blur();
        },
        variables: {
            postId: postId,
            body: comment
        },
        onError(err) {

        }
    });

    return (
        <Form onSubmit={addComment}>
            <div className="">
                <input
                    ref={addCommentInputRef}
                    autoComplete="off"
                    className="comment"
                    rows="2"
                    type="text"
                    placeholder="Comment here..."
                    name="comment"
                    value={comment}
                    onChange={event => setComment(event.target.value)} />
            </div>
            <Button
                type="submit"
                className="ui button green"
                disabled={comment.trim() === ''}
                onClick={addComment}
                style={{ margin: "10px 0px" }}>
                Add
            </Button>
        </Form>
    );
}

export default AddComment;