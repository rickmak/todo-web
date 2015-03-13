function syncView(myList){
	var todoListView = document.getElementById("list-content");
	var finishedListView = document.getElementById("finished-list-content");
 
	todoListView.innerHTML = "";
	finishedListView.innerHTML = "";

	for (var i = 0; i < myList.list.length; i++){
		var item = myList.list[i];

		//add to to-do view
		if (item.pending)
			todoListView.appendChild(todoDomItem(item));
		
		//add to finished view
		else
			finishedListView.appendChild(finishedDomItem(item));	
			
	}
}

document.getElementById("button-return").addEventListener('click', toggleView);
document.getElementById("button-view-finished").addEventListener('click', toggleView);

//load model from local storage
var myList = new todoList('myList');

document.getElementById("button-add-item").addEventListener('click', getAddBtnListner(myList));

myList.loadFromLS();
//sync view with model
syncView(myList);
