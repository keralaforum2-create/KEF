// server-api/utils.js
function makeId() {
  return 'KSF-' + Math.random().toString(36).substr(2, 6).toUpperCase();
}
module.exports = { makeId };
