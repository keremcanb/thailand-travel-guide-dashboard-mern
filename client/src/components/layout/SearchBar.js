import PropTypes from 'prop-types';
import React from 'react';
import { TextInput, Row, Col } from 'react-materialize';

const SearchBox = ({ onSearch }) => {
  const rowStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5px'
  };

  return (
    <Row className="rowStyle">
      <Col>
        <TextInput type="search" placeholder="Filter" onChange={onSearch} />
      </Col>
    </Row>
  );
};

SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchBox;
