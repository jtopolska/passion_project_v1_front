import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';



export const Admin = () => {
    // const editorRef = useRef(null);
    // const log = () => {
    //     if (editorRef.current) {
    //     console.log('editorRef.current.getContent()', editorRef.current.getContent());
    //     }
    // };
    // console.log('LOG', log)

    const [content, setContent] = useState("");
    console.log('content1', content)

    const handleEditorChange = (content, editor) => {
        setContent(content);
        console.log('content2', content)
    };

    const handleContent = () => {

    }


    return (
        <>
            <h1>
                Admin
            </h1>
            <Editor
                apiKey='13nbiowfc83axeo3k7q1rt352i92l3kqc0hvdivpeo8g5ob9'
                init={{
                    plugins: [
                    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    mergetags_list: [
                    { value: 'First.Name', title: 'First Name' },
                    { value: 'Email', title: 'Email' },
                    ],
                    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                    uploadcare_public_key: '9f308ee449f5f650cf07',
                }}
                initialValue="Welcome to TinyMCE!"
                value={ content }
                onEditorChange={ handleEditorChange }
                />
            <button onEditorChange={ handleContent }>
                POST
            </button>
        </>
    );
}