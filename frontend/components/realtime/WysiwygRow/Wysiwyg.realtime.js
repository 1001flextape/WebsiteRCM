'use client';

import React, { useRef, useEffect, useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AvatarGroup, ListItem, ButtonBase } from '@mui/material';
import * as Y from 'yjs';
import { QuillBinding } from 'y-quill';
import { initSocket } from '@/utils/realtime/socket';
import QuillCursors from 'quill-cursors';
import Quill from 'quill';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import UserAvatar from '@/components/chip/user.avatar';
import WhoEditThisInputModal from './modal/WhoEditThisInput.modal';

// Register the quill-cursors module
Quill.register('modules/cursors', QuillCursors);


function RealTimeWysiwyg({ onUpdate, onHtmlUpdate, onDeltaUpdate, onChangeByUser, ...props }) {
  const quillRef = useRef(null);
  const { idChip, applyTextFieldSelectionBuffer } = useContext(AdminLayoutContext)

  const [isModalOpened, setIsModalOpened] = useState(false)

  const [orderNumber, setOrderNumber] = useState(0)

  const quillModules = {
    cursors: true,
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['code-block'],
      [{ 'align': [] }],
    ],
    // keyboard: {
    //   bindings: {
    //     shift_enter: {
    //       key: 13,
    //       shiftKey: true,
    //       handler: (range, ctx) => {
    //         console.log(range, ctx); // if you want to see the output of the binding
    //         this.editor.insertText(range.index, '\n');
    //       }
    //     },
    //     enter: {
    //       key: 13,
    //       handler: () => { // submit form }
    //       }
    //     }
    //   }
    // }
  }

  const applyOrder = ({ order }) => {
    if (order > orderNumber) {
      setOrderNumber(order)
    }
  }

  useEffect(() => {
    if (!idChip.id) {
      return;
    }

    // Initialize Yjs document
    const ydoc = new Y.Doc();
    let binding;

    // Initialize socket connection
    const socket = initSocket();

    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      binding = new QuillBinding(ydoc.getText('quill'), quill);

      //init loading
      // console.log('loading selection', props, props.data, props.data.selections ||
      //   "not here", props.data.textValue)

      if (props.data?.order) {
        applyOrder({
          order: props.data.order
        })
      }

      if (props.data?.textValue) {

        // Decode base64 string back to a buffer
        const decodedBuffer = Buffer.from(props.data.textValue, 'base64');

        // Convert buffer to Uint8Array
        const updateArray = new Uint8Array(decodedBuffer.buffer);

        // Apply this to the Y.Doc
        Y.applyUpdate(ydoc, updateArray);

        if (onHtmlUpdate) {
          onHtmlUpdate(quill.root.innerHTML)
        }

        if (onDeltaUpdate) {
          onDeltaUpdate(quill.getContents())
        }

        if (onUpdate) {
          onUpdate({
            delta: quill.getContents(),
            html: quill.root.innerHTML,
          })
        }

        if (onChangeByUser) {
          onChangeByUser(quill.root.innerHTML)
        }
      }

      // console.log('realtime props', props)
      if (props.data?.selections) {
        const cursors = quill.getModule('cursors');


        for (let i = 0; i < props.data.selections.length; i++) {
          const { userId, username, userColor, range, order } = props.data.selections[i];
          if (idChip.id !== userId) {

            if (order) {
              applyOrder({
                order,
              })
            }
            // Check if the cursor for this user already exists
            if (!cursors.cursors[userId]) {
              // Create a new cursor for the user
              cursors.createCursor(userId, username, userColor);
            }

            // Move the user's cursor to the new position
            cursors.moveCursor(userId, range)
          }
        }
      }





      //Buffer text field, then load text field


      //Buffer selection, then load selection














      // Create a binding between Quill and Yjs

      quill.on('text-change', (delta, oldDelta, source) => {
        if (source === 'user') {
          const updatedYdoc = Y.encodeStateAsUpdate(ydoc)

          // Yjs and Quill are already synced by the binding.
          // Emit the Yjs update to the server.
          socket.emit('server-samedoc-wysiwyg-update', {
            entity: props.entity,
            name: props.data.name,
            ydoc: updatedYdoc,
          });

          socket.emit('server-samedoc-wysiwyg-readable-text-update', {
            entity: props.entity,
            name: props.data.name,
            htmlValue: quill.root.innerHTML,
          })


          if (onHtmlUpdate) {
            onHtmlUpdate(quill.root.innerHTML)
          }

          if (onDeltaUpdate) {
            onDeltaUpdate(quill.getContents())
          }

          if (onUpdate) {
            onUpdate({
              delta: quill.getContents(),
              html: quill.root.innerHTML,
            })
          }

          if (onChangeByUser) {
            onChangeByUser(quill.root.innerHTML)
          }

          if (!props?.data?.usersWhoChangedValue) {
            props = props || {}
            props.data = props.data || {}
            props.data.usersWhoChangedValue = props.data.usersWhoChangedValue || [];
          }

          let hasId = false;

          for (let i = 0; i < props.data.usersWhoChangedValue.length; i++) {
            const user = props.data.usersWhoChangedValue[i];

            if (user.id === idChip.id) {
              hasId = true;
              break;
            }
          }

          if (!hasId) {
            props.data.usersWhoChangedValue.push(idChip)
          }
        }
      });

      socket.on('samedoc-wysiwyg-userChangeInput-update', data => {
        if (props.entity === data.entity && props.data.name === data.name) {

          if (!props?.data?.usersWhoChangedValue) {
            props = props || {}
            props.data = props.data || {}
            props.data.usersWhoChangedValue = props.data.usersWhoChangedValue || [];
          }

          let hasId = false;

          for (let i = 0; i < props.data.usersWhoChangedValue.length; i++) {
            const user = props.data.usersWhoChangedValue[i];

            if (user.id === data.user.userId) {
              hasId = true;
              break;
            }
          }

          if (!hasId) {
            props.data.usersWhoChangedValue.push(data.user)
          }
        }
      })

      // Listen for Yjs updates from the server
      socket.on('samedoc-wysiwyg-update', (data) => {
        try {
          if (props.entity === data.entity && props.data.name === data.name) {
            // console.log('samedoc-yjs-update', data)
            Y.applyUpdate(ydoc, new Uint8Array(data.ydoc));

            if (onHtmlUpdate) {
              onHtmlUpdate(quill.root.innerHTML)
            }

            if (onDeltaUpdate) {
              onDeltaUpdate(quill.getContents())
            }

            if (onUpdate) {
              onUpdate({
                delta: quill.getContents(),
                html: quill.root.innerHTML,
              })
            }
          }
        } catch (error) {
          console.error('Error applying Y.js update:', error);
        }
      });


      if (props?.data) {

        applyTextFieldSelectionBuffer({
          entity: props.entity,
          name: props.data.name,
          order: orderNumber,
          cb: (update) => {
            const quill = quillRef.current.getEditor();
            const cursors = quill.getModule('cursors');


            // Check if the cursor for this user already exists
            if (!cursors.cursors[update.userId]) {
              // Create a new cursor for the user
              cursors.createCursor(update.userId, update.username, update.userColor);
            }

            // Move the user's cursor to the new position
            cursors.moveCursor(update.userId, update.range)

          }

        }).then((order) => {
          setOrderNumber(order)
          quill.on('selection-change', (range, oldRange, source) => {
            if (source === 'user' || source === "api") {
              socket.emit('server-samedoc-wysiwyg-selection-change', {
                range,
                entity: props.entity,
                name: props.data.name,
              });
            }
          });
          // Listen for selection changes from other clients
          socket.on('samedoc-wysiwyg-selection-change', (data) => {

            if (props.entity === data.entity && props.data.name === data.name) {
              const quill = quillRef.current.getEditor();
              const cursors = quill.getModule('cursors');


              // Check if the cursor for this user already exists
              if (!cursors.cursors[data.userId]) {
                // Create a new cursor for the user
                cursors.createCursor(data.userId, data.username, data.userColor);
              }

              // Move the user's cursor to the new position
              cursors.moveCursor(data.userId, data.range)
            }
          })
        });



      }

    }


    return () => {
      binding.destroy();  // Clean up the binding
      socket.off('samedoc-wysiwyg-userChangeInput-update')
      socket.off('samedoc-wysiwyg-update');
      socket.off('samedoc-wysiwyg-userChangeInput-update');
      socket.off('samedoc-wysiwyg-selection-change')
    };

  }, [idChip]);


  return (
    <ListItem>
      <div style={{ width: "100%" }}>
        <p>{props.label}</p>
        <ReactQuill ref={quillRef} theme="snow" modules={quillModules} style={{ width: "100%" }} />
        {props.data?.usersWhoChangedValue?.length > 0 && (
          <ButtonBase
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px', // Adjust for button feel
              padding: '5px', // Adjust padding if needed
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Optional: Add a hover effect
              },
              mt: "7px",
              float: "right",
            }}
            onClick={() => {
              setIsModalOpened(true)
            }}
          >
            <AvatarGroup
              max={5}
            // total={whoIsOnPage.total} 
            // onClick={onOpen}
            >
              {props.data?.usersWhoChangedValue.map(user => (
                <UserAvatar
                  {...user}
                // key={user.id}
                // callByType={user.callByType}
                // circleColor={user.circleColor}
                // email={user.email}
                // firstName={user.firstName}
                // labelColor={user.labelColor}
                // lastName={user.lastName}
                // picture={user.picture}
                // username={user.username}
                />
              ))}
            </AvatarGroup>
          </ButtonBase>
        )}

        {props.data?.usersWhoChangedValue?.length === 0 && (
          <>
            <br />
            <br />
          </>
        )}
      </div>
      <WhoEditThisInputModal
        isOpened={isModalOpened}
        onClose={() => {
          setIsModalOpened(false)
        }}
        usersWhoChangedValue={props.data?.usersWhoChangedValue || []}
      />
    </ListItem>
  );
}

export default RealTimeWysiwyg;
