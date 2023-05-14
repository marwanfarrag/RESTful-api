const addbutton = document.getElementById('addPerson');
const deletebutton = document.getElementById('deletePerson');
const saveButton = document.getElementById('saveChanges');
const personList = $('#person-list');

// updatebutton.addEventListener('click' ,() => {
//     console.log('addPerson');
//       // Get form data
//       var name = $('#name').val();
//       var age = $('#age').val();
//       var gender = $('#gender').val();
//       var email = $('#email').val();
//       // Send data to server
//       $.ajax({
//         url: 'http://localhost:3000/persons',
//         type: 'POST',
//         data: {
//           name: name,
//           age: age,
//           gender: gender,
//           email: email
//         },
//         success: function(result) {
//                 // Display the new person data on the page
//                 const tableBody = document.getElementById("tableBody");
//                 const newRow = tableBody.insertRow();
          
//                 const nameCell = newRow.insertCell();
//                 nameCell.innerHTML = name;
          
//                 const ageCell = newRow.insertCell();
//                 ageCell.innerHTML = age;

//                 const genderCell = newRow.insertCell();
//                 genderCell.innerHTML = gender;

//                 const emailCell = newRow.insertCell();
//                 emailCell.innerHTML = email;
        
//                 const deleteCell = newRow.insertCell();
//                 const deleteButton = document.createElement("button");
//                 deleteButton.innerText = "Delete";
//                 deleteButton.classList.add("btn", "btn-danger");
                
//                 deleteCell.appendChild(deleteButton);
              
//                 // Reset the form
//                 document.getElementById("addPersonForm").reset();
//                 deleteButton.addEventListener('click', () => {
//                     newRow.remove();
//                     deletePerson(result.id);
//                   });
//                 // Hide the modal
//                 $("#addPersonModal").modal("hide");
                
//               }
//       });
// });

function loadPersons() {
  $.ajax({
    url: 'http://localhost:3000/persons',
    method: 'GET',
    dataType: 'json',
    success: function(persons) {
        const tableBody = document.getElementById("tableBody");
        // empty the table
        tableBody.innerHTML = "";


        personList.empty();
         persons.forEach(person => {
            const newRow = tableBody.insertRow();
          
            const nameCell = newRow.insertCell();
            nameCell.innerHTML = person.name;
          
            const ageCell = newRow.insertCell();
            ageCell.innerHTML = person.age;

            const genderCell = newRow.insertCell();
            genderCell.innerHTML = person.gender;

            const emailCell = newRow.insertCell();
            emailCell.innerHTML = person.email;
        
            const deleteCell = newRow.insertCell();
            const deleteButton = document.createElement("button");

            deleteButton.innerText = "Delete";
            deleteButton.classList.add("btn", "btn-danger");
                
            deleteCell.appendChild(deleteButton);

            const updateCell = newRow.insertCell();
            const updateButton = document.createElement("button");
            updateButton.setAttribute("data-toggle", "modal")
            updateButton.setAttribute("data-target", "#editPersonModal")
            updateButton.setAttribute("id", person.id);
                
            updateButton.innerText = "Update";
            updateButton.classList.add("btn", "btn-primary");
                
            updateCell.appendChild(updateButton);

            deleteButton.addEventListener('click', () => {
                newRow.remove();
                deletePerson(person.id);
            });

            
  
            updateButton.addEventListener('click', () => {
              // Get form data and set the values to the current person data
              $('#editPersonName').val(person.name);
              $('#editPersonAge').val(person.age);
              $('#editPersonGender').val(person.gender);
              $('#editPersonEmail').val(person.email);
              console.log(updateButton.id);
              // save changes for the current row
              // console.log(person.id);

              const saveButton = document.getElementById('saveChanges');
              saveButton.setAttribute("currentID", updateButton.id);

            });

        });

        
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error('Error:', textStatus, errorThrown);
    }
  });
}


document.getElementById("saveChanges").addEventListener('click', () => {
  // Get form data
  var name = $('#editPersonName').val();
  var age = $('#editPersonAge').val();
  var gender = $('#editPersonGender').val();
  var email = $('#editPersonEmail').val();
  // Send data to server
  $.ajax({
    url: 'http://localhost:3000/persons/' + document.getElementById("saveChanges").getAttribute("currentID"),
    type: 'PUT',
    data: {
      name: name,
      age: age,
      gender: gender,
      email: email
    },
    success: function(result) {
      alert(`Person with ID ${document.getElementById("saveChanges").getAttribute("currentID")} has been updated.`);
      document.getElementById("closeButton").click();
      console.log(result);
      loadPersons();
    }});

});

addbutton.addEventListener('click' ,() => {
    
        console.log('addPerson');
      // Get form data
      var name = $('#name').val();
      var age = $('#age').val();
      var gender = $('#gender').val();
      var email = $('#email').val();
      // Send data to server
      $.ajax({
        url: 'http://localhost:3000/persons',
        type: 'POST',
        data: {
          name: name,
          age: age,
          gender: gender,
          email: email
        },
        success: function(result) {
                // Display the new person data on the page
                const tableBody = document.getElementById("tableBody");
                const newRow = tableBody.insertRow();
          
                const nameCell = newRow.insertCell();
                nameCell.innerHTML = name;
          
                const ageCell = newRow.insertCell();
                ageCell.innerHTML = age;

                const genderCell = newRow.insertCell();
                genderCell.innerHTML = gender;

                const emailCell = newRow.insertCell();
                emailCell.innerHTML = email;
        
                const deleteCell = newRow.insertCell();
                const deleteButton = document.createElement("button");

                deleteButton.innerText = "Delete";
                deleteButton.classList.add("btn", "btn-danger");
                
                deleteCell.appendChild(deleteButton);

                const updateCell = newRow.insertCell();
                const updateButton = document.createElement("button");
                updateButton.setAttribute("data-toggle", "modal")
                updateButton.setAttribute("data-target", "#editPersonModal")
                
                updateButton.innerText = "Update";
                updateButton.classList.add("btn", "btn-primary");
                
                updateCell.appendChild(updateButton);
                loadPersons();
              
                // Reset the form
                document.getElementById("addPersonForm").reset();
                deleteButton.addEventListener('click', () => {
                    newRow.remove();
                    deletePerson(result.id);
                  });

                  // saveButton.addEventListener('click', () => {
                  //   console.log(result.name);
                  // });
                  
                // Hide the modal
                $("#addPersonModal").modal("hide");
                
              }
      });
});

function deletePerson(id) {
    $.ajax({
      url: `http://localhost:3000/persons/${id}`,
      type: 'DELETE',
      success: function(result) {
        alert(`Person with ID ${id} has been deleted.`);
        console.log("Deleted successfully");
      },
      error: function(xhr, status, error) {
        // Handle error
        console.log(error);
      }
    });
  }


  window.addEventListener('load', () => {
    loadPersons();
  });