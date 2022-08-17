var myList, app;

myList = new TodoList('myList');
myList.loadFromLS();
app = new TodoView(myList);
