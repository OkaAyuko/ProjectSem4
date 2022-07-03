function reDisable() {
    document.getElementById('fullname').readOnly = false;
    document.getElementById('dob').readOnly = false;
    document.getElementById('phone').readOnly = false;
    document.getElementById('email').readOnly = false;
    document.getElementById('identitycard').readOnly = false;
    document.getElementById('save').style.display = "inline-block";
    document.getElementById('cancel').style.display = " inline-block";
    document.getElementById('edit').style.display = "none";
}