//-------------------- them vao gio hang -----------------------
/**
 * 
 * @param {number} viTri 
 */
function clickThemVaoGioHang(viTri) {
    let arrMin = [];

    if (localStorage.getItem('cart') != null) {
        arrMin = JSON.parse(localStorage.getItem('cart'));
    }

    let arrMax = JSON.parse(localStorage.getItem('localSanPham'));
    console.log(arrMax);
    console.log(viTri);
    let check = false;
    for (var i = 0; i < arrMin.length; i++) {
        if (arrMin[i].id == arrMax[viTri].id) {
            arrMin[i] = {
                anh: arrMax[viTri].hinhanhsp,
                ten: arrMax[viTri].tensp,
                gia: arrMax[viTri].giasp,
                hang: arrMax[viTri].hangsp,
                id: arrMax[viTri].id,
                soluong: arrMin[i].soluong + 1,
            }
            check = true;
        }
    }
    if (check == false) {
        let arr = {
            anh: arrMax[viTri].hinhanhsp,
            ten: arrMax[viTri].tensp,
            gia: arrMax[viTri].giasp,
            hang: arrMax[viTri].hangsp,
            id: arrMax[viTri].id,
            soluong: 1,
        }
        arrMin.push(arr);
    }
    localStorage.setItem('cart', JSON.stringify(arrMin));
    alert("Đã thêm vào giỏ hàng");
}

/**
 * 
 * @param {[]} arr 
 * @param {String} idnode 
 */
function xuatSpRaGioHang(arr, idNode) {
    let node = document.getElementById(idNode);
    node.innerHTML = '';
    let tong = 0;
    for (var i = 0; i < arr.length; i++) {
        tong += (arr[i].gia * arr[i].soluong);
        node.innerHTML +=
            `
        <div class="san-pham-mua">
            <div class="item-sp">
                <div class="anh-san-pham">
                    <img src="${arr[i].anh}" alt="">
                </div>
            </div>
            <div class="item-sp">
                <h3>${arr[i].ten}</h3>
            </div>
            <div class="item-sp tien">
                <h3 id="don-gia" >${arr[i].gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</h3>
            </div>
            <div class="item-sp">
                <input onchange="onchangeTinhTien(${i})" value="${arr[i].soluong}" type="number" name="" id="so-luong-${i}" min="1">
            </div>
            <div class="item-sp ">
                <h3>${(arr[i].gia * arr[i].soluong).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</h3>  
            </div>
            <div class="item-sp">
                <i onclick="xoaSanPhamCart(${i})" class="far fa-trash-alt"></i>
            </div>
        </div>
        `
    }
    node.innerHTML +=
        `
    <div class="thanh-toan">
        <div class="tt-thanh-toan"></div>
        <div class="tt-thanh-toan"></div>
        <div class="tt-thanh-toan"></div>
        <div class="tt-thanh-toan">
            <h3>Tổng</h3>
        </div>
        <div class="tt-thanh-toan tien">
            <h3>${tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</h3>
        </div>
        <div class="tt-thanh-toan"> </div>
    </div>
    `
} xuatSpRaGioHang(JSON.parse(localStorage.getItem("cart")), 'thong-tin-sp');


// -------------------- xoa san pham -----------------------
/**
 * 
 * @param {number} viTri 
 */
function xoaSanPhamCart(viTri) {
    console.log('xoa san pham o vi tri ${viTri} ');
    let arr = JSON.parse(localStorage.getItem("cart"));
    arr.splice(viTri, 1);
    localStorage.setItem('cart', JSON.stringify(arr));
    xuatSpRaGioHang(JSON.parse(localStorage.getItem("cart")), 'thong-tin-sp');
}


// ---------------------------- onchange --------------------------
function onchangeTinhTien(viTri) {
    let arr = JSON.parse(localStorage.getItem('cart'));
    let nodeInput = document.getElementById(`so-luong-${viTri}`);
    arr[viTri] = {
        anh: arr[viTri].anh,
        ten: arr[viTri].ten,
        gia: arr[viTri].gia,
        soluong: Number(nodeInput.value < 1 ? 1 : nodeInput.value),
    }

    localStorage.setItem('cart', JSON.stringify(arr));
    xuatSpRaGioHang(JSON.parse(localStorage.getItem('cart')), 'thong-tin-sp')
}


// -------------------------- click mua hang -----------------------
function clickMuaHang() {
    let ten = document.getElementById('ho-ten');
    let sdt = document.getElementById('sdt');
    let email = document.getElementById('email');
    let address = document.getElementById('address');
    let timeNhanHang = document.getElementById('time-nhan-hang');

    if (localStorage.getItem('cart') == null) {
        alert('Bạn chưa có sản phẩm nào để đặt hàng!');
        return false;
    }


    if (ten.value == null || ten.value == "" || ten.value.length < 5) {
        alert('Vui lòng nhập họ tên')
        return false;
    } else {
        if (sdt.value.length < 10 || sdt.value.length >= 11) {
            alert('Vui lòng nhập số điện thoại')
            return false;
        } else {
            if (!email.value.includes('@')) {
                alert('Vui lòng nhập đúng định dạng email')
                return false;
            } else {
                if (address.value.length < 10 || address.value == null || address.value == "") {
                    alert('Vui lòng nhập địa chỉ')
                    return false;
                } else {
                    if (timeNhanHang.value == null || timeNhanHang.value == "") {
                        alert('Vui lòng nhập thời gian nhận hàng trong ngày')
                        return false;
                    } else {
                        alert('Đặt hàng thành công');
                    }
                }
            }
        }
    }
}