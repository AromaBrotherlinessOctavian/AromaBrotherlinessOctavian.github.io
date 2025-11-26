var nav_xml = new DOMParser().parseFromString(
    `<?xml version="1.0" encoding="utf-8"?>
<nav>
    <page href="/pages/web_api_usage.html" title="Применение Web-API на сайтах"/>
    <page href="/pages/index.html" title="Главная страница - Что такое API?"/>
    <page href="/pages/web_api.html" title="Web-API">
        <page href="/pages/rest.html" title="REST">
            <page href="/pages/json.html" title="JSON"/>
        </page>
        <page href="/pages/soap.html" title="SOAP">
            <page href="/pages/xml.html" title="XML"/>
        </page>
        <page href="/pages/web_api_examples.html" title="Примеры Web-API"/>
        <page href="/pages/choosing_web_api.html" title="Выбор Web-API"/>
        <page href="/pages/api_problems.html" title="Проблемы API"/>
    </page>
</nav>`
    , "text/xml");

function nav_dfs(cb, node = nav_xml.documentElement) {
    for (const e of [...node.children]) {
        if (cb(e)) {
            return true;
        }
        if (nav_dfs(cb, e)) {
            return true;
        }
    }
    return false;
}

function nav_hierarchy(current_page) {
    let found = null;
    nav_dfs(el => {
        if (current_page.endsWith(el.getAttribute("href"))) {
            found = el;
            return true;
        }
        return false;
    });
    if (!found) {
        throw new Error(`nav_hierarchy failed for ${current_page}`);
    }
    const result = [];
    while (found && found.tagName != "nav") {
        result.unshift(found);
        found = found.parentElement;
    }
    if (!result.length) {
        throw new Error(`nav_hierarchy empty for ${current_page}`);
    }
    return result;
}

function nav_hierarchy_html(current_page) {
    const hierarchy = nav_hierarchy(current_page);
    const result = document.createElement("div");
    result.classList.add("header-nav-breadcrumbs-list");
    for (let i = 0; i < (hierarchy.length - 1); ++i) {
        const item = document.createElement("a");
        item.classList.add("header-nav-link");
        item.setAttribute("href", ".." + hierarchy[i].getAttribute("href"));
        item.appendChild(document.createTextNode(hierarchy[i].getAttribute("title")));
        result.appendChild(item);
        const divider_img = document.createElement("img");
        divider_img.src = "../images/chevron-right.svg";
        divider_img.setAttribute("alt", ">");
        divider_img.setAttribute("title", "Divider");
        divider_img.classList.add("header-nav-divider-img");
        result.appendChild(divider_img);
    }
    const item = document.createElement("a");
    item.classList.add("header-nav-link");
    item.setAttribute("href", ".." + hierarchy[hierarchy.length - 1].getAttribute("href"));
    item.appendChild(document.createTextNode(hierarchy[hierarchy.length - 1].getAttribute("title")));
    result.appendChild(item);
    return result;
}

function nav_toggle_tree_btn_callback() {
    const root = this.parentElement.parentElement;
    const subtree = root.querySelector(".sidebar-nav-subtree");
    if (subtree.hasAttribute("data-hidden")) {
        subtree.removeAttribute("data-hidden");
        subtree.classList.remove("hidden");
        root.querySelector(".sidebar-nav-tree-toggle-img").classList.add("expanded");
    } else {
        subtree.setAttribute("data-hidden", "");
        subtree.classList.add("hidden");
        root.querySelector(".sidebar-nav-tree-toggle-img").classList.remove("expanded");
    }
}

function get_current_page_() {
    const pn = (new URL(window.location.href)).pathname;
    if (pn == "/") {
        return "/pages/index.html";
    }
    return pn;
}

//http://detectmobilebrowsers.com/download/javascript
function check_mobile() {
    const ua = (navigator.userAgent || navigator.vendor || window.opera);
    return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(ua)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4)));
}

function nav_html_graph(el = null) {
    let result = null;
    if (el === null) {
        result = [];
        for (const e of [...nav_xml.documentElement.children]) {
            result.push(nav_html_graph(e));
        }
        if (check_mobile()) {
            const crutch = document.createElement("div");
            crutch.classList.add("mobile-title-bar-sidebar-overflow-crutch");
            result.push(crutch);
        }
        return result;
    } else {
        result = document.createElement("div");
        result.classList.add("sidebar-nav-item");
        const link_container = document.createElement("div");
        link_container.classList.add("sidebar-nav-link-container");
        if (el.children.length) {
            link_container.classList.add("tree");
            const toggle_img = document.createElement("img");
            toggle_img.src = "../images/chevron-right.svg";
            toggle_img.setAttribute("alt", ">");
            toggle_img.setAttribute("title", "Toggle tree");
            toggle_img.classList.add("sidebar-nav-tree-toggle-img");
            toggle_img.classList.add("expanded");
            toggle_img.addEventListener("click", nav_toggle_tree_btn_callback);
            link_container.appendChild(toggle_img);
        }
        const link_with_bg = document.createElement("div");
        link_with_bg.classList.add("sidebar-nav-link-with-bg");
        const link = document.createElement("a");
        link.classList.add("sidebar-nav-link");
        const href = el.getAttribute("href");
        if (href && get_current_page_().endsWith(href)) {
            link_container.classList.add("active");
            link_with_bg.classList.add("active");
            link.classList.add("active");
        }
        link.setAttribute("href", ".." + href);
        link.appendChild(document.createTextNode(el.getAttribute("title")));
        link_with_bg.appendChild(link);
        link_container.appendChild(link_with_bg);
        result.appendChild(link_container);
        if (el.children.length) {
            const children_list = document.createElement("div");
            children_list.classList.add("sidebar-nav-subtree");
            for (const e of [...el.children]) {
                children_list.appendChild(nav_html_graph(e));
            }
            result.appendChild(children_list);
        }
    }
    return result;
}

