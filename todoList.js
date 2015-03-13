function todoList(name) {

	this.name = name;
	this.list = [];
}

todoList.prototype.addTask = function (todoItem) {

	this.list.push(todoItem);

	this.saveToLS();
}

todoList.prototype.removeTask = function(todoItem){

	if (this.list.indexOf(todoItem) != -1){

		this.list.splice(this.list.indexOf(todoItem), 1);
		this.saveToLS();
	}

}

todoList.prototype.finishTask = function(todoItem){

	if (this.list.indexOf(todoItem) != -1){

		todoItem.pending = false;
		this.saveToLS();
	}

}

todoList.prototype.loadFromLS = function () {

	this.list = JSON.parse(localStorage.getItem(this.name) || '[]');

	return this;
}

todoList.prototype.saveToLS = function () {

	localStorage.setItem(this.name, JSON.stringify(this.list));
	return this;
}
