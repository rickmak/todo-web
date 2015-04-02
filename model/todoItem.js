function todoItem(arg) {
  this.content = arg;
  this.pending = true;
  this.birth = timeStamp();
}

todoItem.Retore = function(obj) {
  _item = new todoItem(obj.content);
  _item.pending = obj.pending;
  _item.birth = obj.birth;
  return _item;
}

todoItem.prototype.finish = function() {
  this.pending = false;
  this.container.saveToLS();
}

todoItem.prototype.remove = function() {
  if (this.container.list.indexOf(this) != -1) {
    this.container.list.splice(this.container.list.indexOf(this), 1);
  }
}

todoItem.prototype.setDomNode = function(domNode) {
  this.domNode = domNode;
}

todoItem.prototype.setContainer = function(container) {
  this.container = container;
}
