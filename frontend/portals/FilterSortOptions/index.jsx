import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentRoute } from '@shopgate/engage/core';
import { sortOptions, hideSortOptions } from '../../config';

const sortOptionsMapped = sortOptions
  ? Object.keys(sortOptions).map(key => ({
    value: key,
    label: sortOptions[key],
  }))
  : [];

/**
 * Maps the current application state to the component props.
 * @param {Object} state The current application state.
 * @return {Object} The populated component props.
 */
const mapStateToProps = state => ({
  route: getCurrentRoute(state),
});

/**
 * @returns {JSX}
 */
const FilterSortOptions = ({ children, route }) => {
  const props = useMemo(() => {
    if (!sortOptionsMapped.length && (!hideSortOptions || !hideSortOptions.length)) {
      return null;
    }

    let { items } = children.props;

    // Add custom options
    if (sortOptionsMapped.length) {
      items = items.concat(sortOptionsMapped);
    }

    // Hide some options
    if (hideSortOptions && hideSortOptions.length) {
      items = items.filter(i => !hideSortOptions.includes(i.value));
    }

    // Exclude duplicates, apply custom i18n
    items = items
      .reverse()
      .filter((i, ind) => items.findIndex(s => s.value === i.value) === ind)
      .reverse();

    return {
      items,
      initialValue: route.query.sort,
    };
  }, [children.props, route.query.sort]);

  if (!props) {
    return children;
  }

  return React.cloneElement(children, {
    ...children.props,
    ...props,
  });
};

FilterSortOptions.propTypes = {
  children: PropTypes.node.isRequired,
};

export default connect(mapStateToProps)(FilterSortOptions);
