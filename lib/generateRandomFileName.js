// generates random file name and adds an extension
var generateRandomFileName = function(f) {
  var letters = "abcdefghijklmnopqrstuvwxyz";
  var randName = '';

  var extensionArray = f.mimetype.split('/');
  var extension = extensionArray[extensionArray.length - 1];

  while (randName.length < 32) {
    randName += letters[Math.floor(Math.random() * letters.length)]
  };
  return randName + '.' + extension;
};

module.exports = generateRandomFileName;
