const handleThemeUpdate = (cssVars) => {
    const root = document.querySelector(':root');
    const keys = Object.keys(cssVars);
    keys.forEach(key => {
        root.style.setProperty(key, cssVars[key]);
    });
}

function dynamicPrimaryColor(primaryColor) {
    primaryColor.forEach((item) => {
        item.addEventListener('input', (e) => {
            const cssPropName = `--primary-${e.target.getAttribute('data-id')}`;
            const cssPropName1 = `--primary-${e.target.getAttribute('data-id1')}`;
            const cssPropName2 = `--primary-${e.target.getAttribute('data-id2')}`;
            const cssPropName7 = `--primary-${e.target.getAttribute('data-id7')}`;
            handleThemeUpdate({
                [cssPropName]: e.target.value,
                // 95 is used as the opacity 0.95  
                [cssPropName1]: e.target.value + 95,
                [cssPropName2]: e.target.value,
                [cssPropName7]: e.target.value + 20,
            });
        });
    });
}

function dynamicSecondaryColor(secondaryColor) {
    secondaryColor.forEach((item) => {
        item.addEventListener('input', (e) => {
            const cssPropName11 = `--secondary-${e.target.getAttribute('data-id5')}`;
            const cssPropName12 = `--secondary-${e.target.getAttribute('data-id6')}`;
            const cssPropName13 = `--secondary-${e.target.getAttribute('data-id8')}`;
            handleThemeUpdate({
                [cssPropName11]: e.target.value,
                // 95 is used as the opacity 0.95  
                [cssPropName12]: e.target.value + 95,
                [cssPropName13]: e.target.value + 20,
            });
        });
    });
}

$(document).ready(function() {
    // Light theme color picker
    // const LightThemeSwitchers = document.querySelectorAll('.light-theme .switch_section span');
    const dynamicPrimaryLight = document.querySelectorAll('input.color-primary-light');
    const dynamicSecondaryLight = document.querySelectorAll('input.color-secondary-light');

    // themeSwitch(LightThemeSwitchers);
    dynamicPrimaryColor(dynamicPrimaryLight);
    dynamicSecondaryColor(dynamicSecondaryLight);

    localStorageBackup();
});

function localStorageBackup() {
    // if there is a value stored, update color picker and background color
    // Used to retrive the data from local storage
    if (localStorage.claylistprimaryColor) {
        document.getElementById('colorID').value = localStorage.claylistprimaryColor;
        document.querySelector('html').style.setProperty('--primary-bg-color', localStorage.claylistprimaryColor);
        document.querySelector('html').style.setProperty('--primary-bg-hover', localStorage.claylistprimaryHoverColor);
        document.querySelector('html').style.setProperty('--primary-bg-border', localStorage.claylistprimaryBorderColor);
        document.querySelector('html').style.setProperty('--primary-bg-transparentcolor', localStorage.claylistprimaryTransparent);
    }
    if (localStorage.claylistsecondaryColor) {
        document.getElementById('colorID2').value = localStorage.claylistsecondaryColor;
        document.querySelector('html').style.setProperty('--secondary-color', localStorage.claylistsecondaryColor);
        document.querySelector('html').style.setProperty('--secondary-hover', localStorage.claylistsecondaryHoverColor);
        document.querySelector('html').style.setProperty('--secondary-transparent', localStorage.claylistsecondaryTransparentColor);
    }
	if (localStorage.claylistrtl) {
		$('body').addClass('rtl');
	}
	if (localStorage.claylistdark) {
		$('body').addClass('dark-theme');
	}

}

// triggers on changing the color picker
function changePrimaryColor() {

    var userColor = document.getElementById('colorID').value;
    localStorage.setItem('claylistprimaryColor', userColor);
    // to store value as opacity 0.95 we use 95
    localStorage.setItem('claylistprimaryHoverColor', userColor + 95);
    localStorage.setItem('claylistprimaryBorderColor', userColor);
    localStorage.setItem('claylistprimaryTransparent', userColor + 20);
    names()
}
function changeSecondaryColor() {

    var userColor = document.getElementById('colorID2').value;
    localStorage.setItem('claylistsecondaryColor', userColor);
    // to store value as opacity 0.95 we use 95
    localStorage.setItem('claylistsecondaryHoverColor', userColor + 95);
    localStorage.setItem('claylistsecondaryTransparentColor', userColor + 20);
    names()
}

// to check the value is hexa or not
const isValidHex = (hexValue) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hexValue)

const getChunksFromString = (st, chunkSize) => st.match(new RegExp(`.{${chunkSize}}`, "g"))
    // convert hex value to 256
const convertHexUnitTo256 = (hexStr) => parseInt(hexStr.repeat(2 / hexStr.length), 16)
    // get alpha value is equla to 1 if there was no value is asigned to alpha in function
