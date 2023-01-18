// 搜寻
export const tableSearch_order = () => {
    const input = document.getElementById('myInput_order');
    const filter = input.value.toUpperCase().replace(/\s+/g, '');
    const table = document.getElementById('myTable_order');
    const tr = table.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        let td_ean = tr[i].getElementsByTagName("td")[0];
        let td_content = tr[i].getElementsByTagName('td')[2];
        let td_quantity = tr[i].getElementsByTagName('td')[3];
        let td_sid = tr[i].getElementsByTagName('td')[4];
        let td_remark = tr[i].getElementsByTagName('td')[5];
        let td_delivery = tr[i].getElementsByTagName('td')[6];
        let td_date = tr[i].getElementsByTagName('td')[7];


        if (td_ean || td_content || td_quantity || td_sid || td_remark || td_delivery || td_date) {
            let txtValue_ean = td_ean.textContent.replace(/\s+/g, '') || td_ean.innerText.replace(/\s+/g, '');
            // let txtValue_courier = td_courier.textContent.replace(/\s+/g, '') || td_courier.innerText.replace(/\s+/g, '');
            let txtValue_content = td_content.textContent.replace(/\s+/g, '') || td_content.innerText.replace(/\s+/g, '');
            let txtValue_quantity = td_quantity.textContent.replace(/\s+/g, '') || td_quantity.innerText.replace(/\s+/g, '');
            let txtValue_sid = td_sid.textContent.replace(/\s+/g, '') || td_sid.innerText.replace(/\s+/g, '');
            let txtValue_remark = td_remark.textContent.replace(/\s+/g, '') || td_remark.innerText.replace(/\s+/g, '');
            let txtValue_delivery = td_delivery.textContent.replace(/\s+/g, '') || td_delivery.innerText.replace(/\s+/g, '');
            let txtValue_date = td_date.textContent.replace(/\s+/g, '') || td_date.innerText.replace(/\s+/g, '');


            if (txtValue_ean.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else if (txtValue_content.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else if (txtValue_quantity.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else if (txtValue_sid.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else if (txtValue_remark.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else if (txtValue_delivery.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else if (txtValue_date.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }

    }
}