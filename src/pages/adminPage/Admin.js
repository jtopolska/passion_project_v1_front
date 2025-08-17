
import { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, fetchMeta, fetchPosts, updatePost, deletePostById } from '../../app/redux/slices/postSlice';

export const Admin = () => {
  const dispatch = useDispatch();
  const { categories, tags, authors, posts } = useSelector(state => state.post);

  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [author, setAuthor] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);


  useEffect(() => {
    dispatch(fetchMeta());
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleEditorChange = (content, editor) => {
         setContent(content);
         console.log('content2', content)
  };

  const handleSelectPost = (post) => {
    setSelectedPost(post);
    setContent(post.content);
    setCategory(post.category || '');
    setNewCategory('');
    setSelectedTags(post.tags || []);
    setNewTag('');
    setAuthor(post.author || '');
    setNewAuthor('');
    setPublishDate(post.publishDate ? post.publishDate.slice(0, 10) : '');
  };

  const handleSubmit = () => {
    const postData = {
      content,
      category: newCategory || category,
      tags: newTag ? [...selectedTags, newTag] : selectedTags,
      author: newAuthor || author,
      publishDate
    };
    
    if (selectedPost) {
      // Обновление поста
      dispatch(updatePost({ id: selectedPost._id, data: postData }));
    } else {
      // Создание нового поста
      dispatch(addPost(postData));
    }

    setContent('');
    setCategory('');
    setNewCategory('');
    setSelectedTags([]);
    setNewTag('');
    setAuthor('');
    setNewAuthor('');
    setPublishDate('');
  };

  const handleDelete = async (id) => {
      await dispatch(deletePostById(id));
  };

  return (
    <div>
      <h1>Создать пост</h1>

      <div className="editor-container">
        <Editor
            apiKey='13nbiowfc83axeo3k7q1rt352i92l3kqc0hvdivpeo8g5ob9'
            init={{
                plugins: [
                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount'
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
                ],
                automatic_uploads: true,
                file_picker_types: 'image',
                images_upload_url: 'http://localhost:7000/uploads/images',
                uploadcare_public_key: '9f308ee449f5f650cf07',
                images_upload_handler: async (blobInfo, progress) => {
                  const formData = new FormData();
                  formData.append('image', blobInfo.blob(), blobInfo.filename());

                  const res = await fetch('http://localhost:7000/uploads/images', {
                    method: 'POST',
                    body: formData,
                  });
                  console.log('res 1', res)

                  if (!res.ok) throw new Error('Upload failed');
                  const data = await res.json();
                  // TinyMCE ожидает { location: 'https://…/file.jpg' }
                  return data.location;
                }
              }
            }
            initialValue="Welcome to TinyMCE!"
            value={ content }
            onEditorChange={ handleEditorChange }
            />
      </div>

      <h3>Категория</h3>
      <select onChange={e => setCategory(e.target.value)} value={category}>
        <option value="">Выбрать</option>
        {categories.map(cat => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
      </select>
      <input placeholder="или создать новую" value={newCategory} onChange={e => setNewCategory(e.target.value)} />

      <h3>Теги</h3>
      <select multiple onChange={e => setSelectedTags([...e.target.selectedOptions].map(o => o.value))}>
        {tags.map(tag => <option key={tag._id} value={tag.name}>{tag.name}</option>)}
      </select>
      <input placeholder="или создать новый тег" value={newTag} onChange={e => setNewTag(e.target.value)} />

      <h3>Автор</h3>
      <select onChange={e => setAuthor(e.target.value)} value={author}>
        <option value="">Выбрать</option>
        {authors.map(a => <option key={a._id} value={a.name}>{a.name}</option>)}
      </select>
      <input placeholder="или создать нового автора" value={newAuthor} onChange={e => setNewAuthor(e.target.value)} />

      <h3>Дата публикации</h3>
      <input type="date" value={publishDate} onChange={e => setPublishDate(e.target.value)} />

      <button onClick={handleSubmit}>Опубликовать</button>
      {selectedPost && (
        <button onClick={() => setSelectedPost(null)}>Очистить форму</button>
      )}

      <p>Posts</p>
        {posts.length > 0 && posts.map(item => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(item.content, 'text/html');
          const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');


          return (
            <div key={ item._id }>
              {Array.from(headings).map((heading, index) => (
                <div key={ index }>
                  <div>{ heading.textContent }</div>
                  <button onClick={ () => handleSelectPost(item) }>Редактировать</button>
                  <button onClick={ () => handleDelete(item._id) }>
                    🗑️ Удалить
                  </button>
                </div>
              ))})
            </div>
          );
        })}
    </div>
  );
};























// import { useRef, useState,useEffect } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addPost, getPostsArray, getAllPosts } from '../../app/redux/slices/slices';


// export const Admin = () => {
//     const dispatch = useDispatch();
//      const postsArray = useSelector(getPostsArray);
//      console.log('postsArray adminPage', postsArray);



//     const [content, setContent] = useState("");
//     console.log('content1', content)

//     const handleEditorChange = (content, editor) => {
//         setContent(content);
//         console.log('content2', content)
//     };

//     const handleContent = () => {
//         console.log('content3', content)
//         dispatch(addPost(content))
//     }

//     useEffect(() => {
//         dispatch(getAllPosts());
//     }, [dispatch]);


//     return (
//         <>
//             <h1>
//                 Admin
//             </h1>
//             <Editor
//                 apiKey='13nbiowfc83axeo3k7q1rt352i92l3kqc0hvdivpeo8g5ob9'
//                 init={{
//                     plugins: [
//                     'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount'
//                     ],
//                     toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
//                     tinycomments_mode: 'embedded',
//                     tinycomments_author: 'Author name',
//                     mergetags_list: [
//                     { value: 'First.Name', title: 'First Name' },
//                     { value: 'Email', title: 'Email' },
//                     ],
//                     ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
//                     uploadcare_public_key: '9f308ee449f5f650cf07',
//                 }}
//                 initialValue="Welcome to TinyMCE!"
//                 value={ content }
//                 onEditorChange={ handleEditorChange }
//                 />
//             <button onClick={ handleContent }>
//                 POST
//             </button>
//         </>
//     );
// }