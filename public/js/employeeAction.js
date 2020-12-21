// $(document).ready(async function() {
console.log("here");

const currentDay = moment().format("MMMM D, YYYY");
$("#date").text(currentDay);

const displayUserOrders = async () => {
  const userOrders = await $.get("/api/user_orders");
  console.log(userOrders);
};
displayUserOrders();

$.get("/api/user_data").then(data => {
  $(".member-name").text(data.email);
  $(".member-name").text(data.password);
});
// shows the modal if the user selects new or logs out
$("#employeeForm").on("submit", function(event) {
  const taskList = $("#taskList").val();
  console.log(taskList);
  event.preventDefault();
  if (taskList === "New") {
    $("#newOrder").addClass("is-active");
  } else if (taskList === "Logout") {
    window.location.replace("/logout");
  }
});
// blank click handler
$("prodDisplay").on("submit", () => {
  console.log("select");
});
// creates the variable of the information that is in the modal
$(".newJob").on("submit", function(event) {
  event.preventDefault();
  const repairOrderData = {
    repairOrderNumber: $("#repairOrderNumber").val(),
    vin: $("#vin").val(),
    yearMakeModel: $("#yearMakeModel").val(),
    name: $("#name").val(),
    description: $("#description").val(),
    hours: $("#hours").val()
  };
  createRepairOrders(repairOrderData);
});
// posts the new info to the api
function createRepairOrders(repairOrderData) {
  $.post("/api/order", repairOrderData).then(res => {
    if (res === "OK") {
      location.reload();
    }
  });
}
// Edit Order JavaScript
$(".editJob").on("submit", function(event) {
  event.preventDefault();
  const editRepairOrderData = {
    id: $("#idEdit").val(),
    repairOrderNumber: $("#repairOrderNumberEdit").val(),
    vin: $("#vinEdit").val(),
    yearMakeModel: $("#yearMakeModelEdit").val(),
    name: $("#nameEdit").val(),
    description: $("#descriptionEdit").val(),
    hours: $("#hoursEdit").val()
  };
  updateOrder(editRepairOrderData);
});
// updates the order
function updateOrder(editRepairOrderData) {
  $.ajax({
    method: "PUT",
    url: "/api/order",
    data: editRepairOrderData
  }).then(function() {
    location.reload();
  });
}
// hides the modal if the delete button is clicked
$(".delete").click(function() {
  $(".modal").removeClass("is-active");
});
console.log(orders);
const tRows = d3
  .select("#orderTable tbody")
  .selectAll("tr")
  .data(orders)
  .join("tr")
  .attr("id", function(d, i) {
    return i;
  });

tRows
  .selectAll("td")
  .data(function(d) {
    const allowed = [
      "repairOrderNumber",
      "vin",
      "yearMakeModel",
      "updatedAt",
      "createdAt",
      "name",
      "hours",
      "description",
      "id"
    ];
    const filtered = Object.keys(d)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = d[key];
        return obj;
      }, {});
    console.log(filtered);
    return Object.values(filtered);
  })
  .join("td")
  .attr("class", function() {
    return "row-data";
  })
  .text(d => d);

tRows
  .selectAll("td.button")
  .data(d => [d])
  .join("td")
  .attr("class", "button")
  .append("button")
  .text(function() {
    return "Edit";
  })
  .attr("class", "edit-order")
  .on("click", function(event) {
    const rowId = event.target.parentNode.parentNode.id;
    const data = document.getElementById(rowId).querySelectorAll(".row-data");
    console.log(data);
    $("#editOrder").addClass("is-active");
    $("#idEdit").val(data[0].innerHTML);
    $("#repairOrderNumberEdit").val(data[1].innerHTML);
    $("#vinEdit").val(data[2].innerHTML);
    $("#yearMakeModelEdit").val(data[3].innerHTML);
    $("#nameEdit").val(data[4].innerHTML);
    $("#descriptionEdit").val(data[5].innerHTML);
    $("#hoursEdit").val(data[6].innerHTML);
  });
// });
