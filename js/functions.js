function checkStringLength(inputString, maxLength) {
  return inputString.length <= maxLength;
}

function palindrome(string){
  string = string.replaceAll(' ', '').toLowerCase();
  var newString = string.split('').reverse().join('').toLowerCase();
  return string === newString;
}