window.addEventListener("load", () => {
    document.querySelector("#sidebar-nav-list").replaceChildren(...nav_html_graph());
    document.querySelector("#header-breadcrumbs").replaceChildren(nav_hierarchy_html(get_current_page_()));
});

let is_mobile = false;

function show_desktop_sidebar() {
    const scf = document.querySelector("#sidebar-container");
    scf.classList.remove("hidden");
    scf.removeAttribute("data-hidden");
    document.querySelector("#sidebar-content").classList.remove("hidden");
    document.querySelector("#header-toggle-sidebar-btn").classList.remove("hidden");
    document.querySelector("#sidebar-blur").classList.add("hidden");

    document.body.classList.remove("no-overflow");
    document.documentElement.style.setProperty("--current-sidebar-width",
        getComputedStyle(document.documentElement).getPropertyValue("--max-sidebar-width"));
}

function show_mobile_sidebar() {
    const scf = document.querySelector("#sidebar-container");
    scf.classList.remove("hidden");
    scf.removeAttribute("data-hidden");
    document.querySelector("#sidebar-content").classList.remove("hidden");
    document.querySelector("#header-toggle-sidebar-btn").classList.remove("hidden");
    document.querySelector("#sidebar-blur").classList.remove("hidden");

    document.body.classList.add("no-overflow");
    document.documentElement.style.setProperty("--current-sidebar-width", "0px");
}

function hide_sidebar() {
    const scf = document.querySelector("#sidebar-container");
    scf.classList.add("hidden");
    scf.setAttribute("data-hidden", "");
    document.querySelector("#sidebar-content").classList.add("hidden");
    document.querySelector("#header-toggle-sidebar-btn").classList.add("hidden");
    document.querySelector("#sidebar-blur").classList.add("hidden");

    document.body.classList.remove("no-overflow");
    document.documentElement.style.setProperty("--current-sidebar-width", "0px");
}

function toggle_sidebar() {
    const sc = document.querySelector("#sidebar-container");
    if (sc) {
        if (sc.hasAttribute("data-hidden")) {
            if (is_mobile) {
                show_mobile_sidebar();
            } else {
                show_desktop_sidebar();
            }
        } else {
            hide_sidebar();
        }
    }
}

function update_sidebar() {
    const sc = document.querySelector("#sidebar-container");
    if (sc) {
        if (sc.hasAttribute("data-hidden")) {
            hide_sidebar();
        } else {
            if (is_mobile) {
                show_mobile_sidebar();
            } else {
                show_desktop_sidebar();
            }
        }
    }
}

let scroll_accumulator = 0;
function resize_handler() {
    is_mobile = (window.innerWidth < 768);
    update_sidebar();

    const real_header_height = document.querySelector("#header-container").getBoundingClientRect().height.toFixed(2);
    document.documentElement.style.setProperty("--current-header-height", `${(real_header_height - scroll_accumulator)}px`);
}

let prev_scroll = 0;
let prev_scroll_percent = 0;
function scroll_handler() {
    const hc = document.querySelector("#header-container");
    if (hc) {
        const real_header_height = hc.getBoundingClientRect().height.toFixed(2);
        if ((real_header_height / window.innerHeight) > 0.2) {
            const current_scroll = window.pageYOffset;
            const header = document.getElementById("header-container");

            const current_scroll_percent = current_scroll / window.scrollMaxY;
            if (current_scroll > (window.scrollMaxY - 1)) {
                return;
            }
            if (prev_scroll_percent > current_scroll_percent) {
                header.style.top = "0";
                scroll_accumulator = 0;
                document.documentElement.style.setProperty("--current-header-height", `${(real_header_height)}px`);
            } else {
                scroll_accumulator += (Math.abs(current_scroll - prev_scroll));
                scroll_accumulator = Math.min(scroll_accumulator, real_header_height);
                header.style.top = `-${scroll_accumulator}px`;
                document.documentElement.style.setProperty("--current-header-height", `${(real_header_height - scroll_accumulator)}px`);
            }
            prev_scroll = current_scroll;
            prev_scroll_percent = current_scroll_percent;
        } else {
            const header = document.getElementById("header-container");
            header.style.top = "0";
            scroll_accumulator = 0;
            document.documentElement.style.setProperty("--current-header-height", `${(real_header_height)}px`);
        }
    }
}

window.addEventListener("load", () => {
    document.querySelector("#header-toggle-sidebar-btn").addEventListener("click", toggle_sidebar);
    document.querySelector("#sidebar-blur").addEventListener("click", hide_sidebar);
    resize_handler();
});

window.addEventListener("resize", resize_handler);

window.addEventListener("scroll", scroll_handler);