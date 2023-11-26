let carData = [
  {
    id: 1,
    name: 'APV',
    price: 180000,
  },
];
let transactionsData = [
]

let addButton = $('#addData');
let inputCarName = $('#inputCarName');
let inputCarPrice = $('#inputCarPrice');
let tableCar = $('#carTable');
let tableCarBody = tableCar.find('tbody');
let transactionTableBody = $('#transactionTable').find('tbody');

function addCar() {
  let carName = inputCarName.val();
  let carPrice = inputCarPrice.val();

    if (carName && carPrice) {
        carData.push({
        id: Date.now(),
        name: carName,
        price: carPrice
        })
        
        reloadTable()
    } else {
        alert("Data wajib diisi")
    }

  inputCarName.val('')
  inputCarPrice.val(0)
}

function reloadTable() {
  tableCarBody.html('');
  $('#selectCar').html('');
  carData.forEach((item, index) => {
      $('#selectCar').append(`<option value="${item.id}">${item.name}, Rp. ${item.price}/hari</option>`)
      tableCarBody.append(`
        <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td>
            <button class="btn btn-warning btn-delete btn-sm" data-id="${item.id}">Hapus</button>
          </td>
        </tr>
      `)
  });
}

addButton.on('click', addCar);

// delete car
$('body').on('click', '.btn-delete', function (){
  let id = $(this).data('id')
  carData.splice(carData.findIndex((val) => val.id == id), 1)

  reloadTable()
});

// onload
$(document).ready(function() {
  reloadTable()
  reloadTableTransaction()
})

// addTransaction
$('#transactionForm').on('submit', function (e) {
  e.preventDefault();
  let carId = $('#selectCar').val();
  let price = carData.filter(val => val.id == carId)[0].price;
  let duration = $('#duration').val();
  let total = price * duration;

  transactionsData.push({
    id: Date.now(),
    name: $('#customerName').val(),
    carId: carId,
    duration: duration,
    total: total
  })

  reloadTableTransaction()
})

// reloadTableTransaction
function reloadTableTransaction() {
  transactionTableBody.html('');
  
  transactionsData.forEach((item, index) => {
    if (item.name && item.duration && item.carId && item.total) {
      let car = carData.filter(val => val.id == item.carId)[0];
      transactionTableBody.append(`
        <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td>${car.name}</td>
          <td>${item.duration} hari</td>
          <td>Rp. ${item.total}</td>
        </tr>
      `)
    } else {
      alert('Data tidak boleh kosong!')
    }
  });
}

$('body').on('change', '#transactionForm input, #transactionForm select', function() {
  let carId = $('#selectCar').val();
  let price = carData.filter(val => val.id == carId)[0].price;
  let duration = $('#duration').val();
  let total = price * duration;

  $('#totalPrice').val(total)
})