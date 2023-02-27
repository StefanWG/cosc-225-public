const ns = "http://www.w3.org/2000/svg";

const box = document.querySelector("#dot-box");
box.addEventListener("click", drawDot);

function drawDot(e) {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dot = document.createElementNS(ns, "circle");
    dot.setAttributeNS(null, "cx", x);
    dot.setAttributeNS(null, "cy", y);
    dot.classList.add("dot");

    box.appendChild(dot);
}
