const cont = document.querySelector(".container")
const detail = document.querySelector(".QR_Details")
updatedinfo = document.getElementById("inputdetail")
form = document.querySelector("form")
inp_file = form.querySelector("input")
qr_info = form.querySelector("p")
close_btn = document.querySelector(".close")
cpy_btn = document.querySelector(".copy")
contentdisable = document.querySelector(".content")


function fetchrequest(data, file) {
    updatedinfo.innerText = "Scanning QR Code...";
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: 'POST',
        body: data
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data
        updatedinfo.innerText = result
        cont.classList.add("active");
        detail.classList.add("QR_active")
        contentdisable.classList.add("contentdisable")
        form.querySelector("img").src = URL.createObjectURL(file)
        console.log(result)
    })

}

form.addEventListener("click", () => inp_file.click());

inp_file.addEventListener("change", e => {
    let file = e.target.files[0]
    let fdata = new FormData();
    fdata.append("file", file)
    fetchrequest(fdata, file)
    console.log(file, fdata)
})
cpy_btn.addEventListener("click", () => {
    let text = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
    setTimeout(copiedmsg, 500);
});
close_btn.addEventListener("click", () => {
    cont.classList.remove("active");
    detail.classList.remove("QR_active")
    contentdisable.classList.remove("contentdisable")

});

function copiedmsg() {
    alert("Text copied")
}