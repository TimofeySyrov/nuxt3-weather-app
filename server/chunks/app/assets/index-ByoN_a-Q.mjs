import { useSSRContext, defineComponent, watch, unref, ref, onUnmounted, mergeProps, computed, toRef, isRef } from 'vue';
import { _ as _export_sfc, d as useNuxtApp, a as useRuntimeConfig } from '../server.mjs';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function useCoords() {
  const coords = useState("coords", () => null);
  const setCoords = (newCoords) => {
    coords.value = newCoords;
  };
  return {
    coords,
    setCoords
  };
}
function useFetchLocation() {
  const config = useRuntimeConfig();
  const data = ref(null);
  let pending = ref(false);
  async function fetchData(query) {
    pending.value = true;
    try {
      const response = await fetch(
        config.public.GEOAPIFY_API_URL + `?text=${query}&format=json&apiKey=${config.public.GEOAPIFY_API_KEY}`
      ).finally(() => {
        pending.value = false;
      });
      if (!response.ok)
        throw new Error("Network response was not ok");
      data.value = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return { data, pending, fetchData };
}
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "SearchBar",
  __ssrInlineRender: true,
  setup(__props) {
    const searchQuery = ref("");
    const showSuggestions = ref(false);
    const barElementRef = ref(null);
    useCoords();
    const { data: suggestions, fetchData } = useFetchLocation();
    function handleOutsideClick(event) {
      if (barElementRef.value && searchQuery.value.length > 0) {
        showSuggestions.value = barElementRef.value.contains(event.target);
      }
    }
    onUnmounted(() => {
      (void 0).removeEventListener("click", handleOutsideClick);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "bar",
        ref_key: "barElementRef",
        ref: barElementRef
      }, _attrs))} data-v-6906a27b><div class="input-wrapper" data-v-6906a27b><input class="${ssrRenderClass([{ expanded: unref(showSuggestions) }, "input"])}" type="text"${ssrRenderAttr("value", unref(searchQuery))} placeholder="Search city" data-v-6906a27b>`);
      if (unref(showSuggestions)) {
        _push(`<div class="suggestions" data-v-6906a27b><ul data-v-6906a27b><!--[-->`);
        ssrRenderList((_a = unref(suggestions)) == null ? void 0 : _a.results, (suggestion, index) => {
          _push(`<li data-v-6906a27b>${ssrInterpolate(suggestion.formatted)}</li>`);
        });
        _push(`<!--]-->`);
        if (!((_c = (_b = unref(suggestions)) == null ? void 0 : _b.results) == null ? void 0 : _c.length)) {
          _push(`<li data-v-6906a27b>Not found.</li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="btn" type="button" data-v-6906a27b>Search</button></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SearchBar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-6906a27b"]]);
const _sfc_main$3 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_SearchBar = __nuxt_component_0$1;
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "header" }, _attrs))} data-v-012bc1d5>`);
  _push(ssrRenderComponent(_component_SearchBar, null, null, _parent));
  _push(`</header>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-012bc1d5"]]);
