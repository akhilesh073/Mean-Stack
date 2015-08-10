
var express= require("express");
var app=express();
var mongojs=require('mongojs');
var db=mongojs('contactlist',['contactlist']);
var bodyParser=require('body-parser');

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.get('/contactlist',function(req,res){
	console.log("Recieved a GET request");
	/*person1={
		name: 'Akhielsh',
		email: 'akhilesh@gmail.com',
		contactNo:'1234567890'
	}
	person2={
		name: 'Sandeep',
		email: 'Sandeep@gmail.com',
		contactNo:'2345678901'
	}
	person3={
		name: 'Nikhil',
		email: 'Nikhil@gmail.com',
		contactNo:'3456789012'
	}
	var contactlist=[person1,person2,person3];	
	res.json(contactlist);
	*/
	
	db.contactlist.find(function(err,docs){
		res.json(docs);

		
	});
});

//For logging data

function prettyJSON(obj) {
    console.log(JSON.stringify(obj, null, 2));
}

app.post('/contactlist',function(req,res){
	console.log("inserting data to db= ");
	db.contactlist.insert(req.body,function(err,doc){
		res.json(doc);
		prettyJSON(req.body);
		
	});
});

app.delete('/contactlist/:id',function(req,res){
	
	var id=req.params.id;
	db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,doc){
		console.log("contact deleted= ");
		prettyJSON(req.params);
		res.json(doc);
	});
});

app.get('/contactlist/:id',function(req,res){
	var id=req.params.id;
	db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.put('/contactlist/:id',function(req,res){
	var id=req.params.id;
	db.contactlist.findAndModify({query: {_id : mongojs.ObjectId(id)},
	   update : {$set : {name : req.body.name, email : req.body.email , contactNo : req.body.contactNo}},
	   new: true },function(err,doc){
		res.json(doc);
});
});

app.listen(3000);
console.log("server started in port 3000");