const getAlphafloat = (a, alpha) => {
        if (typeof a !== "undefined") { return a / 255 }
        if ((typeof alpha != "number") || alpha < 0 || alpha > 1) {
            return 1
        }
        return alpha
    }
    // convertion of hex code to rgba code 
function hexToRgba(hexValue, alpha) {
    if (!isValidHex(hexValue)) { return null }
    const chunkSize = Math.floor((hexValue.length - 1) / 3)
    const hexArr = getChunksFromString(hexValue.slice(1), chunkSize)
    const [r, g, b, a] = hexArr.map(convertHexUnitTo256)
    return `rgba(${r}, ${g}, ${b}, ${getAlphafloat(a, alpha)})`
}


let myVarVal, myVarVal1

function names() {

    let primaryColorVal = getComputedStyle(document.documentElement).getPropertyValue('--primary-bg-color').trim();
    let secondaryColorVal = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();
    
    //get variable
    myVarVal = localStorage.getItem("claylistprimaryColor") ||primaryColorVal;
    myVarVal1 = localStorage.getItem("claylistsecondaryColor") || secondaryColorVal;
    

    // For index.html
	if(document.querySelector('#sales-status') !== null){
        sales();
    }
    // For index2.html
	if(document.querySelector('#survey') !== null){
        survey();
    }
	if(document.querySelector('#lineChart1') !== null){
        lineChart1();
    }
	if(document.querySelector('#morrisBar') !== null){
        morrisBar();
    }
	if(document.querySelector('#placeholder14') !== null){
        placeholder4();
    }
	if(document.querySelector('#purchase') !== null){
        purchase();
    }
	if(document.querySelector('#echart15') !== null){
        echart15();
    }
	if(document.querySelector('#echart11') !== null){
        echart11();
    }
	if(document.querySelector('#lineChart') !== null){
        lineChart();
    }
	if(document.querySelector('.spark') !== null){
        spark();
    }

    let colorData4 = hexToRgba(myVarVal || primaryColorVal, 0.1)
    document.querySelector('html').style.setProperty('--primary-1', colorData4);
    let colorData5 = hexToRgba(myVarVal || primaryColorVal, 0.2)
    document.querySelector('html').style.setProperty('--primary2', colorData5);
    let colorData6 = hexToRgba(myVarVal || primaryColorVal, 0.3)
    document.querySelector('html').style.setProperty('--primary-3', colorData6);
    let colorData7 = hexToRgba(myVarVal || primaryColorVal, 0.4)
    document.querySelector('html').style.setProperty('--primary-4', colorData7);
    let colorData8 = hexToRgba(myVarVal || primaryColorVal, 0.5)
    document.querySelector('html').style.setProperty('--primary-5', colorData8);
    let colorData9 = hexToRgba(myVarVal || primaryColorVal, 0.6)
    document.querySelector('html').style.setProperty('--primary-6', colorData9);
    let colorData10 = hexToRgba(myVarVal || primaryColorVal, 0.7)
    document.querySelector('html').style.setProperty('--primary-7', colorData10);
    let colorData11 = hexToRgba(myVarVal || primaryColorVal, 0.8)
    document.querySelector('html').style.setProperty('--primary-8', colorData11);
    let colorData12 = hexToRgba(myVarVal || primaryColorVal, 0.9)
    document.querySelector('html').style.setProperty('--primary-9', colorData12);

    let colorData13 = hexToRgba(myVarVal1 || secondaryColorVal, 0.1)
    document.querySelector('html').style.setProperty('--secondary-1', colorData13);
    let colorData14 = hexToRgba(myVarVal1 || secondaryColorVal, 0.2)
    document.querySelector('html').style.setProperty('--secondary-2', colorData14);
    let colorData15 = hexToRgba(myVarVal1 || secondaryColorVal, 0.3)
    document.querySelector('html').style.setProperty('--secondary-3', colorData15);
    let colorData16 = hexToRgba(myVarVal1 || secondaryColorVal, 0.4)
    document.querySelector('html').style.setProperty('--secondary-4', colorData16);
    let colorData17 = hexToRgba(myVarVal1 || secondaryColorVal, 0.5)
    document.querySelector('html').style.setProperty('--secondary-5', colorData17);
    let colorData18 = hexToRgba(myVarVal1 || secondaryColorVal, 0.6)
    document.querySelector('html').style.setProperty('--secondary-6', colorData18);
    let colorData19 = hexToRgba(myVarVal1 || secondaryColorVal, 0.7)
    document.querySelector('html').style.setProperty('--secondary-7', colorData19);
    let colorData20 = hexToRgba(myVarVal1 || secondaryColorVal, 0.8)
    document.querySelector('html').style.setProperty('--secondary-8', colorData20);
    let colorData21 = hexToRgba(myVarVal1 || secondaryColorVal, 0.9)
    document.querySelector('html').style.setProperty('--secondary-9', colorData21);
}
names()
