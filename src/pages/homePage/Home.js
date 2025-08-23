import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../app/redux/slices/postSlice';

export const Home = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.post.posts);
    console.log('posts', posts)
    console.log('posts[0]', posts[0])


    useEffect(() => {
        dispatch(getAllPosts());
      }, [dispatch]);


    return (
        <div>
            {posts.length > 0 && (
                <div dangerouslySetInnerHTML={{ __html: posts[0].content }} />
            )}
        </div>
    );
}