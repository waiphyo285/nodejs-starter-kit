/* *
 * Datatable Scripts
 */

function dataTableCallback(e, settings, techNote, message) {
    const description =
        settings.ajax.data == undefined
            ? content['swal-msg'].unauthorized
            : content['swal-msg'].unknown_desc
    swalWarning({
        title: content['modal'].warning,
        description: description,
    })
}

function dataTableIndexRenderer() {
    return function (d, type, row, meta) {
        return parseInt('' + meta.row) + 1
    }
}

function dataTableDigitSeperator(d) {
    if (d) return d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return 0
}

function dataTableSliceRenderer() {
    return function (d, type, row) {
        if (d) return d.slice(0, 10) + '...'
        return ''
    }
}

function dataTableDateRenderer() {
    return function (d, type, row) {
        return moment(new Date(d)).format('DD/MM/YYYY')
    }
}

function dataTableDateTimeRenderer() {
    return function (d, type, row) {
        return moment(new Date(d)).format('DD/MM/YYYY hh:mm A')
    }
}

function dataTableTypeRenderer() {
    return function (d, type, row) {
        return d !== ''
            ? `<span class="badge badge-info" style="min-width: 100px; font-size:12px;">${d.toUpperCase()}</span>`
            : `<span class="badge badge-info" style="min-width: 100px; font-size:12px;">UNDEFINED</span>`
    }
}

function dataTableActiveRenderer() {
    return function (d, type, row) {
        return d == true
            ? '<span class="badge badge-success" style="width: 100px; font-size:12px;">Active</span>'
            : '<span class="badge badge-secondary" style="width: 100px; font-size:12px;">Inactive</span>'
    }
}

function dataTableMoneyRenderer() {
    return function (d, type, row) {
        return d !== ''
            ? `<span class="font-weight-bold" style="font-size:12px; text-align: right;"> 
                ${dataTableDigitSeperator(d)}
            </span>`
            : `<span class="font-weight-bold" style="font-size:12px; text-align: right;">
                ${dataTableDigitSeperator(0)}
            </span>`
    }
}

function dataTableThumbRenderer(isSrc = false) {
    return function (d, type, row) {
        return isSrc == true
            ? `<div class=""><img class="img border" src="${d}" height="30" width="30" title="Image" alt=""/></div >`
            : `<div class="" style = "height: 18px; width: 50px; background:${d}></div>`
    }
}

function dataTableActionsRenderer(editUrl, read, edit, del, version = 'v1') {
    return function (d, type, row) {
        var id = row._id || row.id || '#'
        var html =
            '<div class="btn-group float-right" role="group" aria-label="Actions">'
        if (read == 'true' && edit == 'true') {
            // read && write access
            // icon as <img src="/images/heroicons/edit.svg" height="22" width="22"/>
            html += `
                <a class="btn btn-sm border list-action" href="./${editUrl}/${id}">
                  <i class="bi bi-pencil-square text-warning"></i>
                </a>`
        }
        if (del == 'true') {
            // delete access
            // icon as <img src="/images/heroicons/delete.svg" height="22" width="22"/>
            html += `
                <a class="btn btn-sm border list-action" role="button" data-toggle="modal" data-target="#dialogDeleteConfirm" data-loading-text="Deleting..." data-id="${id}" data-version="${version}">
                  <i class="bi bi-trash3 text-danger"></i>
                </a>`
        }
        return html + '</div>'
    }
}

$('#btnExcel').on('click', function (e) {
    if (!table.data().count()) {
        swalWarning({
            title: content['modal'].warning,
            description: content['swal-msg'].no_data_excel,
        })
        return false
    }
    table.button('.buttons-excel').trigger()
})

$('#btnPdf').on('click', function (e) {
    if (!table.data().count()) {
        swalWarning({
            title: content['modal'].warning,
            description: content['swal-msg'].no_data_pdf,
        })
        return false
    }
    table.button('.buttons-pdf').trigger()
})

$('#btnPrint').on('click', function (e) {
    if (!table.data().count()) {
        swalWarning({
            title: content['modal'].warning,
            description: content['swal-msg'].no_data_print,
        })
        return false
    }
    table.button('.buttons-print').trigger()
})

$('#btnSearch').on('click', function (e) {
    if (!table.data().count()) {
        swalWarning({
            title: content['modal'].warning,
            description: content['swal-msg'].no_data_search,
        })
        return false
    }
    $('#tb_search').attr({ autofocus: true })
    $('#tb_search_wrap').toggleClass('d-none')
})

$('input#tb_search').on('blur', function () {
    // debounce here
    if (table.search() !== this.value) {
        var debounce
        clearTimeout(debounce)
        debounce = setTimeout(() => table.search(this.value).draw(), 1500)
    }
})
