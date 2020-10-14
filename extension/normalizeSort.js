/**
 * @param {PipelineContext} context
 * @param {Object} input
 * @returns {Promise<Object>}
 */
module.exports = async (context, { sort }) => {
  const { sortOptions } = context.config
  if (!sortOptions) {
    return { sort }
  }

  if (!sortOptions[sort]) {
    return { sort }
  }

  // @link https://github.com/shopgate/ext-search-cloudsearch/blob/master/extension/cloudsearch/QueryBuilder.js#L185
  return {
    sort: `custom*${sort.replace(':', ' ')}`
  }
}
