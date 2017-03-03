// Delete Fish from Basket
$('.rm_fish_btn').click(function(evt) {
    $.ajax({
        url: `/fish/${evt.target.id}`,
        type: 'DELETE',
    });
    location.reload();
});

// Update Posting
$('.edit_fish').click(function(evt) {
    evt.currentTarget.nextElementSibling.nextElementSibling.style = '';
});
