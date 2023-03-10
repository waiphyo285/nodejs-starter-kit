/* *
 * Helpers Scripts
 */

$('.list-group .list-group-item-menu').on('click', function () {
    $('.list-group').find('.active').removeClass('active')
    $(this).addClass('active')
})

$('[data-hide="alert"]').on('click', function () {
    $(this).closest('div.alert').hide()
})

$('input[role="number"]').on('keydown', function (e) {
    var key = e.charCode || e.keyCode || 0
    return (
        key == 8 ||
        key == 9 ||
        key == 13 ||
        key == 46 ||
        key == 110 ||
        key == 190 ||
        (key >= 35 && key <= 40) ||
        (key >= 48 && key <= 57) ||
        (key >= 96 && key <= 105)
    )
})

$('input.date')
    .datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        orientation: 'bottom',
    })
    .on('hide', function (e) {
        if (typeof e.date == 'undefined' && $(this).val() == '') {
            $(this).val(window.date.format(new Date(Date.now()), 'DD/MM/YYYY'))
        }
    })

$('input.fromdate')
    .datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        orientation: 'bottom',
    })
    .on('changeDate', function (e) {
        var toid = $(this).attr('to')
        if (typeof toid !== 'undefined' && toid != '') {
            $("input[id='" + toid + "']").datepicker('setStartDate', e.date)
        } else {
            $('input.todate').datepicker('setStartDate', e.date)
        }
    })

$('input.todate')
    .datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        orientation: 'bottom',
    })
    .on('changeDate', function (e) {
        var fromid = $(this).attr('from')
        if (typeof fromid !== 'undefined' && fromid != '') {
            $("input[id='" + fromid + "']").datepicker('setEndDate', e.date)
        } else {
            $('input.fromdate').datepicker('setEndDate', e.date)
        }
    })
