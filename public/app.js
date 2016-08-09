/**
 * @app.js
 * React Todos list app
 */


var _app_url = "http://localhost:3000/";


// -----------------------------------------------------
// Todo List Item Component
// -----------------------------------------------------

var TodoListItem = React.createClass({
	

	deleteItem: function( item ){

		if( confirm("Do You really want to delete item?") ){
			this.props.deleteItem( item );
		}

	},


	editItem: function( item ){

		this.props.editItem( item );

	},


	render: function(){
		
		var item = this.props.data;

		return (
			<div className="item"  >
				<div className="title">
					{item.title}
				</div>
				<div>
					{item.text}
				</div>
				<div className="delete" onClick={this.deleteItem.bind(this, item ) } ><i className="fa fa-times"></i></div>
				<div className="edit" onClick={this.editItem.bind(this, item ) } ><i className="fa fa-pencil"></i></div>
			</div>
		);

	}

});


// -----------------------------------------------------
// Todo List Component
// -----------------------------------------------------

var TodoList = React.createClass({

	componentDidMount: function() {

		var self = this;

		// load initial items
		this.serverRequest = $.ajax({
  			url: _app_url + "list/",
	  		dataType: 'json',
	  		type:'get',
	  		cache: false,
	  		success: function(data)
			{
				self.props.setItems( data );
	  		},
	  	});

	},


 	componentWillUnmount: function() {
    	
    	this.serverRequest.abort();

  	},	


  	editItem: function( item ){
	
		this.props.fillForm( item );

	},


  	deleteItem: function( item ){

		var self = this;

  		var items = this.props.items;
  		var index = items.getIndexBy("_id",  item._id );

  		if( index != -1 ){

			this.serverRequest = $.ajax({
  				url: _app_url + "delete/" + item._id,
	  			dataType: 'json',
	  			type:'post',
	  			cache: false,
	  			success: function(data)
				{
					if(!data.err){
			  			items.splice(index, 1);
			  			self.props.setItems( items );
			  		}
	  			}
	  		});
  		}
  	},


	render: function() {

		var self = this;
		return (
			<div className="list">
				{this.props.items.map(function(result) {
           			return <TodoListItem key={result._id} data={result} deleteItem={self.deleteItem} editItem={self.editItem} ></TodoListItem>;
        		})}
			</div>
		);

	}

});


// -----------------------------------------------------
// Todo Form Component
// -----------------------------------------------------

var TodoForm = React.createClass({
	
	getInitialState: function() {

		return {
					title: '', 
					text:'',
					errors: false,
					edit: false
				};

	},


	handleSubmit: function(e){

		e.preventDefault();

		var self = this;
		var url = _app_url;

		if( this.state.edit )
			url += 'edit/' + self.state.id;
		else
			url += 'add';

		$.ajax({
  			url: url,
	  		dataType: 'json',
	  		type:'post',
	  		data: this.state,
	  		cache: false,
	  		success: function(data)
			{

				if(typeof data.errors != "undefined" ){
					self.setState({ errors: data.errors });
				}
				else{

					var items = self.props.items;

					// Update Item
					if( self.state.edit ){

						var index = items.getIndexBy("_id",  self.state.id );
						if( index != -1 ){
							items[ index ].title = data.item.title;
							items[ index ].text = data.item.text;
						}
					}
					// Create Item
					else{
						items.unshift( data.item );
					}

					self.props.setItems( items );
					self.setState({title: '', text: '', errors: false, edit: false });
				}
	  		},
	  	});

		return;

	},

	
	onChange: function(e){

		this.setState({
			title: e.target.value
		});

	},


	onChangeText: function(e){

		this.setState({
			text: e.target.value
		});

	},


	render: function(){

		var fields = ['title', 'text'];
		var fieldsClassNames = {};
		var fieldsReports = {};

		var buttonTitle = this.state.edit ? "Edit" : "Add";

		for( var i = 0; i < fields.length; i++ ){
			var field = fields[i];

			if( typeof this.state.errors[field] != "undefined" ){
				fieldsClassNames[ field ] = "report";
				fieldsReports[ field ] = this.state.errors[ field ];
			}
			else{
				fieldsClassNames[ field ] = "report hidden";
				fieldsReports[ field ] = "";
			}

		}

		return (
			<form onSubmit={this.handleSubmit}>
				<label >Title:</label>
				<input type='text' ref='title' onChange={this.onChange} value={this.state.title} />
				<div className={ fieldsClassNames.title } ref="message_title" >{ fieldsReports.title }</div>
				<label >Text:</label>
				<textarea ref='text' onChange={this.onChangeText} value={this.state.text} />
				<div className={fieldsClassNames.text } ref="message_text" >{fieldsReports.text }</div>
				<input type='submit' value={ buttonTitle } />
			</form>
		);
	}
});


// -----------------------------------------------------
// Todo App Component
// -----------------------------------------------------

var TodoApp = React.createClass({
	
	getInitialState: function() {

		return { items: [] };

	},

	setItems: function( items ) {

		this.setState({ items: items });

	},

	fillForm: function( item ) {

		var form = this.refs.todoForm;
		form.setState({ title: item.title, text: item.text, edit: true, id: item._id } );
		window.scrollTo( 0, 0 );

	},

	render: function(){

		return (
		    <div>
	    		<TodoForm items={this.state.items} setItems={this.setItems} ref="todoForm" />
	    		<TodoList items={this.state.items} setItems={this.setItems} fillForm={this.fillForm} />
    		</div>
		);

	}

})	;


ReactDOM.render(
    <TodoApp /> ,
    document.querySelector("#container")
);