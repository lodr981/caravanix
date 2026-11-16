// Světlý a tmavý režim (rozhodnutí 16. 11. 2026): výchozí podle zařízení, viditelný přepínač v hlavičce,
// volba se pamatuje v localStorage (žádná cookie).
//
// Pravidla:
// - Skript `themeInitScript` se vkládá inline do <head> před styly, aby se nikdy neukázal špatný režim.
//   Nastaví <html data-theme="light|dark"> a třídu `cx-js` (bez JS se přepínač skryje a platí jen nastavení zařízení).
// - Přepínač je obyčejné <button data-cx-theme-toggle>. Kliknutí obslouží delegovaný posluchač z téhož skriptu,
//   takže hlavička nepotřebuje hydrataci Reactu a funguje hned po načtení.
// - Když člověk zvolí stejný režim, jaký má zařízení, volba se z localStorage smaže a web znovu
//   sleduje zařízení. Uložená je tedy jen odchylka od zařízení.

export const THEME_STORAGE_KEY = "cx-theme";
export const THEME_TOGGLE_ATTR = "data-cx-theme-toggle";

export const themeInitScript = `(function(){var d=document.documentElement,k=${JSON.stringify(THEME_STORAGE_KEY)},m=window.matchMedia("(prefers-color-scheme: dark)");function g(){try{var v=localStorage.getItem(k);return v==="light"||v==="dark"?v:null}catch(e){return null}}function a(){d.setAttribute("data-theme",g()||(m.matches?"dark":"light"))}a();d.classList.add("cx-js");if(m.addEventListener)m.addEventListener("change",a);window.addEventListener("storage",function(e){if(e.key===k)a()});document.addEventListener("click",function(e){var t=e.target,b=t&&t.closest?t.closest("[${THEME_TOGGLE_ATTR}]"):null;if(!b)return;var n=d.getAttribute("data-theme")==="dark"?"light":"dark";try{if(n===(m.matches?"dark":"light"))localStorage.removeItem(k);else localStorage.setItem(k,n)}catch(e){}d.setAttribute("data-theme",n)})})();`;
