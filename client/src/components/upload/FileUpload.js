/* eslint-disable react/prop-types */
/* eslint-disable radix */
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Icon, TextInput } from 'react-materialize';
import Message from './Message';

const FileUpload = ({ updateFileNameToParent }) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  updateFileNameToParent(filename);

  return (
    <>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <TextInput
          id="add-cat-thumb"
          name="thumbnail"
          type="file"
          label={filename}
          onChange={onChange}
          s={12}
        />
        <Button variant="contained" className="blue darken-2 mb" type="submit">
          Submit
          <Icon right>send</Icon>
        </Button>
      </form>
    </>
  );
};

export default FileUpload;