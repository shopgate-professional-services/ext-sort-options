import { appDidStart$, mutableActions } from '@shopgate/engage/core';
import { fetchSearchResults } from '@shopgate/engage/search';
import { sortOptions } from '../config';

/**
 * Subscriptions
 * @param {Function} subscribe subscribe
 */
export default (subscribe) => {
  if (sortOptions) {
    subscribe(appDidStart$, () => {
      fetchSearchResults.useBefore((params) => {
        let { sort } = params;
        if (sortOptions[sort]) {
          // @link https://github.com/shopgate/ext-search-cloudsearch/blob/master/extension/cloudsearch/QueryBuilder.js#L185
          sort = `custom*${sort.replace(':', ' ')}`;
        }

        const withSort = {
          ...params,
          sort,
        };

        return mutableActions.next(withSort);
      });
    });
  }
};
