function show_sidebar() {
    const sc = document.querySelector("#sidebar-container-new");
    document.querySelector("nav").style.height = "100%";
    sc.style.display = "";
    sc.removeAttribute("data-hidden");
    document.querySelector("#header-toggle-sidebar-btn").classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function hide_sidebar() {
    const sc = document.querySelector("#sidebar-container-new");
    document.querySelector("nav").style.height = "";
    sc.style.display = "none";
    sc.setAttribute("data-hidden", "true");
    document.querySelector("#header-toggle-sidebar-btn").classList.add("hidden");

    document.body.style.overflow = "initial";
}

function toggle_sidebar() {
    const sc = document.querySelector("#sidebar-container-new");
    if (sc) {
        if (sc.hasAttribute("data-hidden")) {
            show_sidebar();
        } else {
            hide_sidebar();
        }
    }
}

function url_extract_page(url) {
    const pg = url.match(/pages\/([^/]*)?$/);
    if (pg != null) {
        return pg[1];
    }
    return null;
}

function breadcrumb_show(e) {
    document.querySelector("#sidebar-container-new");
    const hdr_anchor = e.getAttribute("data-header-anchor");
    if (hdr_anchor !== null) {
        const menu_items = [...document.querySelectorAll("#sidebar-container-new div.header")];
        const hdr = menu_items.find(e => e.getAttribute("data-header-anchor") == hdr_anchor);
        if (hdr) {
            show_sidebar();
            $(hdr).transition("glow");
        }
    } else {
        const item_anchor = e.getAttribute("data-anchor");
        const menu_items = [...document.querySelectorAll("#sidebar-container-new a.item")];
        const item = menu_items.find(e => e.href == item_anchor);
        console.log(item_anchor);
        if (item) {
            show_sidebar();
            $(item).transition("glow");
        }
    }
}

function resize_handler() {
    const real_header_height = document.querySelector("header").getBoundingClientRect().height.toFixed(2);
    document.documentElement.style.setProperty("--current-header-height", `${(real_header_height)}px`);
    const mq = window.matchMedia("only screen and (max-width: 768px)");
    if (mq.matches) {
        document.querySelector("aside div.menu")?.classList.add("huge");
    } else {
        document.querySelector("aside div.menu")?.classList.remove("huge");
    }
}

window.addEventListener("load", () => {
    document.querySelector("#sidebar-container-new aside").innerHTML = `<div class="ui vertical menu">
        <div class="item">
            <div class="header" data-header-anchor="hdr-api">API</div>
            <div class="menu">
                <a class="item" href="../pages/index.html">Что такое API?</a>
                <a class="item" href="../pages/web_api.html">API в контексте веб-технологий</a>
            </div>
        </div>
        <div class="item">
            <div class="header" data-header-anchor="hdr-arch">Архитектуры Web-API</div>
            <div class="menu">
                <a class="item" href="../pages/rest.html">REST</a>
                <a class="item" href="../pages/soap.html">SOAP</a>
            </div>
        </div>
        <div class="item">
            <div class="header" data-header-anchor="hdr-lang">Языки сериализации в Web-API</div>
            <div class="menu">
                <a class="item" href="../pages/json.html">JSON</a>
                <a class="item" href="../pages/xml.html">XML</a>
            </div>
        </div>
        <div class="item">
            <div class="header" data-header-anchor="hdr-overview">Обзор Web-API</div>
            <div class="menu">
                <a class="item" href="../pages/web_api_examples.html">Виды</a>
                <a class="item" href="../pages/choosing_web_api.html">Как выбрать</a>
                <a class="item" href="../pages/api_problems.html">Проблемы</a>
                <a class="item" href="../pages/web_api_usage.html">Применение на практике</a>
            </div>
        </div>
    </div>`;

    document.querySelector("#header-toggle-sidebar-btn").addEventListener("click", toggle_sidebar);
    document.querySelector("#sidebar-blur-new").addEventListener("click", hide_sidebar);

    const thispg = url_extract_page(window.location.href) || "index.html";
    const thispg_match = [...document.querySelectorAll("#sidebar-container-new a.item")]
        .map(e => [url_extract_page(e.href), e]).filter(e => e[0] !== null).find(e => e[0] === thispg);
    if (thispg_match !== undefined) {
        const thispg_el = thispg_match[1];
        thispg_el.classList.add("active");
        const hdr = thispg_el.parentElement.parentElement.querySelector(".header");
        const bc = document.querySelector("#breadcrumb-container");
        bc.style.height = "";
        bc.innerHTML = `
    <div class="ui breadcrumb">
        <a class="section" onclick="breadcrumb_show(this);" data-header-anchor="${hdr.getAttribute("data-header-anchor")}">${hdr.textContent}</a>
        <div class="divider"> / </div>
        <a class="active section" onclick="breadcrumb_show(this);" data-anchor="${thispg_el.href}">${thispg_el.textContent}</a>
    </div>
    `;
    }
    window.addEventListener("resize", resize_handler);
    resize_handler();
});