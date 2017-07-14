/**
 * Created by kyleju on 2017/7/12.
 */
var Book = function($){
  function open(){ alert('open the book');};

  var Book = {};
  Book.open = open;
  return Book;
}(jQuery);
