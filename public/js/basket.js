console.log('hi from basket');

// Delete Fish from Basket
$('.rm_fish_btn').click(function(evt) {
  console.log(evt.target.id)
  $.ajax({
    url: `/fish/${evt.target.id}`,
    type: 'DELETE',
  })
  location.reload();
})
