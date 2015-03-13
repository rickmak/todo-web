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

//need myList for registering checkbox callback
function todoDomItem(item, myList){
	if (!item.pending)
		return "";

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
				var newDomItem = finishedDomItem(todoItem);
				document.getElementById("finished-list-content").appendChild(newDomItem);
				
			}, 500);
		}
	}(item, domItem));

	var text = document.createElement('span');
	text.innerHTML = item.content;

	domItem.appendChild(checkbox);
	domItem.appendChild(text);

	//for backward compatibility
	if (typeof(item.birth) !== "undefined"){
		var timeStamp = document.createElement('span');
		timeStamp.className='time-stamp';
		timeStamp.innerHTML = "Created at " + item.birth;
		domItem.appendChild(timeStamp);
	}

	return domItem;
}

function finishedDomItem(item){
	if (item.pending)
		return "";

	var domItem = document.createElement('li');
	domItem.className = 'list-item';

	var text = document.createElement('span');
	text.innerHTML = item.content;

	domItem.appendChild(text);

	//for backward compatibility
	if (typeof(item.birth) !== "undefined"){
		var timeStamp = document.createElement('span');
		timeStamp.className='time-stamp';
		timeStamp.innerHTML = "Created at " + item.birth;
		domItem.appendChild(timeStamp);
	}

	return domItem;

}

function addItem(){

	var content = document.getElementById('input-content').value;
	if (content.length == 0)
		alert('NOTHING TO ADD.');
	else{
		var newItem = new todoItem(content);
		myList.addTask(newItem);

		document.getElementById("list-content").appendChild(todoDomItem(newItem, myList));

		document.getElementById('input-content').value = "";
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
			todoListView.appendChild(todoDomItem(item, myList));
		
		//add to finished view
		else
			finishedListView.appendChild(finishedDomItem(item));	
			
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
