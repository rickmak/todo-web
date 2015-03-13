function toggleView(){
	if (document.getElementById("finished-view").className == "hidden"){

		document.getElementById("todo-view").className = "hidden";
		document.getElementById("finished-view").className = "";
	}
	else{

		document.getElementById("todo-view").className = "";
		document.getElementById("finished-view").className = "hidden";		
	}
}

function syncView(myList){
	var todoListView = document.getElementById("list-content");
	var finishedListView = document.getElementById("finished-list-content");
 
	todoListView.innerHTML = "";
	finishedListView.innerHTML = "";

	for (var i = 0; i < myList.list.length; i++){
		var item = myList.list[i];

		//add to to-do view
		if (item.pending)
			addToView(item, myList);
		
		//add to finished view
		else{
			var domItem = document.createElement('li');
			domItem.className = 'list-item';
			
			var text = document.createElement('span');
			text.innerHTML = item.content;

			domItem.appendChild(text);
			finishedListView.appendChild(domItem);
		}
			
	}
}

function addToView(todoItem, myList){
	var todoListView = document.getElementById("list-content");

	var domItem = document.createElement('li');
	domItem.className = 'list-item';

	var checkbox = document.createElement('input');

	checkbox.type = 'checkbox';
	checkbox.addEventListener('click', function(todoItem, domItem){
		return function(){
			setTimeout(function(){
				myList.finishTask(todoItem);
				//remove from todo list
				domItem.parentNode.removeChild(domItem);
				//add to finished list
				var newDomItem = document.createElement('li');
				var text = document.createElement('span');
				text.innerHTML = todoItem.content;
				newDomItem.appendChild(text);
				document.getElementById("finished-list-content").appendChild(newDomItem);
				
			}, 500);
		}
	}(todoItem, domItem));

	var text = document.createElement('span');
	text.innerHTML = todoItem.content;

	domItem.appendChild(checkbox);
	domItem.appendChild(text);

	todoListView.appendChild(domItem);

}


function addItem(){

	var content = document.getElementById('input-content').value;
	if (content.length == 0)
		alert('NOTHING TO ADD.');
	else{
		var newItem = new todoItem(content);
		myList.addTask(newItem);
		addToView(newItem, myList);
		document.getElementById('input-content').value = "";
	}
}

document.getElementById("button-return").addEventListener('click', toggleView);
document.getElementById("button-view-finished").addEventListener('click', toggleView);
document.getElementById("button-add-item").addEventListener('click', addItem);

//load model from local storage
var myList = new todoList('myList');
myList.loadFromLS();
//sync view with model
syncView(myList);
