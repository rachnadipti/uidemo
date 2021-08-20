var ArrayData = []
$(document).ready(function() {
	getData()
});

function getData() {

	fetch("http://localhost:3000/emp").then((res) => {
		return res.json();
	}).then((emp) => {
		fetchData(emp);
		ArrayData = emp;
	});
}

function fetchData(Data) {
	$(".table_list").css("display", "block");
	for (let index = 0; index < Data.length; index++) {
		var html_data = "<tr><th>" + Data[index].id + "</th><td>" + Data[index].ename + "</td><td>" + Data[index].profile + "</td><td><button type='button'  class='btn btn-success' data-toggle='modal' data-target='#editModal' value=" + Data[index].ename + '_' + Data[index].profile + '_' + Data[index].id + " id='edit_btn'>&#9998;</button><button type='button' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#deleteModal'  value=" + Data[index].id + "  id='delete_btn'>&#10008;</button></td></tr>";
		$("#dynamic_list").append(html_data)
	}
}
// ADD DETAILS
$("#add_data").click(function() {
	var FN = $("#ename").val();
	var LN = $("#profile").val();
	var ID = $("#identity").val();
	var obj = {
		"id": ID,
		"ename": FN,
		"profile": LN
	}
	fetch('http://localhost:3000/emp/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(obj)
	}).then((res) => {
        $("#ename").val("");
        $("#profile").val("");
        $("#identity tr").val("")
        $("#dynamic_list tr").remove()
      getData();
	})
	
});


// DELETE ALL 
$(".delete_all").click(function() {
	var tempId = []
	for (let index = 0; index < ArrayData.length; index++) {
		// tempId.push(ArrayData[index].id)
		fetch(`http://localhost:3000/emp/${ArrayData[index].id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		}).then((res) => {
			$("#dynamic_list tr").remove()
			getData();
		})
	}
})

// EDIT DATA
var edit_id;
$('table').on('click', '#edit_btn', function(e) {
	var ename = e.target.value.split("_")[0];
	var profile = e.target.value.split("_")[1];
	edit_id = e.target.value.split("_")[2];
	$("#editEName").val(ename)
	$("#editProfile").val(profile)
	$("#editId").val(edit_id)
})
$("#modify_data").click(function() {
	var ename = $("#editEName").val()
	var profile = $("#editProfile").val()
	var obj = {
		"ename": ename,
		"profile": profile,
		"id": edit_id
	}
	$("#editEName").val("");
	$("#editProfile").val("");
	$("#editId").val("")
	fetch(`http://localhost:3000/emp/${edit_id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(obj)
	}).then((res) => {
		console.log(res);
	})
	$("#dynamic_list tr").remove()
	setTimeout(function() {
		$("#dynamic_list tr").remove()
		getData();
	}, 1000);


})

// DELETE DATA
$('table').on('click', '#delete_btn', function(e) {
	var id = e.target.value;
	fetch(`http://localhost:3000/emp/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		}
	}).then((res) => {
		console.log(res);
	})
	$("#dynamic_list tr").remove()

	getData();

})