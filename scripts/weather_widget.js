const api_url = "https://api.open-meteo.com/v1/forecast?latitude=55.5807297&longitude=36.725911&\
daily=weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code\
&current=weather_code,temperature_2m,relative_humidity_2m,wind_speed_10m\
&timezone=Europe%2FMoscow&wind_speed_unit=ms&temperature_unit=celsius";
const city_name = "Москва";
$(document)
    .ready(function () {
        $(".ui.dropdown").dropdown();
        $(".ui.checkbox").checkbox();
        $(".ui.accordion").accordion();
        $(".ui.dimmer").dimmer({ on: "hover" });
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort(), 5000); //5 second timeout
        fetch(api_url, { signal })
            .then(response => {
                clearTimeout(timeoutId);
                if(response.status !== 200) {
                    console.log(response);
                    throw Error("Response not 200");
                }
                return response.json();
            }).then(response => {
                init_weather_widget(city_name, JSON.stringify(response));
            }).catch(e => {
                console.log(e);
                init_weather_widget(city_name, hardcoded_good_api_response);
                widget_display_error("Ошибка подключения к API! Будут использованы захардкоженные данные");
            });
    })
    ;
function init_weather_widget(city_name, json_text) {
    mount_weather_widget(parse_weather_data(city_name, JSON.parse(json_text)));
    const vwr = document.createElement("andypf-json-viewer");
    vwr.data = json_text;
    const hdr = document.createElement("h1");
    hdr.style.wordBreak = "anywhere";
    hdr.style.whiteSpace = "initial";
    hdr.appendChild(document.createTextNode(`Просмотр JSON ответа от API - `));
    const lnk = document.createElement("a");
    lnk.setAttribute("href", api_url);
    lnk.appendChild(document.createTextNode(api_url));
    hdr.appendChild(lnk);
    document.querySelector("#json-viewer").replaceChildren(hdr, vwr);
}
const hardcoded_good_api_response = "{\"latitude\":55.5625,\"longitude\":36.75,\"generationtime_ms\":0.16319751739501953,\"utc_offset_seconds\":10800,\"timezone\":\"Europe/Moscow\",\"timezone_abbreviation\":\"GMT+3\",\"elevation\":200.0,\"current_units\":{\"time\":\"iso8601\",\"interval\":\"seconds\",\"weather_code\":\"wmo code\",\"temperature_2m\":\"°C\",\"relative_humidity_2m\":\"%\",\"wind_speed_10m\":\"m/s\"},\"current\":{\"time\":\"2025-11-26T14:15\",\"interval\":900,\"weather_code\":53,\"temperature_2m\":1.1,\"relative_humidity_2m\":99,\"wind_speed_10m\":1.30},\"hourly_units\":{\"time\":\"iso8601\",\"temperature_2m\":\"°C\",\"relative_humidity_2m\":\"%\",\"wind_speed_10m\":\"m/s\",\"weather_code\":\"wmo code\"},\"hourly\":{\"time\":[\"2025-11-26T00:00\",\"2025-11-26T01:00\",\"2025-11-26T02:00\",\"2025-11-26T03:00\",\"2025-11-26T04:00\",\"2025-11-26T05:00\",\"2025-11-26T06:00\",\"2025-11-26T07:00\",\"2025-11-26T08:00\",\"2025-11-26T09:00\",\"2025-11-26T10:00\",\"2025-11-26T11:00\",\"2025-11-26T12:00\",\"2025-11-26T13:00\",\"2025-11-26T14:00\",\"2025-11-26T15:00\",\"2025-11-26T16:00\",\"2025-11-26T17:00\",\"2025-11-26T18:00\",\"2025-11-26T19:00\",\"2025-11-26T20:00\",\"2025-11-26T21:00\",\"2025-11-26T22:00\",\"2025-11-26T23:00\",\"2025-11-27T00:00\",\"2025-11-27T01:00\",\"2025-11-27T02:00\",\"2025-11-27T03:00\",\"2025-11-27T04:00\",\"2025-11-27T05:00\",\"2025-11-27T06:00\",\"2025-11-27T07:00\",\"2025-11-27T08:00\",\"2025-11-27T09:00\",\"2025-11-27T10:00\",\"2025-11-27T11:00\",\"2025-11-27T12:00\",\"2025-11-27T13:00\",\"2025-11-27T14:00\",\"2025-11-27T15:00\",\"2025-11-27T16:00\",\"2025-11-27T17:00\",\"2025-11-27T18:00\",\"2025-11-27T19:00\",\"2025-11-27T20:00\",\"2025-11-27T21:00\",\"2025-11-27T22:00\",\"2025-11-27T23:00\",\"2025-11-28T00:00\",\"2025-11-28T01:00\",\"2025-11-28T02:00\",\"2025-11-28T03:00\",\"2025-11-28T04:00\",\"2025-11-28T05:00\",\"2025-11-28T06:00\",\"2025-11-28T07:00\",\"2025-11-28T08:00\",\"2025-11-28T09:00\",\"2025-11-28T10:00\",\"2025-11-28T11:00\",\"2025-11-28T12:00\",\"2025-11-28T13:00\",\"2025-11-28T14:00\",\"2025-11-28T15:00\",\"2025-11-28T16:00\",\"2025-11-28T17:00\",\"2025-11-28T18:00\",\"2025-11-28T19:00\",\"2025-11-28T20:00\",\"2025-11-28T21:00\",\"2025-11-28T22:00\",\"2025-11-28T23:00\",\"2025-11-29T00:00\",\"2025-11-29T01:00\",\"2025-11-29T02:00\",\"2025-11-29T03:00\",\"2025-11-29T04:00\",\"2025-11-29T05:00\",\"2025-11-29T06:00\",\"2025-11-29T07:00\",\"2025-11-29T08:00\",\"2025-11-29T09:00\",\"2025-11-29T10:00\",\"2025-11-29T11:00\",\"2025-11-29T12:00\",\"2025-11-29T13:00\",\"2025-11-29T14:00\",\"2025-11-29T15:00\",\"2025-11-29T16:00\",\"2025-11-29T17:00\",\"2025-11-29T18:00\",\"2025-11-29T19:00\",\"2025-11-29T20:00\",\"2025-11-29T21:00\",\"2025-11-29T22:00\",\"2025-11-29T23:00\",\"2025-11-30T00:00\",\"2025-11-30T01:00\",\"2025-11-30T02:00\",\"2025-11-30T03:00\",\"2025-11-30T04:00\",\"2025-11-30T05:00\",\"2025-11-30T06:00\",\"2025-11-30T07:00\",\"2025-11-30T08:00\",\"2025-11-30T09:00\",\"2025-11-30T10:00\",\"2025-11-30T11:00\",\"2025-11-30T12:00\",\"2025-11-30T13:00\",\"2025-11-30T14:00\",\"2025-11-30T15:00\",\"2025-11-30T16:00\",\"2025-11-30T17:00\",\"2025-11-30T18:00\",\"2025-11-30T19:00\",\"2025-11-30T20:00\",\"2025-11-30T21:00\",\"2025-11-30T22:00\",\"2025-11-30T23:00\",\"2025-12-01T00:00\",\"2025-12-01T01:00\",\"2025-12-01T02:00\",\"2025-12-01T03:00\",\"2025-12-01T04:00\",\"2025-12-01T05:00\",\"2025-12-01T06:00\",\"2025-12-01T07:00\",\"2025-12-01T08:00\",\"2025-12-01T09:00\",\"2025-12-01T10:00\",\"2025-12-01T11:00\",\"2025-12-01T12:00\",\"2025-12-01T13:00\",\"2025-12-01T14:00\",\"2025-12-01T15:00\",\"2025-12-01T16:00\",\"2025-12-01T17:00\",\"2025-12-01T18:00\",\"2025-12-01T19:00\",\"2025-12-01T20:00\",\"2025-12-01T21:00\",\"2025-12-01T22:00\",\"2025-12-01T23:00\",\"2025-12-02T00:00\",\"2025-12-02T01:00\",\"2025-12-02T02:00\",\"2025-12-02T03:00\",\"2025-12-02T04:00\",\"2025-12-02T05:00\",\"2025-12-02T06:00\",\"2025-12-02T07:00\",\"2025-12-02T08:00\",\"2025-12-02T09:00\",\"2025-12-02T10:00\",\"2025-12-02T11:00\",\"2025-12-02T12:00\",\"2025-12-02T13:00\",\"2025-12-02T14:00\",\"2025-12-02T15:00\",\"2025-12-02T16:00\",\"2025-12-02T17:00\",\"2025-12-02T18:00\",\"2025-12-02T19:00\",\"2025-12-02T20:00\",\"2025-12-02T21:00\",\"2025-12-02T22:00\",\"2025-12-02T23:00\"],\"temperature_2m\":[0.3,0.4,0.4,0.3,0.2,0.3,0.4,0.4,0.3,0.5,0.6,0.9,1.0,1.2,1.2,1.2,1.2,1.2,1.3,1.5,1.7,1.9,2.2,2.6,3.2,3.6,3.9,3.9,3.9,3.8,3.7,3.7,3.6,3.5,3.6,3.6,3.8,4.1,4.4,4.7,4.8,5.0,5.1,5.3,5.5,5.7,6.0,6.2,6.4,6.5,6.4,6.2,6.0,5.2,3.3,1.7,1.3,1.3,1.3,1.4,1.7,1.8,2.0,1.9,1.4,1.0,0.4,0.4,0.5,0.0,-0.3,-0.4,-0.0,-0.1,-0.2,-0.2,-0.5,-0.6,-0.5,-0.3,-0.2,-0.0,0.4,0.7,1.3,1.7,2.2,2.4,2.5,2.5,2.7,3.2,3.8,4.3,4.6,4.7,4.8,4.9,5.0,5.0,4.8,4.5,4.2,4.0,3.7,3.5,3.5,3.6,3.7,3.8,3.8,3.7,3.1,2.2,1.6,1.5,1.6,1.7,1.8,1.9,2.0,2.1,2.2,2.3,2.4,2.6,2.7,2.7,2.4,2.1,-1.6,-0.9,-0.4,-0.3,-0.5,-0.6,-0.7,-0.9,-0.9,-0.9,-0.8,-0.7,-0.7,-0.6,-0.5,-0.3,-0.2,-0.0,0.1,0.2,0.3,0.4,0.5,0.6,0.8,1.1,1.3,1.5,1.6,1.8,1.9,2.0,2.1,2.3,2.4,2.5,2.5,2.6],\"relative_humidity_2m\":[97,97,98,99,99,99,99,99,99,100,100,99,99,99,99,99,99,99,99,99,99,99,99,99,99,98,98,98,98,97,97,97,97,98,97,97,97,97,98,98,98,98,98,98,98,98,98,98,98,98,98,98,95,97,93,91,92,93,92,90,88,87,86,86,88,91,91,91,91,92,94,95,94,91,92,94,91,93,95,90,91,93,89,88,86,83,81,83,86,90,93,95,97,98,99,99,98,96,93,91,90,89,89,89,90,90,88,85,83,81,81,81,84,89,92,92,91,91,92,94,95,96,96,96,96,96,96,97,97,98,92,91,91,92,93,94,95,95,96,96,97,97,97,98,98,98,97,97,97,97,97,97,97,97,97,96,96,96,96,96,97,97,98,98,98,98,98,98],\"wind_speed_10m\":[1.40,1.60,1.63,1.30,1.22,1.24,1.12,1.04,0.51,0.32,0.50,0.50,0.81,1.02,1.30,1.26,1.70,1.40,1.80,1.61,1.73,1.43,1.36,1.08,0.98,1.40,1.60,1.80,1.70,1.90,2.14,2.30,2.32,2.72,2.63,2.80,2.70,2.70,2.70,2.73,2.45,2.42,2.55,2.16,2.21,2.19,2.02,2.28,2.16,2.20,1.75,1.78,2.40,2.28,2.73,2.33,2.22,2.73,2.60,3.06,2.11,2.72,2.40,1.87,1.66,1.75,1.42,1.44,1.50,1.56,1.41,1.41,1.77,1.72,1.80,2.28,2.11,1.75,1.78,2.06,1.66,1.71,2.15,2.06,2.21,1.84,1.71,1.70,1.71,1.73,1.84,1.96,2.18,2.31,2.31,2.26,2.33,2.51,2.70,2.81,2.72,2.62,2.52,2.51,2.50,2.50,2.60,2.70,2.70,2.51,2.22,1.92,1.71,1.50,1.30,1.20,1.14,1.08,1.08,1.04,1.02,0.92,0.63,0.45,0.22,0.22,0.51,1.08,1.55,1.88,1.39,1.49,1.56,1.50,1.50,1.42,1.27,1.22,1.21,1.30,1.34,1.34,1.25,1.21,1.12,1.08,1.04,1.04,1.04,1.17,1.21,1.21,1.21,1.21,1.21,1.25,1.25,1.25,1.12,1.12,1.12,1.17,1.17,1.17,1.14,1.14,1.20,1.27],\"weather_code\":[71,71,71,71,71,77,77,77,71,77,53,61,61,53,53,53,61,61,53,61,61,61,61,61,3,3,3,3,3,51,3,3,3,3,55,51,3,51,61,3,61,61,61,61,53,51,3,3,61,3,61,3,3,61,3,3,3,3,3,3,3,3,3,3,2,3,2,3,2,2,2,2,3,3,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,3,3,3,3,3,3,61,61,61,3,3,3,3,3,3,3,3,3,3,3,3,45,45,45,45,45,45,45,45,45,3,3,3,77,77,77,77,77,77,3,3,3,3,3,3,3,3,3,61,61,61,51,51,51,3,3]},\"daily_units\":{\"time\":\"iso8601\",\"weather_code\":\"wmo code\"},\"daily\":{\"time\":[\"2025-11-26\",\"2025-11-27\",\"2025-11-28\",\"2025-11-29\",\"2025-11-30\",\"2025-12-01\",\"2025-12-02\"],\"weather_code\":[77,61,61,3,61,61,77]}}";
function parse_weather_data(city_name, api_response) {
    const per_hour_for_entire_week = [];
    const day_list = [];
    for (let i = 0; i < api_response.daily.time.length; ++i) {
        let time_string = api_response.daily.time[i];
        let timestamp = (new Date(time_string + "T00:00+03:00")).getTime() / 1000;
        let dt = new Date(time_string);
        const short_month_day = new Intl.DateTimeFormat("ru-RU", { month: "short", day: "2-digit" }).format(dt);
        const day_of_the_week = new Intl.DateTimeFormat("ru-RU", { weekday: "short" }).format(dt);
        let weather_code = api_response.daily.weather_code[i];
        day_list.push({
            short_month_day,
            day_of_the_week,
            weather_code,
            timestamp
        });
    }

    function get_day(timestamp) {
        timestamp = Number(timestamp);
        let result_day = null;
        for (day of day_list) {
            if (!result_day) {
                result_day = day;
            }
            if (timestamp >= day.timestamp) {
                if (day.timestamp >= result_day.timestamp) {
                    result_day = day;
                }
            }
        }
        if (!result_day || timestamp >= (result_day.timestamp + 86400)) {
            throw Error(`bad day in timestamp ${timestamp}`);
        }
        return result_day;
    }

    const per_day_hourly_data = {};
    for (let i = 0; i < api_response.hourly.time.length; ++i) {
        let time_string = api_response.hourly.time[i] + "+03:00";
        let dt = new Date(time_string);
        let timestamp = dt.getTime() / 1000;
        let temperature = api_response.hourly.temperature_2m[i];
        let wind = api_response.hourly.wind_speed_10m[i];
        let humidity = api_response.hourly.relative_humidity_2m[i];
        let weather_code = api_response.hourly.weather_code[i];
        const day_ts = get_day(timestamp).timestamp;
        if (!per_day_hourly_data[day_ts]) {
            per_day_hourly_data[day_ts] = [];
        }
        per_day_hourly_data[day_ts].push({
            hour: dt.getHours(),
            weather_code,
            temperature,
            wind,
            humidity
        });
    }

    function get_day_summary(hourly_data) {
        let night_hour = hourly_data[0];
        for (e of hourly_data) {
            if (e.hour <= night_hour.hour) {
                night_hour = e;
            }
        }
        let day_hour = hourly_data[0];
        for (e of hourly_data) {
            if (e.hour <= 12) {
                if (e.hour >= day_hour.hour) {
                    day_hour = e;
                }
            }
        }
        return {
            day: day_hour,
            night: night_hour,
            now: null
        };
    }
    const current_day = get_day((new Date(api_response.current.time + "+03:00")).getTime() / 1000);
    for (const [ts, v] of Object.entries(per_day_hourly_data)) {
        const day = get_day(ts);
        day.summary = get_day_summary(v);
        if (day == current_day) {
            day.summary.now = {
                weather_code: api_response.current.weather_code,
                temperature: api_response.current.temperature_2m,
                wind: api_response.current.wind_speed_10m,
                humidity: api_response.current.relative_humidity_2m
            };
        }
        day.hourly_data = v;
    }

    return {
        city: city_name,
        daily_forecast: day_list
    };
}
function widget_display_error(text, duration = 5000) {
    const msg = document.createElement("div");
    msg.classList.add("ui", "floating", "message", "negative");
    const close_icon = document.createElement("i");
    close_icon.classList.add("close", "icon");
    close_icon.addEventListener("click", () => {
        msg.parentElement.removeChild(msg);
    });
    msg.appendChild(close_icon);
    msg.appendChild(document.createTextNode(text));
    document.querySelector("#weather-widget").children[0].prepend(msg);
    setTimeout(() => {
        msg.parentElement?.removeChild(msg);
    }, duration);
}
function day_menu_onclick(el) {
    const new_tab = el.getAttribute("data-day-menu-tab");
    for (const child of [...el.parentElement.children]) {
        if (child != el) {
            child.classList.remove("active");
        }
    }
    el.classList.add("active");
    document.querySelectorAll(".day-menu-content").forEach(el => {
        if (el.getAttribute("data-day-menu-tab") != new_tab) {
            el.style.display = "none";
        } else {
            el.style.display = "";
        }
    });
}
function switch_weather_view_onclick(el) {
    const new_tab = el.getAttribute("data-view-menu-tab");
    for (const child of [...el.parentElement.children]) {
        if (child != el) {
            child.classList.remove("active");
        }
    }
    el.classList.add("active");
    document.querySelectorAll(".view-menu-content").forEach(el => {
        if (el.getAttribute("data-view-menu-tab") != new_tab) {
            el.style.display = "none";
        } else {
            el.style.display = "";
        }
    });
}
function weather_code_get_icon(code) {
    if (code < 10) {//0-9
        return "fa-solid fa-sun";
    } else if (code < 20) {//10-19
        return "fa-solid fa-cloud-bolt";
    } else if (code < 30) {//20-29
        return "fa-solid fa-cloud-rain";
    } else if (code < 50) {//30-49
        return "fa-solid fa-smog";
    } else if (code < 70) {//50-69
        return "fa-solid fa-cloud-rain";
    } else if (code < 80) {//70-79
        return "fa-solid fa-snowflake";
    } else if (code < 85) {//80-84
        return "fa-solid fa-cloud-rain";
    } else if (code < 95) {//85-94
        return "fa-solid fa-snowflake";
    } else if (code < 100) {//94-99
        return "fa-solid fa-cloud-bolt";
    }
    return "fa-solid fa-sun";
}
function generate_summary_item(data, name, icon) {
    return `
    <div class="item now-day-night-column">
        <div class="now-day-night-header">
            <i class="fa-regular ${icon}"></i>
            <p>${name}</p>
        </div>
        <div class="ui divider" style="width: 100%;"></div>
        <div class="now-day-night-content">
            <i class="${weather_code_get_icon(data.weather_code)}"></i>
            <p>${data.temperature}°C</p>
            <div class="now-day-night-data-table">
                <div class="now-day-night-data-row">
                    <i class="fa-solid fa-wind"></i>
                    <div class="now-day-night-data-row-text">${data.wind}м/с</div>
                </div>
                <div class="now-day-night-data-row">
                    <i class="fa-solid fa-droplet"></i>
                    <div class="now-day-night-data-row-text">${data.humidity}%</div>
                </div>
            </div>
        </div>
    </div>`;
}
function generate_now_day_night_section(data) {
    let result = `<div class="ui attached two item menu">`;
    if (data.now) {
        result = `<div class="ui attached three item menu">`;
        result += generate_summary_item(data.now, "Сейчас", "fa-clock");
    }
    result += generate_summary_item(data.day, "Днём", "fa-sun");
    result += generate_summary_item(data.night, "Ночью", "fa-moon");
    result += "</div>";
    return result;
}
function generate_hour_item(data) {
    return `<div class="item">
                <div class="per-hour-item">
                    <p>${data.hour.toString().padStart(2, "0")}:00</p>
                    <i class="${weather_code_get_icon(data.weather_code)}"></i>
                    <p>${data.temperature}°C</p>
                </div>
            </div>`;
}
function generate_detail_tab(data) {
    let result =
        `<div data-view-menu-tab="detail" class="view-menu-content">
                ${generate_now_day_night_section(data.summary)}
                <div class="ui attached menu per-hour-container">`
    for (hour_data of data.hourly_data) {
        result += generate_hour_item(hour_data);
    }
    result +=
        `</div>
            </div>`;
    return result;
}
function generate_day_tab(data, i) {
    return `
        <div class="day-menu-content" data-day-menu-tab="${i}" style="${(i != 0) ? "display: none;" : ""}">
            ${generate_detail_tab(data.daily_forecast[i])}
            <div data-view-menu-tab="chart" class="ui attached segment view-menu-content" style="height: 300px; display: none;">
                <canvas id="day-chart-${i}"></canvas>
                <!-- bug in chart.js -->
                <span style="visibility:hidden">X</span>
            </div>
        </div>`;
}
function generate_day_menu_entry(data, i) {
    return `<div class="item link${(i == 0) ? " active" : ""}" data-day-menu-tab="${i}" onclick="day_menu_onclick(this);">
                <div class="day-menu-entry">
                    <span>${data.daily_forecast[i].short_month_day}</span>
                    <span>${data.daily_forecast[i].day_of_the_week}</span>
                    <i class="${weather_code_get_icon(data.daily_forecast[i].weather_code)}"></i>
                </div>
            </div>`;
}
function generate_week_menu(data) {
    let result = `<div class="ui blue inverted attached menu seven item menu">`;
    for (let i = 0; i < 7; ++i) {
        result += generate_day_menu_entry(data, i);
    }
    result += `</div>`;
    return result;
}
function generate_header(data) {
    return `<div class="ui teal inverted attached segment">
                <div class="widget-header-container">
                    <div class="widget-header-city-container">
                        <i class="fa-solid fa-city"></i>
                        <p>${data.city}</p>
                    </div>
                    <div class="ui blue inverted compact menu">
                        <div class="item link active" data-view-menu-tab="detail" onclick="switch_weather_view_onclick(this);">
                            <i class="fa-solid fa-table-list"></i>
                        </div>
                        <div class="item link" data-view-menu-tab="chart" onclick="switch_weather_view_onclick(this);">
                            <i class="fa-solid fa-chart-column"></i>
                        </div>
                    </div>
                </div>
            </div>`;
}
function generate_chartjs_chart(container, data, i) {
    const labels = [];
    const datapoints = [];
    for (const hour_data of data.daily_forecast[i].hourly_data) {
        labels.push(`${hour_data.hour.toString().padStart(2, "0")}:00`);
        datapoints.push(hour_data.temperature);
    }
    new Chart(container.querySelector(`#day-chart-${i}`), {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "°C",
                data: datapoints,
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    suggestedMin: Math.min(...datapoints) * 0.9,
                    suggestedMax: Math.max(...datapoints) * 1.1
                }
            }
        }
    });
}
function mount_weather_widget(data) {
    let html = generate_header(data);
    html += generate_week_menu(data);
    for (let i = 0; i < 7; ++i) {
        html += generate_day_tab(data, i);
    }
    const container = document.createElement("div");
    container.classList.add("ui", "container", "no-mobile-margin");
    container.innerHTML = html;
    for (let i = 0; i < 7; ++i) {
        generate_chartjs_chart(container, data, i);
    }
    document.querySelector("#weather-widget").replaceChildren(container);
}
