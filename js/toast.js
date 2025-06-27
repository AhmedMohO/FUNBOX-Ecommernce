// Toast notification functionality
let toast = null;
let progress = null;
let timer1;
let timer2;
function initializeToast() {
    const toastHTML = `
        <div class="toast">
            <div class="toast-content">
                <i class="fas fa-solid fa-check check"></i>
                <div class="message">
                    <span class="text text-1">Success</span>
                    <span class="text text-2">Your Cart Has Been Successfully Updated!</span>
                </div>
            </div>
            <i class="fa-solid fa-xmark close"></i>
            <div class="progress"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', toastHTML);
    toast = document.querySelector(".toast");
    progress = document.querySelector(".progress");
    const closeIcon = document.querySelector(".close");
    closeIcon === null || closeIcon === void 0 ? void 0 : closeIcon.addEventListener("click", hideToast);
}
function hideToast() {
    toast === null || toast === void 0 ? void 0 : toast.classList.remove("active");
    setTimeout(() => {
        progress === null || progress === void 0 ? void 0 : progress.classList.remove("active");
    }, 300);
    clearTimeout(timer1);
    clearTimeout(timer2);
}
export function generateToast(checkColor) {
    if (!toast)
        return;
    document.querySelector('.toast .toast-content .check').style.backgroundColor = `${checkColor}`;
    toast.classList.add("active");
    progress === null || progress === void 0 ? void 0 : progress.classList.add("active");
    clearTimeout(timer1);
    clearTimeout(timer2);
    timer1 = setTimeout(() => {
        toast === null || toast === void 0 ? void 0 : toast.classList.remove("active");
    }, 2000);
    timer2 = setTimeout(() => {
        progress === null || progress === void 0 ? void 0 : progress.classList.remove("active");
    }, 2300);
}
document.addEventListener('DOMContentLoaded', initializeToast);
