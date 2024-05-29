document.addEventListener("DOMContentLoaded", function () {
  // Edit Profile Button
  document
    .querySelector(".edit-profile")
    .addEventListener("click", function (e) {
      e.preventDefault();
      alert("Redirect to Edit Profile Page");
      // Replace with actual redirect logic
    });

  // Change Password Button
  document
    .querySelector("#change-password")
    .addEventListener("click", function (e) {
      e.preventDefault();
      alert("Redirect to Change Password Page");
      // Replace with actual redirect logic
    });

  // Delete Account Button
  document
    .querySelector("#delete-account")
    .addEventListener("click", function (e) {
      e.preventDefault();
      if (confirm("Are you sure you want to delete your account?")) {
        alert("Account deleted successfully");
        // Replace with actual delete account logic
      }
    });

  // Edit Address Buttons
  document.querySelectorAll(".edit-address").forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      alert("Redirect to Edit Address Page");
      // Replace with actual redirect logic
    });
  });

  // Delete Address Buttons
  document.querySelectorAll(".delete-address").forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      if (confirm("Are you sure you want to delete this address?")) {
        alert("Address deleted successfully");
        // Replace with actual delete address logic
      }
    });
  });

  // Add Address Button
  document
    .querySelector(".add-address")
    .addEventListener("click", function (e) {
      e.preventDefault();
      alert("Redirect to Add Address Page");
      // Replace with actual redirect logic
    });
});