function getWeatherIcon(iconCode) {
  const config = useRuntimeConfig();
  return `${config.public.OPENWEATHERMAP_ICON_URL}${iconCode}@2x.png`;
}
function formatDate(date) {
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
const _sfc_main$2 = {
  props: {
    weather: { type: Object, required: true }
  },
  methods: {
    formatDate(date) {
      const dateFormatter = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit"
      });
      const dateFormatted = dateFormatter.format(date);
      let hours = date.getHours();
      const minutes = ("0" + date.getMinutes()).slice(-2);
      const period = hours >= 12 ? "pm" : "am";
      hours = hours % 12 || 12;
      const timeFormatted = `${hours}:${minutes}${period}`;
      return `${dateFormatted}, ${timeFormatted}`;
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))} data-v-01d839ef><div class="location" data-v-01d839ef><div class="date" data-v-01d839ef>${ssrInterpolate($options.formatDate(new Date($props.weather.date)))}</div><div class="city" data-v-01d839ef>${ssrInterpolate($props.weather.city)}</div></div><div class="temp" data-v-01d839ef><img${ssrRenderAttr("src", ("getWeatherIcon" in _ctx ? _ctx.getWeatherIcon : unref(getWeatherIcon))($props.weather.iconCode))} alt="weather icon" data-v-01d839ef><div data-v-01d839ef>${ssrInterpolate($props.weather.temp)}\xB0C</div></div><div class="other" data-v-01d839ef><div data-v-01d839ef>Humidity: ${ssrInterpolate($props.weather.humidity)}%</div><div data-v-01d839ef>Wind: ${ssrInterpolate($props.weather.wind)} km/h</div></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DailyForecast.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-01d839ef"]]);
const _sfc_main$1 = {
  props: {
    selectedDate: { type: String, required: true },
    weather: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleCardClick(event, index) {
      this.$emit("forecast-select", index);
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "section" }, _attrs))} data-v-a6b56447><h2 class="title" data-v-a6b56447>4-day forecast</h2><ul class="forecast" data-v-a6b56447><!--[-->`);
  ssrRenderList($props.weather, (item, index) => {
    _push(`<li class="${ssrRenderClass({
      active: $props.selectedDate === index
    })}" data-v-a6b56447><div class="weekday" data-v-a6b56447>${ssrInterpolate(item.weekday)}</div><img${ssrRenderAttr("src", ("getWeatherIcon" in _ctx ? _ctx.getWeatherIcon : unref(getWeatherIcon))(item.iconCode))} alt="weather icon" data-v-a6b56447><div data-v-a6b56447>${ssrInterpolate(item.temp)} \xB0C</div></li>`);
  });
  _push(`<!--]--></ul></section>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ThreeDaysForecast.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-a6b56447"]]);
function useFetchForecast() {
  const config = useRuntimeConfig();
  const data = ref(null);
  let pending = ref(false);
  async function fetchData({ position, weatherUnits }) {
    pending.value = true;
    try {
      const response = await fetch(
        config.public.OPENWEATHERMAP_API_URL + `?lat=${position.lat}&lon=${position.lon}&appid=${config.public.OPENWEATHERMAP_API_KEY}&units=${weatherUnits}`
      ).finally(() => {
        pending.value = false;
      });
      if (!response.ok)
        throw new Error("Network response was not ok");
      data.value = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return { data, pending, fetchData };
}
function groupForecast(list) {
  const forecastByDate = {};
  list == null ? void 0 : list.forEach((timestamp) => {
    const dateKey = timestamp.dt_txt.split(" ")[0];
    if (!(dateKey in forecastByDate)) {
      forecastByDate[dateKey] = [];
    }
    forecastByDate[dateKey].push(timestamp);
  });
  return forecastByDate;
}
function formatDailyForecast(forecast, city) {
  return forecast.map((timestamp) => ({
    city,
    date: timestamp.dt_txt,
    weekday: new Date(timestamp.dt_txt).toLocaleDateString("en-US", {
      weekday: "long"
    }),
    iconCode: timestamp.weather[0].icon,
    temp: Math.round(timestamp.main.temp),
    humidity: timestamp.main.humidity,
    wind: timestamp.wind.speed
  }));
}
function useFormattedForecast(list) {
  const today = /* @__PURE__ */ new Date();
  const selectedDate = ref(formatDate(today));
  const forecastDaysLimit = 3;
  const forecast = computed(() => groupForecast(list.value.list));
  const threeDaysForecast = computed(() => {
    const result = {};
    for (let i = 0; i <= forecastDaysLimit; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      const formattedDate = formatDate(nextDay);
      result[formattedDate] = formatDailyForecast(
        forecast.value[formattedDate],
        list.value.city.name
      ).filter((timestamp) => {
        const todayForecast2 = i === 0;
        const middayForecast = timestamp.date.split(" ")[1] === "12:00:00";
        if (todayForecast2 || middayForecast)
          return timestamp;
      })[0];
    }
    return result;
  });
  const todayForecast = computed(() => {
    return threeDaysForecast.value[selectedDate.value];
  });
  const updateSelectedDate = (date) => {
    selectedDate.value = date;
  };
  return { todayForecast, threeDaysForecast, selectedDate, updateSelectedDate };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { coords } = useCoords();
    const { data, fetchData } = useFetchForecast();
    const { todayForecast, threeDaysForecast, selectedDate, updateSelectedDate } = useFormattedForecast(data);
    function fetchForecast(coords2) {
      fetchData({ position: coords2, weatherUnits: "metric" });
    }
    watch(
      () => coords,
      (newValue) => {
        coords.value && fetchForecast(newValue.value);
      },
      { deep: true, immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = __nuxt_component_0;
      const _component_DailyForecast = __nuxt_component_1;
      const _component_ThreeDaysForecast = __nuxt_component_2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Header, null, null, _parent));
      _push(`<div class="app">`);
      if (!unref(data)) {
        _push(`<div>Loading...</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(data)) {
        _push(ssrRenderComponent(_component_DailyForecast, { weather: unref(todayForecast) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(data)) {
        _push(ssrRenderComponent(_component_ThreeDaysForecast, {
          selectedDate: unref(selectedDate),
          onForecastSelect: unref(updateSelectedDate),
          weather: unref(threeDaysForecast)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-ByoN_a-Q.mjs.map
