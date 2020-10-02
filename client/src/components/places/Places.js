/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getPlaces } from '../../actions/place';
import PlaceList from './PlaceList';

const Places = ({ getPlaces, place: { places } }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const filterSearch =
    places !== null &&
    places.filter((plc) => {
      return plc.title.toLowerCase().includes(search.toLowerCase());
    });

  return (
    <>
      <PlaceList selectedItem={filterSearch} onSearch={onSearch} />
      <div className="fixed-action-btn">
        <Link to="addplace">
          <a className="btn-floating btn-large blue darken-2">
            <i className="large material-icons">add</i>
          </a>
        </Link>
      </div>
    </>
  );
};

Places.propTypes = {
  place: PropTypes.object.isRequired,
  getPlaces: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  place: state.place
});

export default connect(mapStateToProps, { getPlaces })(Places);
