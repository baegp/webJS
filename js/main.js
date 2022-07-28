// --------------- hien thi menu 2 cap ---------------------
function showMenu2() {
    let node = document.getElementById("menu2-dssp");
    if (node.style.display == "none") {
        node.style.display = "block";
    } else {
        node.style.display = "none";
    }
}



// ----------------- show search------------------
let modalBtn = document.getElementById("popup-btn");
let modal = document.querySelector(".popup");
let closeBtn = document.querySelector(".close-btn");
modalBtn.onclick = function () {
    modal.style.display = "block"
}
closeBtn.onclick = function () {
    modal.style.display = "none"
}
window.onclick = function (e) {}


// ---------------- tim kiem ---------------
/**
 * 
 * @param {[]} arr 
 * @param {string} ten 
 * @returns 
 */
function timKiem(arr, ten) {
    let empty = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].tensp.includes(ten) || arr[i].hangsp.includes(ten)) {
            empty.push(arr[i]);
        }
    }
    return empty;
}

function clickTimKiem() {
    let nodeSearch = document.getElementById('search')
    let searchSp = JSON.parse(localStorage.getItem("localSanPham"))
    let arrKq = timKiem(searchSp, nodeSearch.value)
    modal.style.display = "none";
    xuatGiaoDien(arrKq, "xuatSanPham");
}


// ------------------- xuat giao dien -------------------
/**
 * 
 * @param {[]} arr 
 * @param {String} idnode 
 */
function xuatGiaoDien(arr, idNode) {
    let node = document.getElementById(idNode);
    node.innerHTML = '';
    for (var i = 0; i < arr.length; i++) {
        node.innerHTML +=
            `
        <div class="sanPham " data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine">
            <div class="img">
                <img src="${arr[i].hinhanhsp}" alt="">
            </div>
            <div class="ten">
                ${arr[i].tensp}
            </div>
            <div class="sao">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
            </div>
            <div class="gia">
                ${arr[i].giasp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
            </div>
            <button onclick="clickThemVaoGioHang(${i})" class="btn btnPrimary">Thêm vào giỏ hàng</button>
        </div>
        `
    }
} xuatGiaoDien(JSON.parse(localStorage.getItem("localSanPham")), 'xuatSanPham');


// -------------------- sắp xếp sản phẩm ------------------
function sapXepTangDan() {
    let tam;
    let arr = JSON.parse(localStorage.getItem("localSanPham"))
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i].giasp > arr[j].giasp) {
                tam = arr[i];
                arr[i] = arr[j];
                arr[j] = tam;
            }
        }
    }
    localStorage.setItem('localSanPham', JSON.stringify(arr));
    xuatGiaoDien(JSON.parse(localStorage.getItem('localSanPham')), 'xuatSanPham');
}

function sapXepGiamDan() {
    let tam;
    let arr = JSON.parse(localStorage.getItem("localSanPham"));
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i].giasp < arr[j].giasp) {
                tam = arr[j];
                arr[j] = arr[i];
                arr[i] = tam;
            }
        }
    }
    localStorage.setItem('localSanPham', JSON.stringify(arr));
    xuatGiaoDien(JSON.parse(localStorage.getItem('localSanPham')), 'xuatSanPham');
}