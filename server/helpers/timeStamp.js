module.exports = (date) => `${new Date(date)
  .toISOString()
  .split('T')[0]
  .split('-')
  .reverse()
  .join('/')}, ${new Date(date).toISOString().split('T')[1].split('.')[0]}`;
