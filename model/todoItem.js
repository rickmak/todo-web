function todoItem(arg){
	if (typeof(arg) == 'string'){
		this.content = arg;
		this.pending = true;
		this.birth = timeStamp();
	}
	else if (typeof(arg) == 'object'){
		this.content = arg.content;
		this.pending = arg.pending;
		this.birth = arg.birth;
	}

}

todoItem.prototype.finish = function(){
	this.pending = false;
	if (typeof(this.container) != 'undefined')
		this.container.saveToLS();
}

todoItem.prototype.remove = function(){
	if (typeof(this.container) != 'undefined')
		if (this.container.list.indexOf(this) != -1){

			this.container.list.splice(this.container.list.indexOf(this), 1);
			this.container.saveToLS();
		}

}

todoItem.prototype.setDomNode = function(domNode){
	this.domNode = domNode;
}

todoItem.prototype.setContainer = function(container){
	this.container = container;
}
