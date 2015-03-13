function todoItem(content){
	this.content = content;
	this.pending = true;
	this.birth = timeStamp();
}