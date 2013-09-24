if (Meteor.isClient) {

  Todos = new Meteor.Collection("todos");


  Template.todos.todoList = function() {
    return Todos.find({}, {sort: {time: -1}});
  };
  Template.count.completedCount = function(){
    return Todos.find({done:1}).count();
  };
  Template.count.undoneCount = function(){
    return Todos.find({done:0}).count();
  }


  Template.todos.events({
    'mouseover mouseout .view': function(e) {
      var target = e.currentTarget;
      var deleteBtn = target.children[2];
      deleteBtn.style.display = 'block';
    },

    'click .destroy': function(e) {
      e.preventDefault();
      var todoId = e.currentTarget.parentNode.getAttribute('data-id');
      Todos.remove(todoId);
    },
    
    'click .toggle':function(e){
      var target = e.currentTarget;
      var todoId = target.parentNode.getAttribute('data-id');
      
      Todos.update(todoId,{$set: {done:target.checked ? 1 :0}});


    }
  });



  Template.addTodo.events({
    'keydown': function() {
      if (event.which == 13) {
        var input = document.getElementById('new-todo');
        if (input.value && input.value != '') {
          Todos.insert({
            title: input.value,
            time: Date.now(),
            done: 0
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