function todoList(name) {
	this.name = name;
	this.list = [];
	this.todo = [];
	this.done = [];
}

todoList.prototype.addTask = function (todoItem) {
	this.list.push(todoItem);
	this.todo.push(todoItem);

	this.saveToLS();
}

todoList.prototype.finishTask = function(todoItem){

	if (this.list.indexOf(todoItem) != -1){
		todoItem.pending = false;
		this.todo.splice(this.list.indexOf(todoItem));
		this.done.push(todoItem);

		this.saveToLS();
	}

}

todoList.prototype.loadFromLS = function () {

	this.list = JSON.parse(localStorage.getItem(this.name) || '[]');
	this.todo = [];
	this.done = [];
	for (var i = 0; i < this.list.length; i ++){
		if (this.list[i].pending)
			this.todo.push(this.list[i]);
		else
			this.done.push(this.list[i]);
	}
	return this;
}

todoList.prototype.saveToLS = function () {

	localStorage.setItem(this.name, JSON.stringify(this.list));
	return this;
}
