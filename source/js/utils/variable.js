/**
 * DOM
 */

const county = document.querySelector('#county');
const countyTown = document.querySelector('#countyTown');
const sideBarSwitchBtn = document.querySelector('#btnId');
const sideData = document.querySelector('#sideData');
const search = document.querySelector('#search');

/**
 * Model
 */

const data = [];
let map = {};
let selectedCounty = '台北市';
// marker群組管理
/* global L */
const markers = new L.MarkerClusterGroup();

/**
 * init
 */