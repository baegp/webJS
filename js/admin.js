/**
 * ------------------ click thêm sp --------------------
 * @returns 
 */
function clickThemSp() {
    document.getElementById('pop-up-them-sp').style.display = 'none';

    console.log("click thêm sản phẩm");

    let sanpham = [];
    let jsSanPham = localStorage.getItem("localSanPham");
    if (jsSanPham != null) {
        sanpham = JSON.parse(jsSanPham);
    }
// 
/** */ 
    let nodeHinhAnh = document.getElementById("hinh-anh");
    let nodeTenSp = document.getElementById("ten-sp");
    let nodeGiaSp = document.getElementById("gia-sp");
    let nodeHangSp = document.getElementById("hang-sp");
    console.log(`hãng: ${nodeHangSp.value} có ten sp ${nodeTenSp.value} co gia la: ${nodeGiaSp.value}`);

    if (nodeHinhAnh.value == null || nodeHinhAnh.value == "") {
        alert("Vui lòng nhập link hình ảnh");
        return false;
    } else {
        if (nodeTenSp.value == null || nodeTenSp.value == "" || nodeTenSp.value.length < 5) {
            alert("Tên sản phẩm không hợp lệ");
            return false;
        } else {
            if (nodeGiaSp.value == "" || nodeGiaSp.value == null || nodeGiaSp.value < 0) {
                alert("Gía sản phẩm không hợp lệ")
                return false;
            } else {
                if (nodeHangSp.value.length < 3 || nodeHangSp.value == null || nodeHangSp.value == "") {
                    alert("Hãng sản phẩm không hợp lệ")
                    return false;
                } else {
                    alert("Thêm sản phẩm thành công!");
                }
            }
        }
    }

    let spMoi = {
        hinhanhsp: nodeHinhAnh.value,
        tensp: nodeTenSp.value,
        giasp: Number(nodeGiaSp.value),
        hangsp: nodeHangSp.value,
        id: Math.random().toString().substring(2, 10) + '-' + String(new Date().getTime())
    }
    console.log(spMoi);
    sanpham.push(spMoi);
    localStorage.setItem("localSanPham", JSON.stringify(sanpham));
    xuatSp(JSON.parse(localStorage.getItem('localSanPham')), 'danh-sach-sp');
}


// ------------------ xuat giao dien ---------------------
/**
 * 
 * @param {[]} arr 
 * @param {string} idNode 
 */
function xuatSp(arr, idNode) {
    let node = document.getElementById(idNode);
    console.log(node);
    node.innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
        node.innerHTML += `
        <div class="sanpham">
            <div class="xoa">
                <i onclick="xoaSP(${i})" class="fas fa-trash-alt"> </i>
            </div>
            <div class="hinhanh">
                <img src="${arr[i].hinhanhsp}">
            </div>
            <div class="id">
                    
            </div>
            <div class="ten">
                ${arr[i].tensp}
            </div>
            <div class="sao">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
            </div>
            <div class="gia">
                ${arr[i].giasp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </div>
            <div class="hang">
                ${arr[i].hangsp}
            </div>
            <button class="btn btnPrimary" onclick="clickSuaSp(${i})">Sửa sản phẩm</button>
     </div>
        `
    }
}
xuatSp(JSON.parse(localStorage.getItem("localSanPham")), 'danh-sach-sp');


// -----------------------  xoa san pham -------------------
/**
 * 
 * @param {number} viTri 
 */
function xoaSP(viTri) {
    console.log('xoa san pham o vi tri ${viTri} ');
    let arr = JSON.parse(localStorage.getItem("localSanPham"));
    arr.splice(viTri, 1);
    localStorage.setItem('localSanPham', JSON.stringify(arr));
    xuatSp(JSON.parse(localStorage.getItem("localSanPham")), 'danh-sach-sp');
}


// --------------------- tim kiem san pham -----------------------------
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
    let nodeSearch = document.getElementById('tim-sp')
    let search = JSON.parse(localStorage.getItem("localSanPham"))
    let arrKq = timKiem(search, nodeSearch.value)
    xuatSp(arrKq, "danh-sach-sp");
}


// ------------------------ sua san pham -------------------
let viTriCanSua;
/**
 * 
 * @param {number} viTri 
 */
function clickSuaSp(viTri) {
    viTriCanSua = viTri;
    console.log(viTri);
    let sanPhamCanSua = JSON.parse(localStorage.getItem('localSanPham'))[viTri];
    let nodeTen = document.getElementById('sua-ten-sp');
    let nodeGia = document.getElementById('sua-gia-sp');
    let nodeHang = document.getElementById('sua-hang-sp');
    let nodeHinhAnh = document.getElementById('sua-hinh-anh');

    nodeTen.value = sanPhamCanSua.tensp;
    nodeGia.value = sanPhamCanSua.giasp;
    nodeHang.value = sanPhamCanSua.hangsp;
    nodeHinhAnh.value = sanPhamCanSua.hinhanhsp;

    document.getElementById('pop-up-sua-sp').style.display = 'block';
}

// ------------------- cap nhat san pham -------------------
function clickCapNhatSp() {
    document.getElementById('pop-up-sua-sp').style.display = 'none';
    let nodeTen = document.getElementById('sua-ten-sp');
    let nodeGia = document.getElementById('sua-gia-sp');
    let nodeHang = document.getElementById('sua-hang-sp');
    let nodeHinhAnh = document.getElementById('sua-hinh-anh');

    let sanPhamMoi = JSON.parse(localStorage.getItem('localSanPham'));

    sanPhamMoi[viTriCanSua] = {
        hinhanhsp: nodeHinhAnh.value,
        tensp: nodeTen.value,
        giasp: Number(nodeGia.value),
        hangsp: nodeHang.value,
        id: sanPhamMoi[viTriCanSua].id,
    }

    localStorage.setItem('localSanPham', JSON.stringify(sanPhamMoi));
    xuatSp(JSON.parse(localStorage.getItem('localSanPham')), 'danh-sach-sp')
}


// -------------------- sắp xếp sản phẩm ------------------
function clickSapXepSpTangDan() {
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
    xuatSp(JSON.parse(localStorage.getItem('localSanPham')), 'danh-sach-sp')
}

function ckickSapXepSpGiamDan() {
    let tam;
    let arr = JSON.parse(localStorage.getItem("localSanPham"))
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
    xuatSp(JSON.parse(localStorage.getItem('localSanPham')), 'danh-sach-sp')
}


// -------------- huy sua san pham ------------
function clickOutAddSanPham() {
    document.getElementById('pop-up-them-sp').style.display = 'none';
}

function clickHuySuaSanPham() {
    document.getElementById('pop-up-sua-sp').style.display = 'none';
}

// 
function clickShowAddSp() {
    document.getElementById('pop-up-them-sp').style.display = 'block';
}
