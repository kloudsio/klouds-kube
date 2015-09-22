var slug = require('./').slug()

var text = [
  '我爱你',
  'に間違いがないか、',
  'I love you',
  'aéà)àçé'
]

for(var i = 0; i<text.length; i++){
  console.log(text[i] + ' : \n      ' + text[i].slug('.'))
}
