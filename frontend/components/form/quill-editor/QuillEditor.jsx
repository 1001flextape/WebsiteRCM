'use client';

import React, { useEffect, useRef } from 'react';
import 'quill/dist/quill.snow.css'; // Quill editor styles
import Quill from 'quill';

function QuillEditor({ onContentChange, initialValue }) {
  const editorRef = useRef(null);
  const quillInstance = useRef(null); // Ref to store the Quill instance
  const hasSetInitialValue = useRef(false); // Ref to track if the initial value has been set

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }], // Add ordered and unordered lists
            ['code-block'],
          ],
        },
        placeholder: 'Start writing...',
        theme: 'snow', // or 'bubble'
      });

      // Listen for content changes
      quillInstance.current.on('text-change', () => {
        const content = quillInstance.current.root.innerHTML;
        onContentChange(content); // Pass the content back to the parent
      });
    }

    // Set initial value only once after the editor is initialized
    if (quillInstance.current && initialValue && !hasSetInitialValue.current) {
      quillInstance.current.root.innerHTML = initialValue;
      hasSetInitialValue.current = true; // Mark that initial value has been set
    }
  }, [onContentChange, initialValue]);

  return <div ref={editorRef} style={{ height: '200px' }} />;
}

export default QuillEditor;
