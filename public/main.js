var url = "http://localhost:5000";

document.forms["register-form"].addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`${url}/api/admin/adminRegister`, {
    method: "POST",
    body: new URLSearchParams(new FormData(e.target)),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) alert("Admin Successfully Added!!");
      else alert("Something Went Wrong!!");
    })
    .catch((err) => {
      alert("Err: " + err);
    });
});
