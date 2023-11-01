function checkStringLength(inputString, maxLength) {
  return inputString.length <= maxLength;
}
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false

function palindrome(string){
  string = string.replaceAll(' ', '').toLowerCase();
  const newString = string.split('').reverse().join('').toLowerCase();
  return string === newString;
}
// Строка является палиндромом
palindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
palindrome('ДовОд'); // true
// Это не палиндром
palindrome('Кекс');  // false
