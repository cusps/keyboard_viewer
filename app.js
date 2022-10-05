
// var txt = document.createElement("txt");
// txt.textContent = "HELLO WORLD"
// document.children[0].appendChild(txt);

DEFAULT_SECONDARIES = {
    "1":"!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^",
    "7": "&", "8": "*", "9": "(", "0": ")", "-": "_", "=": "+",
    "[": "{", "]": "}", "\\": "|", ";": ":", "'": "\"", ",": "<",
    ".": ">", "/": "?", "`": "`"
}

CUSTOM_SECONDARIES = {
    "!":"&", "@": "#", "$": "%", "(":" )"
}

class Key {
    constructor(_primary, _secondary = null) {
        this.primary = _primary;
        if (_secondary == null)
        {
            // Use custom if there TODO
            if(this.primary in CUSTOM_SECONDARIES)
            {
                this.secondary = CUSTOM_SECONDARIES[this.primary];
            }
            else
            {
                this.secondary = DEFAULT_SECONDARIES[this.primary];
            }
        }
        else
        {
            this.secondary = _secondary;
        }
    }
}

let rows = 4
let cols = [10, 10, 10, 4]
let split = true

let layers = [[
    new Key("q"), new Key("w"), new Key("e"), new Key("r"), new Key("t"), /**/ new Key("y"), new Key("u"), new Key("i"), new Key("o"), new Key("p"),
    new Key("a"), new Key("s"), new Key("d"), new Key("f"), new Key("g"), /**/ new Key("h"), new Key("j"), new Key("k"), new Key("l"), new Key(";"),
    new Key("z"), new Key("x"), new Key("c"), new Key("v"), new Key("b"), /**/ new Key("n"), new Key("m"), new Key(","), new Key("."), new Key("/"),
/*                                 */new Key("Space"), new Key("Shift"), /**/ new Key("Ctrl"), new Key("L1")
],
[
    new Key("ESC"), new Key("HOME"), new Key("END"), new Key("INS"), new Key("PG UP"), new Key("!"), new Key("@"), new Key("$"), new Key("^"), new Key("BACK"),
    //----------------------------------------------------------------------------                  ----------------------------------------------------------------------------------
    new Key("TAB"), new Key("ALT"), new Key("GUI"), new Key("DEL"), new Key("PG DN"), new Key("[", "{"), new Key("]", "}"), new Key("=", "+"), new Key("-", "_"), new Key("Enter"),
    //----------------------------------------------------------------------------                  ----------------------------------------------------------------------------------
    new Key("F1"), new Key("F2"), new Key("F3"), new Key("F4"), new Key("F5"), new Key("F6"), new Key("F7"), new Key("F8"), new Key("F9"), new Key("\\", " | "),
    //---------------------------------------------------------------------------------------       ----------------------------------------------------------------------------------
    new Key("L0"), new Key("SHIFT"), new Key("CTL"), new Key("L2")
],
[
    new Key("ESCAPE"), new Key("PG DN"), new Key("UP"), new Key("PG UP"), new Key("BLAH"), new Key("MINS"), new Key("7"), new Key("8"), new Key("9"), new Key("BSPC"),
    //---------------------------------------------------------------------------------------       ----------------------------------------------------------------------------------
    new Key("TAB"), new Key("LEFT"), new Key("DOWN"), new Key("RIGHT"), new Key("BLAH"), new Key("EQL"), new Key("4"), new Key("5"), new Key("6"), new Key("ENTER"),
    //---------------------------------------------------------------------------------------       ----------------------------------------------------------------------------------
    new Key("RESET"), new Key("*"), new Key("BRIGHT DN"), new Key("BRIGHT UP"), new Key("."), new Key("0"), new Key("1"), new Key("2"), new Key("3"), new Key("L3"),
    //---------------------------------------------------------------------------------------       ----------------------------------------------------------------------------------
    new Key("L0"), new Key("SHIFT"), new Key("CTL"), new Key("L3")
],
[
    new Key("TAB"), new Key("1"), new Key("2"), new Key("3"), new Key("ESC"), new Key("BLAH"), new Key("BLAH"), new Key("BLAH"), new Key("BLAH"), new Key("TRANSP"),
    //---------------------------------------------------------------------------------------       ----------------------------------------------------------------------------------
    new Key("CAPS"), new Key("Q"), new Key("W"), new Key("E"), new Key("R"), new Key("G"), new Key("NO"), new Key("NO"), new Key("NO"), new Key("ENTER"),
    //---------------------------------------------------------------------------------------       ----------------------------------------------------------------------------------
    new Key("LSFT"), new Key("A"), new Key("S"), new Key("D"), new Key("F"), new Key("B"), new Key("M"), new Key("MS_ACC1"), new Key("MS_ACC2"), new Key("NO"),
    //---------------------------------------------------------------------------------------       ----------------------------------------------------------------------------------
    new Key("C"), new Key("SPACE"), new Key("RALT"), new Key("L0")
]
];

var keyboard = document.createElement("keyboard")
keyboard.className = ".keyboard_body"
document.getElementById("keyboard_body").appendChild(keyboard)

var layer_select = document.getElementById("layer_select");
for (let i = 0; i < layers.length; i++) {
    var opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = i;
    layer_select.appendChild(opt)
}



// for (const layer of layers) {
var row_num = 0;
var col_num = 0;
var row_div = document.createElement("keyboard_row")
row_div.className = "keyboard_row";
keyboard.appendChild(row_div)
for (const key of layers[0]) {
    if (col_num >= cols[row_num]) {
        row_num++;
        col_num = 0;

        row_div = document.createElement("keyboard_row")
        row_div.className = "keyboard_row";
        keyboard.appendChild(row_div)
    }

    var cont = document.createElement("img_container");
    cont.className = "key_container";
    var img = document.createElement("img");
    img.src = "./img/keycap_blank.png";
    img.id = "key";
    img.className = "key";

    var pri_key = document.createElement("primary_key");
    pri_key.id = "primary_key";
    pri_key.textContent = key.primary;
    pri_key.className = "primary_key"

    var sec_key = document.createElement("secondary_key");
    sec_key.id = "secondary_key";
    sec_key.textContent = key.secondary;
    sec_key.className = "secondary_key"

    row_div.appendChild(cont);
    cont.appendChild(img);
    cont.appendChild(pri_key);
    cont.appendChild(sec_key);
    col_num++;
}

console.log("adding listener")
// layer_select.addEventListener('change', function () {
layer_select.onchange = function () {
    var key_idx = 0;
    var layer = document.getElementById("layer_select").value;
    console.log("on select change")

    for (var i = 0; i < keyboard.children.length; i++) {
        var row = keyboard.children[i];
        console.log("row")
        console.log(row.id)
        for (var j = 0; j < row.children.length; j++) {
            var key_cont = row.children[j];
            console.log("keys")
            var pri_key = key_cont.children[1]
            var sec_key = key_cont.children[2]
            pri_key.textContent = layers[layer][key_idx].primary
            sec_key.textContent = layers[layer][key_idx].secondary
            key_idx++;
        }
    }
};

console.log(document.children);
console.log(document.children[0]);
