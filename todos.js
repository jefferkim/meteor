if (Meteor.isClient) {

  Todos = new Meteor.Collection("todos");


  Template.todos.todoList = function() {
    return Todos.find({}, {sort: {time: -1}});
  };


  Template.todos.events({
    'mouseover mouseout .view': function(e) {
      var target = e.currentTarget;
      var deleteBtn = target.children[2];
      deleteBtn.style.display = 'block';
    },
    'click .destroy': function(e) {
      e.preventDefault();
      var todoId = e.currentTarget.getAttribute('data-id');
      Todos.remove(todoId);
    }
  });

  Template.addTodo.events({
    'keydown': function() {
      if (event.which == 13) {
        var input = document.getElementById('new-todo');
        if (input.value && input.value != '') {
          Todos.insert({
            title: input.value,
            time: Date.now()
          });
          input.value = '';
        }
      }
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
    Todos = new Meteor.Collection("todos");
  });
}