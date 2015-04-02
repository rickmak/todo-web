var myList, app;

myList = new todoList('myList');
myList.loadFromLS();
app = new TodoView(myList);
