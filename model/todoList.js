function todoList(name) {
  this.name = name;
  this.list = [];
}

todoList.prototype.addTask = function(item) {
  item.setContainer(this);
  this.list.push(item);
  this.saveToLS();
}

todoList.prototype.loadFromLS = function () {
  //.container property and the functions need to be reset
  var plainList = JSON.parse(localStorage.getItem(this.name) || '[]');
  this.list = [];
  for (var i = 0; i < plainList.length; i++){
    var item = todoItem.Retore(plainList[i], this);
    item.setContainer(this);
    this.list.push(item);
  }

  return this;
}

todoList.prototype.saveToLS = function () {
  var plainList = [];

  for (var i = 0; i < this.list.length; i++){
    plainList.push({
      "content": this.list[i].content,
      "pending": this.list[i].pending,
      "birth": this.list[i].birth
    });
  }

  localStorage.setItem(this.name, JSON.stringify(plainList));
  return this;
}
